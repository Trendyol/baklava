// Headless-render layer for the benchmark (Step 1 improvement).
//
// The deterministic rubric only reads source; this module actually renders the
// generated HTML in headless Chrome (via CDP, no npm dependencies — Node's
// global WebSocket) and records what the *browser* observes:
//   - runtime JS exceptions / console errors
//   - whether custom elements actually upgraded (have a shadowRoot)
//   - basic accessibility probes (unlabeled interactive controls, missing alt)
//
// Writing this lets the benchmark answer "does it render and work, not just
// parse". Render data is merged separately from the deterministic rubric (like
// the LLM-judge layer) and never changes it.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import http from 'node:http';

const CHROME =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function ready(browserUrl, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      await getJson(browserUrl);
      return true;
    } catch { await sleep(250); }
  }
  return false;
}

/** Open a CDP websocket and return {send, on, close}. */
async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => {
    ws.onopen = res; ws.onerror = rej;
  });
  let id = 0;
  const pending = new Map();
  const listeners = {};
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method && listeners[msg.method]) {
      listeners[msg.method].forEach((fn) => fn(msg.params));
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const mid = ++id;
      pending.set(mid, { resolve, reject });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  const on = (method, fn) => {
    (listeners[method] = listeners[method] || []).push(fn);
    return () => { listeners[method] = listeners[method].filter((f) => f !== fn); };
  };
  return { send, on, close: () => ws.close() };
}

const PROBE = `(async () => {
  const real = Array.from(document.querySelectorAll('*')).filter((e) => e.localName && e.localName.includes('-'));
  const blElements = real.filter((e) => e.localName.startsWith('bl-'));
  // wait briefly for custom elements to upgrade (best effort, bounded)
  await Promise.race([
    Promise.allSettled(blElements.map((e) => customElements.whenDefined(e.localName).catch(() => {}))),
    new Promise((r) => setTimeout(r, 1500)),
  ]);
  const upgraded = blElements.filter((e) => e.shadowRoot);
  const unupgraded = blElements.filter((e) => !e.shadowRoot);
  const sel = 'button, [role=button], input:not([type=hidden]):not([type=submit]), select, textarea, [role=tab], a[href]';
  const unlabeled = Array.from(document.querySelectorAll(sel)).filter((e) => {
    const label = (e.getAttribute('aria-label') || e.getAttribute('title') || '').trim();
    const text = (e.textContent || '').trim();
    const alt = e.getAttribute('alt') || '';
    return !label && !text && !alt;
  }).map((e) => e.localName);
  const imgs = Array.from(document.querySelectorAll('img')).filter((i) => !(i.getAttribute('alt') != null));
  return {
    blElementCount: blElements.length,
    upgradedCount: upgraded.length,
    unupgraded: unupgraded.map((e) => e.localName),
    unlabeledInteractives: unlabeled,
    unlabeledImgCount: imgs.length,
    hasShadowUi: upgraded.length > 0,
  };
})()`;

/**
 * Render one HTML file in headless Chrome and collect metrics.
 * @param {string} fileUrl file:// URL of the generated page
 * @returns {Promise<object>} render metrics for this file
 */
export async function renderFile(fileUrl, wsUrl) {
  const c = await connect(wsUrl);
  try {
    const events = [];
    c.on('Runtime.exceptionThrown', (p) =>
      events.push({ kind: 'exception', text: String((p.exceptionDetails && p.exceptionDetails.text) || '') }));
    c.on('Log.entryAdded', (p) => {
      if (p.entry && p.entry.level === 'error') events.push({ kind: 'log', text: p.entry.text });
    });
    c.on('Runtime.consoleAPICalled', (p) => {
      if (p.type === 'error') {
        const text = (p.args || []).map((a) => a.value || a.description || '').join(' ');
        events.push({ kind: 'console', text });
      }
    });
    await c.send('Page.enable');
    await c.send('Runtime.enable');
    await c.send('Log.enable');
    const loaded = new Promise((r) => c.on('Page.loadEventFired', () => r()));
    await c.send('Page.navigate', { url: fileUrl });
    await Promise.race([loaded, sleep(6000)]);
    await sleep(600);
    const probe = await c.send('Runtime.evaluate', {
      expression: PROBE, returnByValue: true, awaitPromise: true,
    });
    return {
      loaded: true,
      exceptions: events.filter((e) => e.kind === 'exception').map((e) => e.text),
      consoleErrors: events.filter((e) => e.kind === 'console' || e.kind === 'log').map((e) => e.text),
      ...(probe && probe.result && probe.result.value ? probe.result.value : {}),
    };
  } finally {
    c.close();
  }
}

export async function launchChrome() {
  const profile = mkdtempSync(path.join(tmpdir(), 'baklava-render-'));
  const port = 9333 + Math.floor(Math.random() * 1000);
  const child = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--no-sandbox',
    '--disable-extensions', 'about:blank',
  ], { stdio: 'ignore' });
  const browserUrl = `http://127.0.0.1:${port}`;
  if (!(await ready(`${browserUrl}/json/version`))) {
    child.kill('SIGKILL');
    throw new Error('Chrome did not become ready');
  }
  const version = await getJson(`${browserUrl}/json/version`);
  // Connect to a PAGE target (Page/Runtime/Log are page domains), not the browser.
  const list = await getJson(`${browserUrl}/json/list`);
  const pageTarget = (list || []).find((t) => t.type === 'page');
  if (!pageTarget) {
    child.kill('SIGKILL');
    throw new Error('No page target available');
  }
  return { child, profile, wsUrl: pageTarget.webSocketDebuggerUrl };
}

/** Serve a directory tree over plain HTTP (needed so ESM chunk imports resolve). */
export function startServer(root) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent((req.url || '/').split('?')[0]);
    if (p === '/' || p === '') p = '/index.html';
    const fp = path.join(root, path.normalize(p));
    try {
      const b = readFileSync(fp);
      const ext = path.extname(fp).toLowerCase();
      const ct = ext === '.js' ? 'text/javascript' : ext === '.mjs' ? 'text/javascript' : ext === '.html' ? 'text/html' : 'application/octet-stream';
      res.setHeader('Content-Type', ct);
      res.end(b);
    } catch {
      res.statusCode = 404;
      res.end('not found');
    }
  });
  const close = () => new Promise((r) => server.close(r));
  const port = new Promise((r) => server.listen(0, () => r(server.address().port)));
  return { server, close, port };
}

export async function closeChrome({ child, profile }) {
  try { child.kill('SIGKILL'); } catch {}
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
}

/**
 * Render every generated HTML file for an arm/persona, writing
 * render/<arm>/<id>.json under the iteration dir. Each file is served over
 * HTTP with the real Baklava dist bundle injected so custom elements upgrade.
 */
export async function renderDirectory({ iteration, persona = 'naive', arm }) {
  const pathMod = await import('node:path');
  const fs = await import('node:fs');
  const fileURLToPath2 = (await import('node:url')).fileURLToPath;
  const resultsBase = pathMod.join(
    pathMod.resolve('.'), 'tools', 'agent-tooling', 'bench', 'results',
  );
  const inputsDir = pathMod.join(resultsBase, 'inputs', persona, arm);
  const outDir = pathMod.join(resultsBase, iteration, 'render', arm);
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.existsSync(inputsDir)
    ? fs.readdirSync(inputsDir).filter((f) => f.endsWith('.html'))
    : [];

  // Serve the repo root so /dist/baklava.js + chunk imports resolve.
  const repoRoot = pathMod.resolve('.');
  const tmpDir = pathMod.join(repoRoot, '.agent-render-tmp');
  fs.mkdirSync(tmpDir, { recursive: true });
  const srv = startServer(repoRoot);
  const port = await srv.port;
  const chrome = await launchChrome();
  const out = {};
  try {
    for (const f of files) {
      const id = f.replace(/\.html$/, '');
      const src = fs.readFileSync(pathMod.join(inputsDir, f), 'utf8');
      // Inject the real Baklava component bundle (skip if author already did).
      let html = src;
      if (!/dist\/baklava\.js/.test(html)) {
        if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, '<script type="module" src="/dist/baklava.js"></script></body>');
        else html = html + '<script type="module" src="/dist/baklava.js"></script>';
      }
      const tmp = pathMod.join(tmpDir, `${persona}-${arm}-${id}.html`);
      fs.writeFileSync(tmp, html);
      const url = `http://127.0.0.1:${port}/.agent-render-tmp/${persona}-${arm}-${id}.html`;
      try {
        const metrics = await renderFile(url, chrome.wsUrl);
        out[id] = { id, arm, file: `${persona}/${arm}/${f}.html`, url, ...metrics };
      } catch (e) {
        out[id] = { id, arm, loaded: false, error: String(e && e.message) };
      }
      fs.writeFileSync(pathMod.join(outDir, `${id}.json`), JSON.stringify(out[id], null, 2));
      fs.rmSync(tmp, { force: true });
    }
  } finally {
    closeChrome(chrome);
    await srv.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  }
  const agg = aggregateRender(out);
  writeFileSync(pathMod.join(resultsBase, iteration, 'render', `${arm}.aggregate.json`), JSON.stringify(agg, null, 2));
  return { arm, files: files.length, aggregate: agg };
}

/** Deterministic aggregation over a render set. */
export function aggregateRender(map) {
  const rows = Object.values(map);
  const ok = rows.filter((r) => r.loaded);
  const exceptions = rows.reduce((n, r) => n + (r.exceptions || []).length, 0);
  const consoleErrors = rows.reduce((n, r) => n + (r.consoleErrors || []).length, 0);
  const blElements = rows.reduce((n, r) => n + (r.blElementCount || 0), 0);
  const upgraded = rows.reduce((n, r) => n + (r.upgradedCount || 0), 0);
  const unupgraded = rows.reduce((n, r) => n + (r.unupgraded || []).length, 0);
  const unlabeled = rows.reduce((n, r) => n + (r.unlabeledInteractives || []).length, 0);
  const unlabeledImg = rows.reduce((n, r) => n + (r.unlabeledImgCount || 0), 0);
  return {
    nLoaded: ok.length,
    nTotal: rows.length,
    cleanLoadRate: rows.length ? Math.round((ok.length / rows.length) * 100) : 0,
    totalExceptions: exceptions,
    totalConsoleErrors: consoleErrors,
    blElementCount: blElements,
    upgradedCount: upgraded,
    upgradeRate: blElements ? Math.round((upgraded / blElements) * 100) : 0,
    totalUnupgradedCustomElements: unupgraded,
    totalUnlabeledInteractives: unlabeled,
    totalUnlabeledImages: unlabeledImg,
  };
}

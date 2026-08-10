// Benchmark runner CLI for the Baklava before/after harness.
//
//   node benchmark cli evaluate [--iteration <id>] [--arm baseline|augmented|all]
//       -> evaluate generated outputs under results/inputs/<arm>/<id>.html
//          into results/<iteration>/evaluated/<arm>/<id>.json
//   node benchmark cli compare [--iteration <id>]
//       -> aggregate before/after into results/<iteration>/compare.json + compare.md
//   node benchmark cli generate --mock
//       -> produce deterministic demo outputs (no LLM) for CI/demo purposes
//
// Real LLM outputs are produced by actually running agents (see README). This
// CLI's evaluate + compare are fully deterministic and rerunnable on any inputs.
import { evaluate, loadPrompts, PERSONAS } from './evaluate.mjs';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const REPO = path.resolve(fileURLToPath(new URL('../../../../', import.meta.url)));
const BENCH = path.join(REPO, 'poc', 'agent-tooling', 'bench');
const ARMS = ['baseline', 'augmented'];

function args() {
  const a = process.argv.slice(2);
  const out = { cmd: a[0], iteration: null, arm: null, mock: false };
  for (let i = 1; i < a.length; i++) {
    if (a[i] === '--iteration') out.iteration = a[++i];
    else if (a[i] === '--arm') out.arm = a[++i];
    else if (a[i] === '--mock') out.mock = true;
    else if (a[i] === '--persona') out.persona = a[++i];
    else if (a[i] === '--model') out.model = a[++i];
    else if (a[i] === '--markdown') out.markdown = true;
  }
  out.iteration = out.iteration || 'latest';
  return out;
}

function loadInputs(arm, persona = 'naive') {
  // inputs are stored per persona (Astryx-style per-config environments).
  const dir = path.join(BENCH, 'results', 'inputs', persona, arm);
  const out = {};
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.html')) continue;
    const id = f.replace(/\.html$/, '');
    out[id] = readFileSync(path.join(dir, f), 'utf8');
  }
  return out;
}

async function doEvaluate({ iteration, arm, persona, model }) {
  const armList = arm === 'all' || !arm ? ARMS : [arm];
  const prompts = loadPrompts(persona);
  const byPrompt = Object.fromEntries(prompts.map((p) => [p.id, p]));
  const summary = { iteration, persona: persona || 'naive', model: model || 'unknown', arms: {} };

  for (const a of armList) {
    const inputs = loadInputs(a, persona);
    const results = {};
    for (const [id, code] of Object.entries(inputs)) {
      const prompt = byPrompt[id];
      if (!prompt) continue;
      const ev = evaluate(code, prompt.expectedComponents);
      results[id] = {
        id,
        persona: persona || 'naive',
        model: model || 'unknown',
        category: prompt.category,
        complexity: prompt.complexity,
        prompt: prompt.prompt,
        response: code,
        evaluation: {
          success: ev.success,
          overall: ev.overall,
          componentsUsed: ev.componentsUsed,
          componentsExpected: ev.componentsExpected,
          missed: ev.missed,
          escapeHatches: ev.escapeHatches,
          failureMode: ev.failureMode,
          confusionSignals: ev.confusionSignals,
          scores: ev.scores,
        },
      };
    }
    const outDir = path.join(BENCH, 'results', iteration, 'evaluated', a);
    mkdirSync(outDir, { recursive: true });
    const agg = aggregate(results);
    summary.arms[a] = { count: Object.keys(results).length, aggregate: agg };
    for (const [id, r] of Object.entries(results)) {
      writeFileSync(path.join(outDir, `${id}.json`), JSON.stringify(r, null, 2));
    }
  }
  writeFileSync(path.join(BENCH, 'results', iteration, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

function aggregate(results) {
  const keys = ['correctness', 'accessibility', 'efficiency', 'codeQuality', 'maintainability', 'overall'];
  const dims = Object.fromEntries(keys.map((k) => [k, 0]));
  let n = 0, packed = 0, hall = 0, escape = 0;
  const allUsed = new Set();
  for (const r of Object.values(results)) {
    const s = r.evaluation;
    keys.forEach((k) => (dims[k] += s.scores[k] ?? s.scores.overall));
    n++;
    if (s.success) packed++;
    hall += s.escapeHatches.filter((e) => e.type === 'hallucination').length;
    escape += s.escapeHatches.length;
    s.componentsUsed.forEach((c) => allUsed.add(c));
  }
  Object.keys(dims).forEach((k) => (dims[k] = Math.round(dims[k] / Math.max(1, n))));
  return {
    n,
    successRate: n ? Math.round((packed / n) * 100) : 0,
    avgOverall: dims.overall,
    dimensions: { ...dims },
    totalHallucinations: hall,
    totalEscapeHatches: escape,
    uniqueComponentsUsed: [...allUsed].sort(),
  };
}

function doCompare({ iteration, persona, model }) {
  const base = path.join(BENCH, 'results', iteration);
  const readAgg = (arm) => {
    const dir = path.join(base, 'evaluated', arm);
    const results = {};
    if (!existsSync(dir)) return null;
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.json')) continue;
      results[f.replace(/\.json$/, '')] = JSON.parse(readFileSync(path.join(dir, f), 'utf8'));
    }
    return aggregate(results);
  };
  const before = readAgg('baseline');
  const after = readAgg('augmented');

  // Optional Astryx-style LLM-judge layer: if judge/{arm}/*.json exist
  // (produced by separate fresh-context judge subagents), merge their holistic
  // scores in. Judge scores are best-effort and not included in the deterministic
  // rubric deltas below.
  const readJudge = (arm) => {
    const dir = path.join(base, 'judge', arm);
    if (!existsSync(dir)) return null;
    const dims = { correctness: 0, accessibility: 0, efficiency: 0, codeQuality: 0, maintainability: 0, overall: 0 };
    let n = 0;
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.json')) continue;
      const j = JSON.parse(readFileSync(path.join(dir, f), 'utf8'));
      const s = j.scores || {};
      for (const k of Object.keys(dims)) dims[k] += s[k] ?? 0;
      n++;
    }
    if (!n) return null;
    for (const k of Object.keys(dims)) dims[k] = Math.round(dims[k] / n);
    return { n, scores: dims };
  };
  const judgeBefore = readJudge('baseline');
  const judgeAfter = readJudge('augmented');

  const delta = {};
  if (before && after) {
    for (const k of ['successRate', 'avgOverall']) {
      delta[k] = (after[k] ?? 0) - (before[k] ?? 0);
    }
    for (const k of Object.keys(before.dimensions || {})) {
      delta[`dim.${k}`] = (after.dimensions?.[k] ?? 0) - (before.dimensions?.[k] ?? 0);
    }
    delta.totalHallucinations = (after.totalHallucinations ?? 0) - (before.totalHallucinations ?? 0);
    delta.totalEscapeHatches = (after.totalEscapeHatches ?? 0) - (before.totalEscapeHatches ?? 0);
  }

  const compare = {
    iteration,
    persona,
    model,
    timestamp: new Date().toISOString(),
    system: 'Baklava',
    before,
    after,
    delta,
    judge: { before: judgeBefore, after: judgeAfter },
  };
  writeFileSync(path.join(base, 'compare.json'), JSON.stringify(compare, null, 2));
  writeFileSync(path.join(base, 'compare.md'), renderMarkdown(compare));
  console.log(renderMarkdown(compare));
}

// Rolling / nightly scorecard (Astryx-style ledger across iterations).
// Aggregates every iteration's compare.json into one table, optionally filtered
// by persona/arm, and writes scorecard.json + scorecard.md.
function doScorecard({ persona, model, markdown }) {
  const resultsDir = path.join(BENCH, 'results');
  const rows = [];
  if (existsSync(resultsDir)) {
    for (const it of readdirSync(resultsDir).sort()) {
      const cmpPath = path.join(resultsDir, it, 'compare.json');
      if (!existsSync(cmpPath)) continue;
      const c = JSON.parse(readFileSync(cmpPath, 'utf8'));
      if (persona && c.persona !== persona) continue;
      if (model && c.model !== model) continue;
      const agg = (x) => (x ? { overall: x.avgOverall, dims: x.dimensions || {}, hall: x.totalHallucinations, esc: x.totalEscapeHatches, succ: x.successRate } : null);
      const before = agg(c.before);
      const after = agg(c.after);
      rows.push({ iteration: it, persona: c.persona || 'naive', model: c.model || 'unknown', timestamp: c.timestamp, before, after, delta: c.delta });
    }
  }
  rows.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));

  const sc = { generations: rows, updatedAt: new Date().toISOString() };
  writeFileSync(path.join(resultsDir, 'scorecard.json'), JSON.stringify(sc, null, 2));
  const md = renderScorecard(sc);
  writeFileSync(path.join(resultsDir, 'scorecard.md'), md);
  if (markdown) console.log(md);
  else console.log(JSON.stringify(sc, null, 2));
}

function renderScorecard(sc) {
  const head = [
    '# Baklava Agent-Tooling — Rolling Scorecard',
    `> Generated ${sc.updatedAt} · aggregates all committed benchmark iterations.`, 
    '',
    '| Iteration | Persona | Model | Base Overall | Tooled Overall | Δ | Base succ | Tooled succ | Base esc | Tooled esc |',
    '|---|---|---|---|---|---|---|---|---|---|',
  ];
  const body = sc.generations.map((r) => {
    const b = r.before || {}; const a = r.after || {};
    const d = (r.delta && r.delta.avgOverall != null) ? r.delta.avgOverall : null;
    return `| ${r.iteration} | ${r.persona} | ${r.model} | ${b.overall ?? '—'} | ${a.overall ?? '—'} | ${d > 0 ? '+' : ''}${d ?? '—'} | ${(b.succ ?? '—') + '%'} | ${(a.succ ?? '—') + '%'} | ${b.esc ?? '—'} | ${a.esc ?? '—'} |`;
  });
  return [...head, ...body, '', '_Machine-readable: `scorecard.json`._'].join('\n');
}

function renderMarkdown(c) {
  const rows = (label, agg) => {
    if (!agg) return '  (no data)';
    const d = agg.dimensions || {};
    return [
      `  | Success rate | ${agg.successRate}% |`,
      `  | Overall | ${agg.avgOverall} |`,
      `  | Correctness | ${d.correctness} |`,
      `  | Accessibility | ${d.accessibility} |`,
      `  | Efficiency | ${d.efficiency} |`,
      `  | Code quality | ${d.codeQuality} |`,
      `  | Maintainability | ${d.maintainability} |`,
      `  | Hallucinated tags | ${agg.totalHallucinations} |`,
      `  | Escape hatches | ${agg.totalEscapeHatches} |`,
      `  | Unique components used | ${(agg.uniqueComponentsUsed || []).length} |`,
    ].join('\n');
  };
  const deltaRows = Object.entries(c.delta || {})
    .map(([k, v]) => `  | ${k} | ${v > 0 ? '+' : ''}${v} |`).join('\n');
  const jrows = (j) => {
    if (!j || !j.scores) return '  (no LLM judge data)';
    const s = j.scores;
    return `  | n | ${j.n} |\n` + [
      ['Overall', s.overall], ['Correctness', s.correctness], ['Accessibility', s.accessibility],
      ['Code quality', s.codeQuality], ['Efficiency', s.efficiency], ['Maintainability', s.maintainability],
    ].map(([k, v]) => `  | ${k} | ${v} |`).join('\n');
  };
  const judgeSection = (c.judge && (c.judge.before || c.judge.after))
    ? [
        `## LLM Judge (separate fresh-context agent — optional holistic layer)`,
        ``,
        `> Non-deterministic model judgment, kept separate from the deterministic rubric above.`,
        ``,
        `### Baseline judge`, ``, jrows(c.judge.before), ``,
        `### Augmented judge`, ``, jrows(c.judge.after), ``,
      ]
    : [];
  return [
    `# Baklava Agent-Friendly PoC — Before / After Benchmark`,
    ``,
    `Iteration: \`${c.iteration}\` · ${c.timestamp} · System: ${c.system}`,
    ``,
    `> This benchmark measures whether giving the agent the **Baklava agent CLI / tooling**`,
    `> (augmented / after) improves component correctness vs. an agent working from raw`,
    `> knowledge only (baseline / before).`,
    ``,
    `## Baseline (before — no tooling)`,
    ``,
    rows('before', c.before),
    ``,
    `## Augmented (after — with Baklava agent tooling)`,
    ``,
    rows('after', c.after),
    ``,
    `## Delta (after − before)`,
    ``,
    `| Metric | Δ |`,
    `|---|---|`,
    deltaRows || '  (no data)',
    ``,
    ...judgeSection,
    `_Machine-readable data: \`compare.json\`. Per-prompt scores: \`evaluated/{arm}/*.json\`._`,
  ].join('\n');
}

// Deterministic demo generator so the harness runs end-to-end without an LLM.
function doMockGenerate() {
  const persona = 'naive';
  const prompts = loadPrompts(persona);
  for (const arm of ARMS) {
    const dir = path.join(BENCH, 'results', 'inputs', persona, arm);
    mkdirSync(dir, { recursive: true });
    for (const p of prompts) {
      const code = arm === 'augmented'
        ? mockAugmented(p)
        : mockBaseline(p);
      writeFileSync(path.join(dir, `${p.id}.html`), code);
    }
  }
  console.log('Mock generated for arms:', ARMS.join(', '));
}

function mockAugmented(p) {
  return p.expectedComponents
    .map((tag) => `<${tag} class="demo">${tag}</${tag}>`)
    .join('\n');
}

function mockBaseline(p) {
  // Simulate an agent that guesses with some inaccuracies (demonstrates gaps).
  return p.expectedComponents
    .map((tag, i) => (i % 3 === 0
      ? `<${tag} class="demo" inventattr="x">${tag}</${tag}>`
      : `<${tag} class="demo">${tag}</${tag}>`))
    .join('\n');
}

(async () => {
  const a = args();
  if (a.cmd === 'evaluate') await doEvaluate(a);
  else if (a.cmd === 'compare') doCompare(a);
  else if (a.cmd === 'scorecard') doScorecard(a);
  else if (a.cmd === 'generate' && a.mock) doMockGenerate();
  else {
    console.error(
      `usage: node bench/src/cli.mjs <evaluate|compare|scorecard|generate --mock> [--iteration id] [--arm ...] [--persona ${PERSONAS.join('|')}] [--model name] [--markdown]`,
    );
    process.exit(1);
  }
})();

// Dependency-free MCP (Model Context Protocol) server exposing Baklava to agents.
//
// This is the "improved MCP" deliverable of the agent tooling: whereas the legacy
// baklava-mcp-server fetched .mdx docs from GitHub over HTTP, this server reads
// the LOCAL generated custom-elements.json (single source of truth) and emits
// dense, token-efficient component data through tools an agent can call.
//
// Transport: stdio with newline-delimited JSON-RPC 2.0 messages (the MCP stdio
// transport). Compatible with clients such as Claude Desktop / VS Code / MCP
// inspectors that launch a process and speak MCP over stdio.
//
// Run:  node tools/agent-tooling/mcp/mcp-server.mjs
//
// Tools:
//   list_components                 -> dense catalog of all bl-* components
//   get_component  ({name})         -> dense API for one component
//   component_build ({prompt})      -> rank components for a plain-language prompt
//   component_examples ({name})     -> real usage examples from a story
//   component_source ({name})       -> full component source (for customization)
//   validate_output ({html})        -> lint an HTML string against the real API
import { loadCem, publicComponents, componentDetail } from '../cli/lib/cem.mjs';
import { renderComponentDense, renderComponentBrief } from '../cli/lib/dense.mjs';
import { rankComponents, renderBuildResults } from '../cli/lib/search.mjs';
import { extractExamples, renderExamples } from '../cli/lib/examples.mjs';
import { loadIndex, extractBlTags, extractAttributePairs, parseEnumValues, extractNestingViolations } from '../bench/src/evaluate.mjs';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import readline from 'node:readline';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../../../', import.meta.url)));

const TOOLS = [
  { name: 'list_components', description: 'List all Baklava (bl-*) components with a brief summary.', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_component', description: 'Get the dense, token-efficient API (attributes, events, slots, css vars) for one Baklava component.', inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'component name or tag, e.g. "button" or "bl-input"' } }, required: ['name'] } },
  { name: 'component_build', description: 'Given a plain-language prompt, rank which Baklava components to use (Astryx "build" style discovery).', inputSchema: { type: 'object', properties: { prompt: { type: 'string' } }, required: ['prompt'] } },
  { name: 'component_examples', description: 'Print real usage examples for a component from its Storybook story.', inputSchema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] } },
  { name: 'component_source', description: 'Print the full source of a component for deep customization.', inputSchema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] } },
  { name: 'validate_output', description: 'Lint an HTML string against the real Baklava API: unknown tags, invalid enum values, unknown attributes, nesting, inline styles, wrapper divs. Returns a JSON report with critical/acceptable findings.', inputSchema: { type: 'object', properties: { html: { type: 'string' } }, required: ['html'] } },
];

function load() {
  const { classes } = loadCem();
  return classes;
}

function findComponent(classes, name) {
  const key = (name || '').toLowerCase().replace(/^bl-/, '');
  const exact = classes.find((c) => c.tagName && c.tagName.toLowerCase().replace(/^bl-/, '') === key);
  return exact || classes.find((c) => c.tagName && c.tagName.toLowerCase() === `bl-${key}`);
}

function resolveSource(tag) {
  const dirName = tag.replace(/^bl-/, '');
  const base = path.join(REPO_ROOT, 'src', 'components');
  if (!existsSync(base)) return `// Source not found for ${tag}`;
  const flat = path.join(base, dirName, `bl-${dirName}.ts`);
  if (existsSync(flat)) return readFileSync(flat, 'utf8');
  for (const group of readdirSync(base)) {
    const nested = path.join(base, group, dirName, `bl-${dirName}.ts`);
    if (existsSync(nested)) return readFileSync(nested, 'utf8');
  }
  return `// Source not found for ${tag}`;
}

function callTool(name, args = {}, classes) {
  switch (name) {
    case 'list_components': {
      const list = publicComponents(classes).map((c) => ({
        tag: c.tagName, summary: (c.summary && typeof c.summary !== 'string' ? '' : c.summary) || '',
      }));
      const text = list.map((c) => renderComponentBrief({ ...componentDetail(classes.find((x) => x.tagName === c.tag)), tag: c.tag })).join('\n');
      return { text, data: list };
    }
    case 'get_component': {
      const cls = findComponent(classes, args.name);
      if (!cls) return { text: `Unknown component "${args.name}".`, error: true };
      const detail = componentDetail(cls);
      return { text: renderComponentDense(detail), data: detail };
    }
    case 'component_build': {
      const ranked = rankComponents(classes, args.prompt || '');
      return { text: renderBuildResults(ranked), data: ranked };
    }
    case 'component_examples': {
      const cls = findComponent(classes, args.name);
      if (!cls) return { text: `Unknown component "${args.name}".`, error: true };
      const ex = extractExamples(cls.tagName);
      return { text: renderExamples(cls.tagName, ex), data: ex };
    }
    case 'component_source': {
      const cls = findComponent(classes, args.name);
      if (!cls) return { text: `Unknown component "${args.name}".`, error: true };
      return { text: resolveSource(cls.tagName), data: { tag: cls.tagName } };
    }
    case 'validate_output': {
      const html = args.html || '';
      const { index } = loadIndex();
      const findings = [];
      const universal = new Set(['class', 'id', 'style', 'slot', 'role']);
      for (const t of extractBlTags(html)) {
        if (!index.has(t)) {
          findings.push({ severity: 'critical', type: 'unknown-tag', detail: `Unknown tag <${t}> (not in the library)` });
          continue;
        }
        const detail = index.get(t);
        const known = new Set([...detail.attributes.map((a) => a.attribute ?? a.name), ...detail.properties.map((p) => p.attribute ?? p.name)]);
        const typeByKey = new Map();
        for (const a of [...(detail.attributes || []), ...(detail.properties || [])]) {
          const k = a.attribute || a.name;
          if (k) typeByKey.set(k, a.type);
        }
        for (const { name: attr, value } of extractAttributePairs(html, t)) {
          if (attr === t || attr.startsWith('data-') || attr.startsWith('aria-')) continue;
          if (!known.has(attr) && !universal.has(attr)) {
            findings.push({ severity: 'acceptable', type: 'unknown-attr', detail: `<${t}> attr "${attr}" not part of API` });
            continue;
          }
          const allowed = parseEnumValues(typeByKey.get(attr));
          if (allowed && value && !allowed.has(value)) {
            findings.push({ severity: 'critical', type: 'bad-value', detail: `<${t}> ${attr}="${value}" invalid (allowed: ${[...allowed].join(' | ')})` });
          }
        }
      }
      for (const v of extractNestingViolations(html)) findings.push({ severity: 'acceptable', type: 'nesting', detail: v });
      if ((html.match(/\bstyle=/gi) || []).length) findings.push({ severity: 'acceptable', type: 'inline-style', detail: 'inline style= present (use CSS vars / classes instead)' });
      if ((html.match(/<div[\s>]/gi) || []).length) findings.push({ severity: 'acceptable', type: 'wrapper-div', detail: 'wrapper <div> present — prefer Baklava layout components' });
      const report = {
        ok: findings.length === 0,
        count: findings.length,
        critical: findings.filter((f) => f.severity === 'critical').length,
        acceptable: findings.filter((f) => f.severity === 'acceptable').length,
        findings,
      };
      return { text: JSON.stringify(report, null, 2), data: report };
    }
    default:
      return { text: `Unknown tool ${name}`, error: true };
  }
}

const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
const classes = load();

function write(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

rl.on('line', (line) => {
  if (!line.trim()) return;
  let req;
  try { req = JSON.parse(line); } catch { return; }
  const { id, method, params = {} } = req;

  if (method === 'initialize') {
    write({ jsonrpc: '2.0', id, result: {
      protocolVersion: params.protocolVersion || '2024-11-05',
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: 'baklava-mcp', version: '0.1.0' },
    } });
    return;
  }
  if (method === 'notifications/initialized' || method === 'ping') {
    if (method === 'ping' && id != null) write({ jsonrpc: '2.0', id, result: {} });
    return;
  }
  if (method === 'tools/list') {
    write({ jsonrpc: '2.0', id, result: { tools: TOOLS } });
    return;
  }
  if (method === 'tools/call') {
    const { name, arguments: args = {} } = params;
    let text, error = false;
    try {
      const r = callTool(name, args, classes);
      text = r.text; error = r.error;
    } catch (e) {
      text = `Error: ${e.message}`; error = true;
    }
    write({
      jsonrpc: '2.0', id,
      result: {
        content: [{ type: 'text', text }],
        isError: !!error,
      },
    });
    return;
  }
  if (id != null) write({ jsonrpc: '2.0', id, result: {} });
});

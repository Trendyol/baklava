#!/usr/bin/env node
// Baklava Agent CLI — docs-first, token-efficient access to the Baklava
// design system for coding agents (models Astryx's `astryx` CLI).
//
// Usage:
//   node tools/agent-tooling/cli/bin/baklava.mjs help
//   node tools/agent-tooling/cli/bin/baklava.mjs components
//   node tools/agent-tooling/cli/bin/baklava.mjs component<NAME> [--dense|--props|--source|--example]
//   node tools/agent-tooling/cli/bin/baklava.mjs build "<prompt>"
//   node tools/agent-tooling/cli/bin/baklava.mjs swizzle<NAME>
//   node tools/agent-tooling/cli/bin/baklava.mjs docs
//   ... --json  # machine-readable output envelope for MCP/agent consumers
import { loadCem, publicComponents, componentDetail } from '../lib/cem.mjs';
import { renderComponentDense, renderComponentBrief } from '../lib/dense.mjs';
import { rankComponents, renderBuildResults } from '../lib/search.mjs';
import { extractExamples, renderExamples } from '../lib/examples.mjs';
import {
  loadIndex,
  extractBlTags,
  extractAttributePairs,
  parseEnumValues,
  extractNestingViolations,
} from '../../bench/src/evaluate.mjs';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(
  fileURLToPath(new URL('../../../../', import.meta.url)),
);

function parseArgs(argv) {
  const opts = { json: false, dense: false, props: false, source: false, example: false, category: null };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') opts.json = true;
    else if (a === '--dense') opts.dense = true;
    else if (a === '--props') opts.props = true;
    else if (a === '--source') opts.source = true;
    else if (a === '--example') opts.example = true;
    else if (a === '--category') { opts.category = argv[++i]; }
    else positional.push(a);
  }
  return { opts, positional };
}

const HELP = `Baklava Agent CLI — agent-friendly access to the Baklava design system.

Commands:
  help                          Show this help.
  components [--category <g>]  List all bl-* components (brief).
  component <name> [opts]      Component detail.
      --dense                  Compact, token-efficient API dump.
      --props                  Attributes + JS properties only.
      --source                 Print component source (.ts).
      --example                Print usage examples from the story.
  build "<prompt>"             Rank components for a plain-language prompt.
  validate <file.html>        Lint a generated HTML file against the real API; exit non-zero if errors.
  example <name>               Print usage examples for a component.
  swizzle <name>               Print full component source for customization.
  docs                         List agent-tooling/reference documentation files.

Global options:
  --json                       Emit a machine-readable JSON envelope on stdout.
`;

function findComponent(classes, name) {
  const key = name.toLowerCase().replace(/^bl-/, '');
  const exact = classes.find((c) => c.tagName && c.tagName.toLowerCase() === `bl-${key}`);
  if (exact) return exact;
  return classes.find(
    (c) => c.tagName && c.tagName.toLowerCase().replace(/^bl-/, '') === key,
  );
}

async function main() {
  const { opts, positional } = parseArgs(process.argv.slice(2));
  const [cmd, arg] = positional;
  const { classes } = loadCem();

  let data = null;
  let exitCode = 0;

  switch (cmd) {
    case 'help':
    case undefined:
      data = { text: HELP };
      break;
    case 'components': {
      let list = publicComponents(classes);
      if (opts.category) list = list.filter((c) => {
        const n = (c.tagName || '').replace(/^bl-/, '');
        return n.includes(opts.category.toLowerCase());
      });
      data = {
        components: list.map((c) => ({
          tag: c.tagName,
          summary: c.summary || c.description || '',
          attributes: (c.attributes || []).map((a) => a.name),
        })),
      };
      if (!opts.json) {
        data.text = list.map((c) =>
          renderComponentBrief({ ...componentDetail(c), tag: c.tagName }),
        ).join('\n');
      }
      break;
    }
    case 'component':
    case 'example':
    case 'swizzle': {
      if (!arg) return fail(1, 'ERR_NO_NAME', `Expected a component name, e.g. baklava component button`);
      const cls = findComponent(classes, arg);
      if (!cls) {
        return fail(1, 'ERR_UNKNOWN_COMPONENT', `Unknown component "${arg}". Try "baklava components".`);
      }
      if (cmd === 'swizzle' || opts.source) {
        const src = resolveSource(cls.tagName);
        data = { tag: cls.tagName, source: src };
        if (!opts.json) data.text = src;
        break;
      }
      if (cmd === 'example' || opts.example) {
        const ex = extractExamples(cls.tagName);
        data = { tag: cls.tagName, ...ex };
        if (!opts.json) data.text = renderExamples(cls.tagName, ex);
        break;
      }
      const detail = componentDetail(cls);
      if (opts.props) {
        data = { tag: cls.tagName, attributes: detail.attributes, properties: detail.properties };
        if (!opts.json) {
          data.text = [
            `Attributes of ${cls.tagName}:`,
            ...detail.attributes.map((a) => `  ${a.attribute} (${a.type}${a.default != null ? ' = ' + a.default : ''})`),
            ...(detail.properties.length ? [`JS Properties:`, ...detail.properties.map((p) => `  .${p.name} (${p.type}${p.default != null ? ' = ' + p.default : ''})`)] : []),
          ].join('\n');
        }
        break;
      }
      data = detail;
      if (!opts.json) data.text = renderComponentDense(detail);
      break;
    }
    case 'build': {
      const promptText = arg || positional[1] || '';
      if (!promptText) return fail(1, 'ERR_NO_PROMPT', 'Expected a prompt: baklava build "a login form with email and password"');
      const ranked = rankComponents(classes, promptText);
      data = ranked;
      if (!opts.json) data.text = renderBuildResults(ranked);
      break;
    }
    case 'validate': {
      const file = arg || positional[1] || '';
      if (!file) return fail(1, 'ERR_NO_FILE', 'Expected a file to validate: baklava validate build/settings-toggles.html');
      const abs = path.resolve(file);
      if (!existsSync(abs)) return fail(1, 'ERR_NO_FILE', `File not found: ${file}`);
      const code = readFileSync(abs, 'utf8');
      const report = validateAgainstApi(code, file);
      data = report;
      const summary = report.critical + report.acceptable === 0
        ? `✓ ${file}: clean — no API errors detected.`
        : `✗ ${file}: ${report.critical} critical + ${report.acceptable} acceptable issue(s). Fix them and re-run validate.`;
      if (!opts.json) {
        const lines = [summary];
        if (report.findings.length) lines.push('', ...report.findings.map((f) => `- [${f.severity}] ${f.detail}`));
        data.text = lines.join('\n');
      }
      // Non-zero exit when the generated file has any fixable issue, so the
      // agent can iterate until validate returns clean. Never blocks on json.
      if (!opts.json && report.critical + report.acceptable > 0) exitCode = 1;
      break;
    }
    case 'docs': {
      const docsDir = path.join(REPO_ROOT, 'tools', 'agent-tooling');
      const { readdirSync } = await import('node:fs');
      let files = [];
      try { files = readdirSync(docsDir).filter((f) => f.endsWith('.md')); } catch { /* ignore */ }
      data = { docs: files };
      if (!opts.json) data.text = ['Agent-tooling docs:', ...files.map((f) => `  tools/agent-tooling/${f}`)].join('\n');
      break;
    }
    default:
      return fail(1, 'ERR_UNKNOWN_COMMAND', `Unknown command "${cmd}". Run "baklava help".`);
  }

  if (opts.json) {
    console.log(JSON.stringify({ ok: true, command: cmd, ...data }, null, 2));
  } else {
    console.log(data.text ?? JSON.stringify(data, null, 2));
  }
  return exitCode;
}

// Lint a generated HTML file against the real CEM, mirroring the benchmark
// evaluator's checks so that "validate passes" means "no rubric escape hatches".
// Reuses the evaluator's helpers so the CLI and the benchmark never drift.
function validateAgainstApi(code, file) {
  const { index } = loadIndex();
  const realTags = new Set(index.keys());
  const tagsUsed = extractBlTags(code);
  const findings = [];
  const universal = new Set(['class', 'id', 'style', 'slot', 'role']);

  for (const t of tagsUsed) {
    if (!realTags.has(t)) {
      findings.push({ severity: 'critical', type: 'unknown-tag', detail: `Unknown tag <${t}> (not in the library)` });
      continue;
    }
    const detail = index.get(t);
    const known = new Set([
      ...detail.attributes.map((a) => a.attribute ?? a.name),
      ...detail.properties.map((p) => p.attribute ?? p.name),
    ]);
    const typeByKey = new Map();
    for (const a of [...(detail.attributes || []), ...(detail.properties || [])]) {
      const key = a.attribute || a.name;
      if (key) typeByKey.set(key, a.type);
    }
    for (const { name: attr, value } of extractAttributePairs(code, t)) {
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

  for (const v of extractNestingViolations(code)) {
    findings.push({ severity: 'acceptable', type: 'nesting', detail: v });
  }
  const inlineStyleCount = (code.match(/\bstyle=/gi) || []).length;
  if (inlineStyleCount > 0) {
    findings.push({ severity: 'acceptable', type: 'inline-style', detail: `${inlineStyleCount} inline style= (use CSS vars / classes instead)` });
  }
  const divCount = (code.match(/<div[\s>]/gi) || []).length;
  if (divCount > 0) {
    findings.push({ severity: 'acceptable', type: 'wrapper-div', detail: `${divCount} wrapper <div>(s) — prefer Baklava layout components` });
  }

  const critical = findings.filter((f) => f.severity === 'critical').length;
  const acceptable = findings.filter((f) => f.severity === 'acceptable').length;
  const tagsValid = tagsUsed.filter((t) => realTags.has(t)).length;
  return { file, tagsUsed: tagsUsed.length, tagsValid, critical, acceptable, findings };
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
  return `// Source not found for ${tag} under src/components/**/${dirName}/`;
}

function fail(code, errCode, message) {
  const { opts } = parseArgs(process.argv.slice(2));
  if (opts.json) {
    console.log(JSON.stringify({ ok: false, error: { code: errCode, message } }, null, 2));
  } else {
    console.error(message);
  }
  return code;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(err.message || String(err));
    process.exit(1);
  });

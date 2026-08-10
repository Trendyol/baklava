// Deterministic evaluator for the Baklava before/after benchmark.
//
// Scores a generated UI against the real component API (CEM) on rubric
// dimensions in the spirit of Astryx's vibe tests. The evaluator is fully
// deterministic and dependency-free: given the generated code and the real tag
// set, it always returns the same result, so before/after numbers are comparable.
import { loadCem, componentIndex } from '../../cli/lib/cem.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFileSync, existsSync } from 'node:fs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../../../../', import.meta.url)));
const PROMPT_DIR = path.join(REPO_ROOT, 'poc', 'agent-tooling', 'bench', 'prompts');
const PERSONAS = ['naive', 'experienced', 'adversarial'];

// Backwards-compatible: prompts.json is the canonical naive battery.
function promptFile(persona) {
  if (!persona || persona === 'naive') return 'prompts.json';
  return `${persona}.json`;
}

/** Load a persona's prompt battery. Defaults to naive. */
export function loadPrompts(persona = 'naive') {
  try {
    const f = path.join(PROMPT_DIR, promptFile(persona));
    return JSON.parse(readFileSync(f, 'utf8')).prompts;
  } catch (err) {
    if (persona && persona !== 'naive') return loadPrompts('naive');
    throw err;
  }
}

export function loadPrompt(id, persona = 'naive') {
  return loadPrompts(persona).find((p) => p.id === id);
}

export { PERSONAS };


export function loadIndex() {
  const { classes } = loadCem();
  return { classes, index: componentIndex(classes) };
}

function isBlTag(name) {
  return /^bl-[a-z-]+$/.test(name);
}

/** Extract all <bl-...> tags appearing in generated code. */
export function extractBlTags(code) {
  const tags = new Set();
  const re = /<bl-([a-z0-9-]+)(?=[\s>/])/gi;
  let m;
  while ((m = re.exec(code))) tags.add(`bl-${m[1].toLowerCase()}`);
  return [...tags];
}

/** Extract attribute name/value pairs used on a given bl- tag. */
export function extractAttributePairs(code, tag) {
  const attrs = [];
  const re = new RegExp(`<${tag}(?=[\\s/>])([^>]*)>`, 'gi');
  let m;
  while ((m = re.exec(code))) {
    const open = m[1];
    const attrRe = /\s+([a-z][\w-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([\w.\-\/$:{}\@#]+)))?/gi;
    let a;
    while ((a = attrRe.exec(open))) {
      const name = a[1];
      if (/^(bl-|class|id|style|slot|\?|@)$/.test(name)) continue;
      if (name.startsWith('\?') || name.startsWith('@')) continue;
      const value = a[2] ?? a[3] ?? a[4] ?? '';
      attrs.push({ name, value });
    }
  }
  return attrs;
}

/**
 * Derive allowed string-literal values from a CEM type union such as
 * '"primary" | "secondary" | "tertiary"'. Returns a Set of allowed values,
 * or null when the type is not a closed string enum (so we skip validation).
 */
export function parseEnumValues(typeStr) {
  if (!typeStr) return null;
  const strs = [...typeStr.matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  if (!strs.length) return null;
  // Only treat it as a strict enum if the union is made of literals + maybe boolean.
  const allowed = new Set(strs);
  const nonLiteral = typeStr.replace(/"[^"]*"/g, '').replace(/\s*\|\s*/g, '').trim();
  if (nonLiteral && nonLiteral !== 'boolean') return null;
  if (nonLiteral === 'boolean') { allowed.add('true'); allowed.add('false'); allowed.add(''); }
  return allowed;
}

// Parent-child structural rules checked in generated code.
const NESTING_RULES = {
  'bl-table-header': 'bl-table',
  'bl-table-body': 'bl-table',
  'bl-table-row': 'bl-table',
  'bl-table-cell': 'bl-table',
  'bl-tab': 'bl-tab-group',
  'bl-tab-panel': 'bl-tab-group',
  'bl-stepper-item': 'bl-stepper',
  'bl-select-option': 'bl-select',
  'bl-notification-card': 'bl-notification',
  'bl-accordion': 'bl-accordion-group',
};

/** Lightweight stack parse of bl-* nesting; returns orphan children. */
export function extractNestingViolations(code) {
  const tokenRe = /<\/?(bl-[a-z0-9-]+)(?=[\s/>])|(<\/?bl-[a-z0-9-]+\s*\/?>)/gi;
  // Simpler robust tokenizer: match open/close tags (attrs may contain '>', handle via scan).
  const violations = [];
  const stack = [];
  const tagRe = /<\/?bl-[a-z0-9-]+/gi;
  let m;
  const tokens = [];
  while ((m = tagRe.exec(code))) {
    const raw = m[0];
    const closing = raw[1] === '/';
    if (closing) { tokens.push({ close: true, name: raw.slice(2).toLowerCase() }); continue; }
    // determine self-closing by skipping to matching '>' unless inside quotes
    let i = m.index + raw.length;
    let selfClose = false;
    const seg = code.slice(i);
    let j = 0; let quote = null;
    for (; j < seg.length; j++) {
      const ch = seg[j];
      if (quote) { if (ch === quote) quote = null; continue; }
      if (ch === '"' || ch === "'") { quote = ch; continue; }
      if (ch === '>') break;
    }
    if (seg[j - 1] === '/') selfClose = true;
    tokens.push({ close: false, name: raw.slice(1).toLowerCase(), selfClose });
  }
  for (const t of tokens) {
    if (t.close) {
      const idx = stack.lastIndexOf(t.name);
      if (idx >= 0) stack.splice(idx, 1);
      continue;
    }
    const required = NESTING_RULES[t.name];
    if (required && !stack.includes(required)) {
      violations.push(`<${t.name}> not nested inside ${required}`);
    }
    if (!t.selfClose) stack.push(t.name);
  }
  return [...new Set(violations)];
}

/** Extract attributes used on a given bl- tag. Skips quoted values so words inside
 * attribute strings are not misread as attributes. */
export function extractAttributesForTag(code, tag) {
  const attrs = new Set();
  const re = new RegExp(`<${tag}(?=[\\s/>])([^>]*)>`, 'gi');
  let m;
  while ((m = re.exec(code))) {
    const open = m[1];
    // an attribute name is a word at a whitespace boundary, optionally with a
    // quoted/bare value that is consumed so its contents are not re-matched.
    const attrRe = /\s+([a-z][\w-]*)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[\w.\-\/${}:@#]+))?/gi;
    let a;
    while ((a = attrRe.exec(open))) {
      const name = a[1];
      if (/^(bl-|class|id|style|slot|\\?|@)$/.test(name)) continue;
      if (name.startsWith('\\?') || name.startsWith('@')) continue;
      attrs.add(name);
    }
  }
  return [...attrs];
}

function clamp(n) { return Math.max(0, Math.min(100, n)); }

/**
 * Evaluate one generated response.
 * @param {string} code generated UI
 * @param {string[]} expectedComponents real bl-* tags the prompt likely needs
 * @returns evaluation object (Astryx-shaped schema)
 */
export function evaluate(code, expectedComponents) {
  const { index } = loadIndex();
  const realTags = new Set(index.keys());
  const tagsUsed = extractBlTags(code);

  const componentsUsed = [];
  const componentsExpected = [...expectedComponents];
  const escapeHatches = [];
  const confusionSignals = [];

  for (const t of tagsUsed) {
    if (realTags.has(t)) {
      componentsUsed.push(t);
    } else {
      escapeHatches.push({ type: 'hallucination', severity: 'critical', detail: `Unknown tag <${t}>`, codeSnippet: t });
      confusionSignals.push(`Hallucinated tag ${t}`);
    }
  }

  // Unused expected components (missed) are a correctness concern, not escape.
  const usedSet = new Set(componentsUsed);
  const missed = componentsExpected.filter((c) => !usedSet.has(c));

  // Attribute violations: real tags with unknown attributes, plus invalid
  // enum values (wrong_values) validated against the CEM type union.
  for (const t of tagsUsed) {
    if (!realTags.has(t)) continue;
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
    // universal HTML attrs tolerated
    const universal = new Set(['class', 'id', 'style', 'slot', 'aria-label', 'aria-hidden', 'role', 'data-*']);
    for (const { name: attr, value } of extractAttributePairs(code, t)) {
      if (attr === t) continue;
      if (attr.startsWith('data-')) continue;
      if (attr.startsWith('aria-')) continue;
      if (!known.has(attr) && !universal.has(attr)) {
        escapeHatches.push({ type: 'wrong_component', severity: 'acceptable', detail: `<${t}> attr "${attr}" not part of API`, codeSnippet: attr });
        confusionSignals.push(`Unknown attr ${attr} on ${t}`);
        continue;
      }
      // Validate enum values derived from the CEM type union.
      const allowed = parseEnumValues(typeByKey.get(attr));
      if (allowed && value && !allowed.has(value)) {
        escapeHatches.push({ type: 'wrong_value', severity: 'critical', detail: `<${t}> ${attr}="${value}" is not a valid value (allowed: ${[...allowed].join(' | ')})`, codeSnippet: `${attr}="${value}"` });
        confusionSignals.push(`Invalid ${attr} value "${value}" on ${t}`);
      }
    }
  }

  // Structural / nesting violations against known parent-child contracts.
  for (const v of extractNestingViolations(code)) {
    escapeHatches.push({ type: 'nesting', severity: 'acceptable', detail: v, codeSnippet: v });
    confusionSignals.push(v);
  }

  // Styling escape hatches.
  const inlineStyleCount = (code.match(/\bstyle=/gi) || []).length;
  if (inlineStyleCount > 0) {
    escapeHatches.push({ type: 'inline_style', severity: 'acceptable', detail: `used ${inlineStyleCount} inline style=`, codeSnippet: 'style=' });
  }
  const divCount = (code.match(/<div[\s>]/gi) || []).length;
  if (divCount > 0) {
    escapeHatches.push({ type: 'wrapper_div', severity: 'acceptable', detail: `used ${divCount} layout div(s)`, codeSnippet: '<div' });
  }

  const critical = escapeHatches.filter((e) => e.severity === 'critical').length;
  const acceptable = escapeHatches.filter((e) => e.severity === 'acceptable').length;

  // Rubric dimensions (0-100).
  const correctness = clamp(
    100 - (critical) * 25 - missed.length * 5 - acceptable * 2,
  );
  // accessibility: any bl-* used counts as accessible base; aria-label usage helps
  const ariaCount = (code.match(/aria-(label|hidden|role)/gi) || []).length;
  const a11y = clamp(70 + ariaCount * 10 + componentsUsed.length * 3);
  const efficiency = clamp(100 - componentsUsed.length * 4 - inlineStyleCount * 5 - divCount * 3);
  const codeQuality = clamp(90 - critical * 15 - acceptable * 3);
  const maintainability = clamp(100 - acceptable * 4 - critical * 12);

  const overall = Math.round(
    correctness * 0.4 + a11y * 0.2 + efficiency * 0.13 + codeQuality * 0.13 + maintainability * 0.14,
  );

  const success = correctness >= 60 && critical === 0;

  return {
    success: Boolean(success),
    overall,
    componentsUsed,
    componentsExpected: componentsExpected,
    missed,
    escapeHatches,
    failureMode: critical > 0 ? 'hallucination' : missed.length ? 'missing_components' : null,
    confusionSignals,
    scores: { correctness, accessibility: a11y, efficiency, codeQuality, maintainability, overall },
  };
}

export { existsSync };

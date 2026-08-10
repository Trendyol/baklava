// Baklava Agent CLI — Custom Elements Manifest (CEM) loader + queries.
//
// The `dist/custom-elements.json` manifest is Baklava's generated source of
// truth for the component API (attributes, properties, events, slots, css
// custom properties). This module loads it once and exposes small query
// functions used by every CLI command. It is dependency-free ESM.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const DEFAULT_CEM = path.resolve(
  fileURLToPath(new URL('../../../../', import.meta.url)),
  'dist/custom-elements.json',
);

export class CemError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export function loadCem(cemPath = process.env.BAKLAVA_CEM || DEFAULT_CEM) {
  let raw;
  try {
    raw = readFileSync(cemPath, 'utf8');
  } catch (err) {
    throw new CemError(
      `Cannot read custom-elements.json at ${cemPath}. Run "npm run build" first. (${err.message})`,
      'ERR_CEM_NOT_FOUND',
    );
  }
  const cem = JSON.parse(raw);
  const classes = (cem.modules || []).flatMap(
    (m) => m.declarations || [],
  ).filter((d) => d.kind === 'class');
  return { cem, classes };
}

/** Public-facing component descriptors: skip underscore-private members, tags only. */
export function publicComponents(classes) {
  return classes.filter((c) => c.tagName);
}

export function cleanType(t) {
  if (!t) return t;
  // strip import("<rootPath>/...") wrappers down to the referenced symbol
  return t.replace(/import\("([^"]*)"\)\./g, '')
    .replace(/import\("([^"]*)"\)/g, (m0, p) => (p.split('/').pop() || m0));
}

function memberToProp(m) {
  const raw = m.parsedType?.text || m.type?.text || null;
  // public field members that reflect to an attribute are the public API surface.
  const isPublic = !m.name.startsWith('_');
  return {
    name: m.name,
    attribute: m.attribute || null,
    type: cleanType(raw),
    default: m.default ?? null,
    description: m.description || '',
    reflects: Boolean(m.reflects),
    public: isPublic,
  };
}

function summarize(cls) {
  const s = cls.summary || cls.description;
  if (Array.isArray(s)) {
    return s.map((e) => (e && typeof e === 'object' ? e.description || e.name : e)).filter(Boolean).join(' ');
  }
  return (s && typeof s === 'object') ? (s.description || s.text || '') : (String(s || ''));
}

export function componentDetail(cls) {
  const members = (cls.members || [])
    .map(memberToProp)
    .filter((m) => m.public);
  return {
    name: cls.name,
    tag: cls.tagName,
    summary: summarize(cls),
    attributes: members.filter((m) => m.attribute),
    properties: members.filter((m) => !m.attribute),
    events: (cls.events || []).map((e) => ({
      name: e.name,
      type: cleanType(e.type?.text) || 'CustomEvent',
      description: e.description || '',
    })),
    slots: (cls.slots || []).map((s) => ({
      name: s.name || '(default)',
      description: s.description || '',
    })),
    cssProperties: (cls.cssProperties || []).map((c) => ({
      name: c.name,
      default: c.default || null,
      description: c.description || '',
    })),
  };
}

/** Map from tag (bl-*) to detail, for the evaluator / integrations. */
export function componentIndex(classes) {
  const index = new Map();
  for (const c of publicComponents(classes)) {
    index.set(c.tagName, componentDetail(c));
  }
  return index;
}

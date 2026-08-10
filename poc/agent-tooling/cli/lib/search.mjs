// Deterministic, dependency-free discovery/ranking for `baklava build "<prompt>"`.
// Models Astryx's `astryx build`: gather every candidate (components), clean the
// prompt (drop filler, expand synonyms, stem), then score on a fixed ladder:
// exact name > keyword > near-match (edit distance) > description mention.
import { componentDetail } from './cem.mjs';

const FILLERS = new Set([
  'a', 'an', 'the', 'i', 'need', 'want', 'build', 'make', 'create', 'add', 'with',
  'for', 'to', 'of', 'and', 'or', 'my', 'me', 'that', 'this', 'these', 'those',
  'page', 'using', 'use', 'please', 'can', 'you', 'component', 'elements', 'an',
]);

// Map a plain-language concept to Baklava component keywords/attributes.
const SYNONYMS = {
  form: ['input', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'button'],
  login: ['input', 'button'],
  signup: ['input', 'button'],
  password: ['input', 'button'],
  submit: ['button', 'form'],
  textfield: ['input'],
  password: ['input'],
  email: ['input'],
  dropdown: ['select', 'dropdown'],
  menu: ['dropdown', 'dropdown-menu'],
  picker: ['select', 'datepicker', 'calendar'],
  date: ['datepicker', 'calendar'],
  calendar: ['datepicker', 'calendar'],
  table: ['table'],
  grid: ['table'],
  dialog: ['dialog', 'drawer'],
  modal: ['dialog'],
  popup: ['popover', 'dialog', 'tooltip'],
  popover: ['popover', 'tooltip'],
  tooltip: ['tooltip'],
  toast: ['notification', 'notification-card'],
  notification: ['notification', 'alias'],
  action: ['button', 'split-button'],
  button: ['button', 'split-button'],
  switch: ['switch', 'toggle'],
  toggle: ['switch'],
  checkbox: ['checkbox', 'checkbox-group'],
  radio: ['radio', 'radio-group'],
  tag: ['tag', 'badge'],
  badge: ['badge', 'tag'],
  alert: ['alert'],
  banner: ['alert'],
  spinner: ['spinner', 'progress-indicator'],
  loading: ['spinner', 'progress-indicator', 'button'],
  progress: ['progress-indicator', 'spinner'],
  stepper: ['stepper'],
  wizard: ['stepper'],
  accordion: ['accordion', 'accordion-group'],
  collapse: ['accordion'],
  tabs: ['tab-group'],
  tab: ['tab-group'],
  link: ['link'],
  anchor: ['link'],
  icon: ['icon'],
  pagination: ['pagination'],
  drawer: ['drawer'],
};

function stem(word) {
  const w = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (w.length > 4 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  return w;
}

function expandPrompt(prompt) {
  const raw = prompt.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const cleaned = raw.filter((w) => !FILLERS.has(w)).map(stem);
  const expanded = new Set();
  for (const w of cleaned) {
    expanded.add(w);
    for (const [concept, targets] of Object.entries(SYNONYMS)) {
      if (stem(concept) === w) {
        for (const t of targets) expanded.add(stem(t));
      }
      // also match if a synonym target matches w
      for (const t of targets) {
        if (stem(t) === w) expanded.add(stem(t));
      }
    }
  }
  return { cleaned, expanded: [...expanded] };
}

function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

/**
 * Score every component against a prompt. Returns sorted candidates with a
 * `signal` label describing the strongest signal that matched.
 */
export function rankComponents(classes, prompt) {
  const { cleaned, expanded } = expandPrompt(prompt);
  const results = [];

  for (const cls of classes) {
    if (!cls.tagName) continue;
    const tag = cls.tagName; // bl-button
    const name = cls.tagName.replace(/^bl-/, ''); // button
    const detail = componentDetail(cls);
    const nameWords = [name, tag];
    const attrText = detail.attributes.map((a) => a.attribute.replace(/^bl-/, '')).join(' ');
    const descText = (detail.summary + ' ' + detail.attributes.map((a) => a.description).join(' ')).toLowerCase();

    let best = 0;
    let signal = null;

    for (const concept of cleaned) {
      // exact name match wins
      if (nameWords.includes(concept) || stem(name) === concept) {
        best = Math.max(best, 3);
        signal = 'exact_name';
      } else if (componentTagSynonym(name).includes(concept)) {
        best = Math.max(best, 3);
        signal = 'exact_name';
      }
    }
    // expanded (synonym) keyword hit on name
    for (const concept of expanded) {
      if (stem(name) === concept || name.includes(concept)) {
        best = Math.max(best, 2);
        signal = signal || 'keyword';
      }
    }
    // near match by edit distance on name
    for (const concept of cleaned) {
      if (editDistance(name, concept) <= 2 && concept.length > 2) {
        best = Math.max(best, 1);
        signal = signal || 'near_match';
      }
    }
    // attribute names mention
    for (const concept of expanded) {
      if (attrText.includes(concept)) {
        best = Math.max(best, 1);
        signal = signal || 'attribute';
      }
    }
    // description mention (weakest)
    const seenWords = cleaned.filter((c) => descText.includes(c)).length;
    if (seenWords > 0) {
      best = Math.max(best, Math.min(0.5 + 0.25 * seenWords, 2));
      signal = signal || 'description';
    }

    if (best > 0) {
      results.push({ tag: cls.tagName, name, score: Number(best.toFixed(2)), signal });
    }
  }

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.name.localeCompare(b.name);
  });
  return { cleaned, results };
}

// Map a component name to additional synonym names (e.g. select <- dropdown).
function componentTagSynonym(name) {
  const map = {
    select: ['dropdown'],
    button: ['action'],
    tabgroup: ['tabs'],
    'tab-group': ['tabs'],
    switch: ['toggle'],
    alert: ['banner'],
  };
  return map[name] || [];
}

export function renderBuildResults({ cleaned, results }, limit = 8) {
  const lines = [];
  lines.push(`Concepts matched: ${cleaned.join(', ') || '(none)'}`);
  if (!results.length) {
    lines.push('No components matched. Try "baklava components" to browse.');
    return lines.join('\n');
  }
  lines.push('Recommended components:');
  for (const r of results.slice(0, limit)) {
    lines.push(`  ${r.tag.padEnd(22)} score=${r.score} signal=${r.signal}`);
  }
  return lines.join('\n');
}

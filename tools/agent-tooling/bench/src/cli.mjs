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
import { renderDirectory, aggregateRender } from './render.mjs';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const REPO = path.resolve(fileURLToPath(new URL('../../../../', import.meta.url)));
const BENCH = path.join(REPO, 'tools', 'agent-tooling', 'bench');
const ALL_ARMS = ['baseline', 'mcp-only', 'mcp-validated', 'augmented'];
// Headline benchmark: the three MCP-centric conditions — no tooling, query-only MCP,
// and MCP + validate feedback loop. The CLI-augmented arm stays available for
// transport-vs-transport comparisons via BAKLAVA_ARMS="baseline,mcp-only,mcp-validated,augmented".
const DEFAULT_ARMS = ['baseline', 'mcp-only', 'mcp-validated'];
function resolveArms() {
  const env = process.env.BAKLAVA_ARMS;
  if (env) return env.split(',').map((s) => s.trim()).filter(Boolean);
  return [...DEFAULT_ARMS];
}
const ARMS = resolveArms();

// Human-readable arm labels for reports.
const ARM_LABELS = {
  baseline: 'Baseline (no tooling)',
  'mcp-only': 'Agent (MCP only)',
  'mcp-validated': 'Agent (MCP + Validate)',
  augmented: 'Augmented (MCP + CLI)',
};

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
  // Multi-sample support: `<id>.html` is sample 0, `<id>__<n>.html` is sample n.
  const dir = path.join(BENCH, 'results', 'inputs', persona, arm);
  const out = {};
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.html')) continue;
    const base = f.replace(/\.html$/, '');
    const m = base.match(/^(.*)__(\d+)$/);
    const id = m ? m[1] : base;
    const n = m ? Number(m[2]) : 0;
    (out[id] = out[id] || []).push({ n, code: readFileSync(path.join(dir, f), 'utf8') });
  }
  for (const id of Object.keys(out)) out[id].sort((a, b) => a.n - b.n);
  return out;
}

/** Simple descriptive stats for a numeric array (error-bar support). */
function stats(arr) {
  if (!arr.length) return { mean: 0, std: 0, min: 0, max: 0, sem: 0 };
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const std = Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length);
  return { mean: Math.round(mean), std: Math.round(std * 10) / 10, min: Math.min(...arr), max: Math.max(...arr), sem: mean ? Math.round((std / Math.sqrt(arr.length)) * 10) / 10 : 0 };
}

async function doRender({ iteration, persona = 'naive', arm = 'all' }) {
  const arms = arm === 'all' || !arm ? ARMS : [arm];
  const out = {};
  for (const a of arms) {
    out[a] = await renderDirectory({ iteration, persona, arm: a });
  }
  console.log(JSON.stringify(out, null, 2));
}

async function doEvaluate({ iteration, arm, persona, model }) {
  const armList = arm === 'all' || !arm ? ARMS : [arm];
  const prompts = loadPrompts(persona);
  const byPrompt = Object.fromEntries(prompts.map((p) => [p.id, p]));
  const summary = { iteration, persona: persona || 'naive', model: model || 'unknown', arms: {} };

  for (const a of armList) {
    const inputs = loadInputs(a, persona);
    const results = {};
    const dimKeys = ['correctness', 'accessibility', 'efficiency', 'codeQuality', 'maintainability', 'overall'];
    for (const [id, samples] of Object.entries(inputs)) {
      const prompt = byPrompt[id];
      if (!prompt) continue;
      const evals = samples.map((s) => evaluate(s.code, prompt.expectedComponents));
      const dimStats = {};
      for (const k of dimKeys) dimStats[k] = stats(evals.map((e) => e.scores[k] ?? e.overall));
      const escStats = stats(evals.map((e) => e.escapeHatches.length));
      const hallStats = stats(evals.map((e) => e.escapeHatches.filter((h) => h.type === 'hallucination').length));
      const succMean = Math.round(((evals.filter((e) => e.success).length) / evals.length) * 100);
      const ev0 = evals[0];
      results[id] = {
        id,
        persona: persona || 'naive',
        model: model || 'unknown',
        category: prompt.category,
        complexity: prompt.complexity,
        prompt: prompt.prompt,
        n: evals.length,
        evaluation: {
          success: ev0.success,
          overall: ev0.overall,
          componentsUsed: ev0.componentsUsed,
          componentsExpected: ev0.componentsExpected,
          missed: ev0.missed,
          escapeHatches: ev0.escapeHatches,
          failureMode: ev0.failureMode,
          confusionSignals: ev0.confusionSignals,
          scores: ev0.scores,
        },
        samples: evals.map((e, i) => ({ sample: samples[i].n || i + 1, response: samples[i].code, evaluation: { success: e.success, overall: e.overall, missed: e.missed, escapeHatches: e.escapeHatches, scores: e.scores } })),
        aggregate: { successRate: succMean, scores: dimStats, escapeHatches: escStats, hallucinations: hallStats },
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
  // each prompt contributes its mean dimension scores (across samples)
  const perPromptMean = (r, k) => r.aggregate?.scores?.[k]?.mean ?? r.evaluation?.scores?.[k] ?? r.evaluation?.scores?.overall ?? 0;
  const dims = {};
  for (const k of keys) dims[k] = stats(Object.values(results).map((r) => perPromptMean(r, k)));
  const n = Object.keys(results).length;
  let packed = 0, hall = 0, escape = 0;
  const allUsed = new Set();
  for (const r of Object.values(results)) {
    packed += r.aggregate?.successRate ?? (r.evaluation?.success ? 100 : 0);
    hall += r.aggregate?.hallucinations?.mean ?? r.evaluation?.escapeHatches?.filter((e) => e.type === 'hallucination').length ?? 0;
    escape += r.aggregate?.escapeHatches?.mean ?? r.evaluation?.escapeHatches?.length ?? 0;
    (r.evaluation?.componentsUsed || []).forEach((c) => allUsed.add(c));
  }
  const overall = dims.overall;
  return {
    n,
    successRate: n ? Math.round(packed / n) : 0,
    avgOverall: overall.mean,
    overallStd: overall.std,
    overallCI: overall.sem ? [Math.max(0, Math.round(overall.mean - 1.96 * overall.sem)), Math.min(100, Math.round(overall.mean + 1.96 * overall.sem))] : null,
    dimensions: Object.fromEntries(keys.map((k) => [k, dims[k].mean])),
    dimStd: Object.fromEntries(keys.map((k) => [k, dims[k].std])),
    dimensionErrBars: Object.fromEntries(keys.map((k) => [k, dims[k].sem ? { lo: Math.max(0, Math.round(dims[k].mean - 1.96 * dims[k].sem)), hi: Math.min(100, Math.round(dims[k].mean + 1.96 * dims[k].sem)) } : null])),
    totalHallucinations: Math.round(hall),
    totalEscapeHatches: Math.round(escape),
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
  const arms = {};
  for (const a of ARMS) arms[a] = readAgg(a);

  // Optional Astryx-style LLM-judge layer per arm: if judge/{arm}/*.json exist
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
  const judge = {};
  for (const a of ARMS) judge[a] = readJudge(a);

  // Optional headless-render layer per arm (kept separate, like judge).
  const readRender = (a) => {
    const f = path.join(base, 'render', `${a}.aggregate.json`);
    return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
  };
  const render = {};
  for (const a of ARMS) render[a] = readRender(a);

  // 3-step ladder deltas: walked along ARMS order, plus baseline -> last total.
  const deltaFor = (from, to) => {
    const b = arms[from], a = arms[to];
    if (!b || !a) return null;
    const d = {};
    for (const k of ['successRate', 'avgOverall']) d[k] = (a[k] ?? 0) - (b[k] ?? 0);
    for (const k of Object.keys(b.dimensions || {})) d[`dim.${k}`] = (a.dimensions?.[k] ?? 0) - (b.dimensions?.[k] ?? 0);
    d.totalHallucinations = (a.totalHallucinations ?? 0) - (b.totalHallucinations ?? 0);
    d.totalEscapeHatches = (a.totalEscapeHatches ?? 0) - (b.totalEscapeHatches ?? 0);
    return d;
  };
  // Step-wise ladder along ARMS ordering, plus baseline -> last total.
  const ladder = [];
  for (let i = 0; i + 1 < ARMS.length; i++) {
    ladder.push({ from: ARMS[i], to: ARMS[i + 1], delta: deltaFor(ARMS[i], ARMS[i + 1]) });
  }
  ladder.push({ from: ARMS[0], to: ARMS[ARMS.length - 1], delta: deltaFor(ARMS[0], ARMS[ARMS.length - 1]) });

  // Back-compat aliases so the rolling scorecard keeps reading this compare.json.
  const lastArm = ARMS[ARMS.length - 1];
  const compare = {
    iteration, persona, model,
    timestamp: new Date().toISOString(),
    system: 'Baklava',
    arms, ladder, delta: deltaFor('baseline', lastArm),
    before: arms.baseline, after: arms[lastArm],
    judge, render,
  };
  writeFileSync(path.join(base, 'compare.json'), JSON.stringify(compare, null, 2));
  writeFileSync(path.join(base, 'compare.md'), renderMarkdown(compare));
  console.log(renderMarkdown(compare));
}

// Rolling / nightly scorecard (Astryx-style ledger across iterations).
// Aggregates every iteration's compare.json into one table, optionally filtered
// by persona/arm, and writes scorecard.json + scorecard.md.
// Weight-duyarlılık analizi: rubrik ağırlıkları değişince before/after hikâyesi
// değişiyor mu? Farklı ağırlık vektörleriyle overall 'i yeniden hesaplayıp
// delta'nın kararlılık aralığını raporlar (makine-okunur + markdown).
const WEIGHT_VARIANTS = {
  base: [0.40, 0.20, 0.13, 0.13, 0.14],
  equal: [0.20, 0.20, 0.20, 0.20, 0.20],
  correctnessDominant: [0.55, 0.15, 0.10, 0.10, 0.10],
  accessibilityDominant: [0.25, 0.45, 0.10, 0.10, 0.10],
  maintainabilityDominant: [0.25, 0.15, 0.15, 0.15, 0.30],
};

function doSensitivity({ iteration }) {
  const base = path.join(BENCH, 'results', iteration);
  const scoresFor = (arm) => {
    const dir = path.join(base, 'evaluated', arm);
    const out = [];
    if (!existsSync(dir)) return out;
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.json')) continue;
      const s = JSON.parse(readFileSync(path.join(dir, f), 'utf8')).evaluation.scores;
      out.push(s);
    }
    return out;
  };
  const dims = ['correctness', 'accessibility', 'efficiency', 'codeQuality', 'maintainability'];
  const overall = (s, w) =>
    Math.round(dims.reduce((sum, d, i) => sum + (s[d] ?? 0) * w[i], 0));
  const aggOverall = (rows, w) => rows.length
    ? Math.round(rows.reduce((sum, r) => sum + overall(r, w), 0) / rows.length)
    : null;

  const perArm = {};
  for (const a of ARMS) perArm[a] = scoresFor(a);
  const variants = Object.entries(WEIGHT_VARIANTS).map(([name, w]) => {
    const v = { variant: name };
    for (const a of ARMS) v[a] = aggOverall(perArm[a], w);
    for (let i = 0; i + 1 < ARMS.length; i++) {
      const from = ARMS[i], to = ARMS[i + 1];
      v[`${from}→${to}`] = (v[from] != null && v[to] != null) ? v[to] - v[from] : null;
    }
    return v;
  });
  const pairDeltas = (fromKey, toKey) => variants.map((v) => v[`${fromKey}→${toKey}`]).filter((d) => d != null);
  const deltaRange = {};
  const stepKeys = [];
  for (let i = 0; i + 1 < ARMS.length; i++) {
    const from = ARMS[i], to = ARMS[i + 1];
    const key = `${from}→${to}`;
    stepKeys.push(key);
    const d = pairDeltas(from, to);
    deltaRange[key] = d.length ? { min: Math.min(...d), max: Math.max(...d) } : null;
  }
  const out = { iteration, arms: ARMS, variants, deltaRange };
  writeFileSync(path.join(base, 'sensitivity.json'), JSON.stringify(out, null, 2));
  const labels = { baseline: 'Baseline', 'mcp-only': 'Agent (MCP)', 'mcp-validated': 'Agent (MCP+Validate)', augmented: 'Augmented (MCP+CLI)' };
  const header = ['Variant', ...ARMS.map((a) => labels[a] || a), ...stepKeys];
  const rowKeys = ['variant', ...ARMS, ...stepKeys];
  const seps = header.map(() => '---');
  const rangeText = stepKeys.map((k) => `${k} **${fmtRange(out.deltaRange[k])}**`);
  const lines = [
    `# Sensitivity — rubric weights vs before/after delta`,
    `Iteration: \`${iteration}\``,
    ``,
    `> Recomputes overall with several weight vectors. If the step-wise tooling delta`,
    `> (${stepKeys.join(' → ')}) stays clearly positive across all variants, the`,
    `> conclusion is robust to rubric weighting.`,
    ``,
    '| ' + header.join(' | ') + ' |',
    '| ' + seps.join(' | ') + ' |',
    ...out.variants.map((v) => '| ' + rowKeys.map((h) => String(v[h] ?? '—')).join(' | ') + ' |'),
    ``,
    `Step-delta ranges: ${rangeText.join(', ')}`,
  ];
  writeFileSync(path.join(base, 'sensitivity.md'), lines.join('\n'));
  console.log(lines.join('\n'));
}

function fmtDelta(v) { return v != null ? (v > 0 ? '+' : '') + v : '—'; }
function fmtRange(r) { return r ? `${r.min} .. ${r.max}` : '—'; }

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
      const present = ALL_ARMS.filter((a) => (c.arms || {})[a]);
      const lastArm = present.length ? present[present.length - 1] : null;
      const arms = {};
      for (const a of ALL_ARMS) arms[a] = agg((c.arms || {})[a]);
      // Back-compat: only legacy 2-arm compare.json (no arms map for the row's
      // present arms) carries its baseline/augmented under before/after aliases.
      if (present.length === 0) {
        arms.baseline = arms.baseline || agg(c.before);
        const target = lastArm || 'augmented';
        arms[target] = arms[target] || agg(c.after);
      }
      rows.push({ iteration: it, persona: c.persona || 'naive', model: c.model || 'unknown', timestamp: c.timestamp, arms, before: arms.baseline, after: arms[lastArm || 'augmented'], delta: c.delta });
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
  const labels = { baseline: 'Base', 'mcp-only': 'Agent (MCP)', 'mcp-validated': 'Agent (MCP+Val)', augmented: 'Augmented' };
  const allArms = [...new Set(sc.generations.flatMap((r) => Object.keys(r.arms)))];
  const last = allArms[allArms.length - 1];
  const header = ['Iteration', 'Persona', 'Model', ...allArms.map((a) => labels[a] || a), 'Δ base→last', 'Base esc', 'Last esc'];
  const lines = [
    '# Baklava Agent-Tooling — Rolling Scorecard',
    `> Generated ${sc.updatedAt} · aggregates all committed benchmark iterations.`,
    '',
    '| ' + header.join(' | ') + ' |',
    '| ' + header.map(() => '---').join(' | ') + ' |',
  ];
  for (const r of sc.generations) {
    const afterArm = r.after || (last && r.arms[last] ? r.arms[last] : null);
    const d = (r.delta && r.delta.avgOverall != null) ? r.delta.avgOverall : null;
    const cells = [r.iteration, r.persona, r.model];
    for (const a of allArms) cells.push(r.arms[a]?.overall ?? '—');
    cells.push((d > 0 ? '+' : '') + (d ?? '—'));
    cells.push(r.arms.baseline?.esc ?? '—');
    cells.push(afterArm?.esc ?? '—');
    lines.push('| ' + cells.join(' | ') + ' |');
  }
  lines.push('', '_Machine-readable: `scorecard.json`._');
  return lines.join('\n');
}

function renderMarkdown(c) {
  const rows = (label, agg) => {
    if (!agg) return '  (no data)';
    const d = agg.dimensions || {};
    return [
      `  | Success rate | ${agg.successRate}% |`,
      `  | Overall | ${agg.avgOverall} |`,
      (agg.overallCI ? `  | Overall (95% CI) | ${agg.overallCI[0]}–${agg.overallCI[1]} |` : '  | Overall (95% CI) | — |'),
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
  const armBlocks = (suffix, fn) => ARMS.flatMap((a) => [`### ${ARM_LABELS[a] || a} ${suffix}`, ``, fn(a)]);
  const judgeSection = (c.judge && Object.values(c.judge).some(Boolean))
    ? [
        `## LLM Judge (separate fresh-context agent — optional holistic layer)`,
        ``,
        `> Non-deterministic model judgment, kept separate from the deterministic rubric above.`,
        ``,
        ...armBlocks('judge', (a) => jrows(c.judge?.[a])),
      ]
    : [];
  const rrow = (r) => r ? [
    `  | Clean load rate | ${r.cleanLoadRate}% (${r.nLoaded}/${r.nTotal}) |`,
    `  | Runtime exceptions | ${r.totalExceptions} |`,
    `  | Console errors | ${r.totalConsoleErrors} |`,
    `  | Unupgraded custom elements | ${r.totalUnupgradedCustomElements} |`,
    `  | Unlabeled interactive controls | ${r.totalUnlabeledInteractives} |`,
    `  | Unlabeled images | ${r.totalUnlabeledImages} |`,
  ].join('\n') : '  (no render data)';
  const renderSection = (c.render && Object.values(c.render).some(Boolean))
    ? [
        `## Headless Render (real browser — Step 1 layer)`,
        ``,
        `> Browser-observed: did the code load/run without errors and upgrade its custom elements,`,
        `> plus basic accessibility probes. Kept separate from the static rubric.`,
        ``,
        ...armBlocks('render', (a) => rrow(c.render?.[a])),
      ]
    : [];
  const armMain = ARMS.flatMap((a) => {
    const fallback = a === 'baseline' ? c.before : a === 'augmented' ? c.after : null;
    return [`## ${ARM_LABELS[a] || a}`, ``, rows(a, c.arms?.[a] || fallback)];
  });
  return [
    `# Baklava Agent-Friendly Tooling — Before / After Benchmark`,
    ``,
    `Iteration: \`${c.iteration}\` · ${c.timestamp} · System: ${c.system}`,
    ``,
    `> Multi-condition benchmark of whether giving the agent Baklava tooling improves`,
    `> component correctness. Arms: ${ARMS.map((a) => `**${ARM_LABELS[a] || a}**`).join(' · ')}.`,
    ``,
    ...armMain,
    ``,
    `## Step-wise deltas`,
    ``,
    `| Step | Δ overall | Δ succ | Δ esc | Δ halluc |`,
    `|---|---|---|---|---|`,
    ...((c.ladder || []).map((s) => {
      const d = s.delta || {};
      const f = (k) => (d[k] != null ? (d[k] > 0 ? '+' : '') + d[k] : '—');
      return `| ${ARM_LABELS[s.from]} → ${ARM_LABELS[s.to]} | ${f('avgOverall')} | ${f('successRate')} | ${f('totalEscapeHatches')} | ${f('totalHallucinations')} |`;
    })),
    ``,
    ...judgeSection,
    ...renderSection,
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
      const code = arm === 'augmented' ? mockAugmented(p)
        : arm === 'mcp-only' ? mockAiAgent(p)
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

function mockAiAgent(p) {
  // Simulate an agent that only consults MCP summaries: mostly correct, but
  // occasionally drifts on detail it didn't verify (imperfectly copied props).
  return p.expectedComponents
    .map((tag, i) => (i % 5 === 3
      ? `<${tag} class="demo" guessed-prop="x">${tag}</${tag}>`
      : `<${tag} class="demo">${tag}</${tag}>`))
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
  else if (a.cmd === 'render') await doRender(a);
  else if (a.cmd === 'compare') doCompare(a);
  else if (a.cmd === 'scorecard') doScorecard(a);
  else if (a.cmd === 'sensitivity') doSensitivity(a);
  else if (a.cmd === 'generate' && a.mock) doMockGenerate();
  else {
    console.error(
      `usage: node bench/src/cli.mjs <evaluate|render|compare|scorecard|sensitivity|generate --mock> [--iteration id] [--arm ...] [--persona ${PERSONAS.join('|')}] [--model name] [--markdown]`,
    );
    process.exit(1);
  }
})();

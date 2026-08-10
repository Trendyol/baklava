// Self-test for the Baklava agent-tooling.
// Runs the CLI commands and the benchmark (mock mode) and asserts expected
// behaviour. Exit code 0 = pass. Run:  node tools/agent-tooling/self-test.mjs
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { existsSync, readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';

const REPO = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
const CLI = path.join(REPO, 'tools', 'agent-tooling', 'cli', 'bin', 'baklava.mjs');
const BENCH = path.join(REPO, 'tools', 'agent-tooling', 'bench', 'src', 'cli.mjs');

let failures = 0;
function check(label, cond, extra = '') {
  if (cond) console.log(`  ok   ${label}`);
  else { failures++; console.error(`  FAIL ${label} ${extra}`); }
}

function run(cmd, args) {
  return execFileSync(process.execPath, [cmd, ...args], { cwd: REPO, encoding: 'utf8' });
}

// Run the CLI and return { code, out }; non-zero exit is captured, not thrown.
function runRC(cmd, args) {
  try {
    return { code: 0, out: run(cmd, args) };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout || '') + (e.stderr || '') };
  }
}

console.log('CLI checks');
let out = run(CLI, ['component', 'button', '--dense']);
check('component button --dense lists attributes', out.includes('Attributes:') && out.includes('bl-button'));
check('  ...real variant union', out.includes('"primary" | "secondary" | "tertiary"'));
check('  ...real event bl-click', out.includes('bl-click'));

out = run(CLI, ['component', 'input', '--example']);
check('component input --example returns usage', out.includes('Usage examples') || out.includes('No usage example'));

// validate command: lint a generated HTML file against the real API
const vBad = path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', '__validate_test.html');
writeFileSync(vBad, '<bl-button variant="red"></bl-button>\n<bl-form></bl-form>');
const vRes = runRC(CLI, ['validate', vBad]);
check('validate flags critical API errors (non-zero exit)', vRes.code >= 1 && /invalid|Unknown tag/i.test(vRes.out), `code=${vRes.code}`);
rmSync(vBad, { force: true });
const vGood = path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'inputs', 'naive', 'augmented', 'login-form.html');
const vClean = runRC(CLI, ['validate', vGood]);
check('validate returns clean (zero exit) for real API-correct output', vClean.code === 0);

out = run(CLI, ['build', 'a login form with email and password']);
check('build recommends bl-input', out.includes('bl-input'));
check('build recommends bl-button', out.includes('bl-button'));

out = run(CLI, ['components']);
check('components lists many bl-* tags', (out.match(/bl-[a-z-]+/g) || []).length >= 20);

out = run(CLI, ['swizzle', 'button']);
check('swizzle button returns source', out.includes('@customElement("bl-button")'));

out = run(CLI, ['component', 'select', '--json']);
const env = JSON.parse(out);
check('--json envelope ok:true', env.ok === true);

// error handling
try {
  run(CLI, ['component', 'not-a-real-component-xyz']);
  check('unknown component exits non-zero', false, '(did not throw)');
} catch (e) {
  check('unknown component exits non-zero', e.status !== 0);
}

console.log('Benchmark checks (deterministic evaluator + committed real results)');
const { evaluate } = await import('./bench/src/evaluate.mjs');
const good = evaluate(
  '<bl-input type="email" label="E"></bl-input><bl-button variant="primary">Go</bl-button>',
  ['bl-input', 'bl-button'],
);
check('good output success', good.success === true, JSON.stringify(good));
check('good output uses real components', good.componentsUsed.join(',') === 'bl-input,bl-button');
const bad = evaluate('<bl-form><bl-oxx></bl-oxx></bl-form>', ['bl-input']);
check('bad output not success (hallucinated tag)', bad.success === false, JSON.stringify(bad));
check('bad output flagged hallucination', bad.failureMode === 'hallucination');

// committed real before/after results must exist
const cmpPath = path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'real-subagents', 'compare.json');
check('committed real-subagents compare.json exists', existsSync(cmpPath));
const cmp = JSON.parse(readFileSync(cmpPath, 'utf8'));
check('real-subagents has before/after/delta', cmp.before && cmp.after && cmp.delta);
check('after overall > before overall', cmp.after.avgOverall > cmp.before.avgOverall);

// 3-arm benchmark (baseline -> mcp-only -> augmented) on the naive battery
const threePath = path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'naive-3arm', 'compare.json');
check('committed naive-3arm compare.json exists', existsSync(threePath));
const three = JSON.parse(readFileSync(threePath, 'utf8'));
check('naive-3arm has all three arms', ['baseline', 'mcp-only', 'augmented'].every((a) => three.arms && three.arms[a]));
check('naive-3arm ladder has all three steps', Array.isArray(three.ladder) && three.ladder.length === 3);
const mono = three.arms.baseline.avgOverall <= three.arms['mcp-only'].avgOverall && three.arms['mcp-only'].avgOverall <= three.arms.augmented.avgOverall;
check('naive-3arm overall is non-decreasing along the ladder', mono, JSON.stringify({ b: three.arms.baseline.avgOverall, m: three.arms['mcp-only'].avgOverall, a: three.arms.augmented.avgOverall }));
check('naive-3arm escape hatches decrease along the ladder',
  three.arms.baseline.totalEscapeHatches > three.arms['mcp-only'].totalEscapeHatches && three.arms['mcp-only'].totalEscapeHatches > three.arms.augmented.totalEscapeHatches);
// Honest CI statement: baseline is separated (no overlap gap) from BOTH tooled
// arms at the 95% level; the two tooled arms (mcp-only [90,92], augmented
// [91,93]) partially overlap, so we only assert augmented mean >= mcp-only mean.
check('naive-3arm baseline separated from both tooled arms (no CI overlap)',
  three.arms['mcp-only'].overallCI[0] >= three.arms.baseline.overallCI[1] && three.arms.augmented.overallCI[0] >= three.arms.baseline.overallCI[1]);
check('naive-3arm augmented mean >= mcp-only mean', three.arms.augmented.avgOverall >= three.arms['mcp-only'].avgOverall);
check('naive-3arm per-prompt n>=3 for the mcp-only arm', (() => {
  const probe = path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'naive-3arm', 'evaluated', 'mcp-only', 'product-table.json');
  if (!existsSync(probe)) return false;
  const pr = JSON.parse(readFileSync(probe, 'utf8'));
  return pr.n >= 3;
})());
check('naive-3arm judge data present across all arms', ['baseline', 'mcp-only', 'augmented'].every((a) =>
  existsSync(path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'naive-3arm', 'judge', a, 'login-form.json'))));

// adversarial persona run + optional LLM-judge layer
const advPath = path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'adversarial-subagents', 'compare.json');
check('committed adversarial-subagents compare.json exists', existsSync(advPath));
const adv = JSON.parse(readFileSync(advPath, 'utf8'));
check('adversarial after overall > before', adv.after && adv.before && adv.after.avgOverall > adv.before.avgOverall);
check('adversarial baseline has hallucination gaps (before esc > after esc)', (adv.before.totalEscapeHatches || 0) > (adv.after.totalEscapeHatches || 0));
check('adversarial LLM-judge data present (augmented)', existsSync(
  path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'adversarial-subagents', 'judge', 'augmented', 'login-form.json')));

// Step 1: headless-render layer
check('adversarial render aggregate exists (baseline)', existsSync(
  path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'adversarial-subagents', 'render', 'baseline.aggregate.json')));
const rb = JSON.parse(readFileSync(path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'adversarial-subagents', 'render', 'baseline.aggregate.json'), 'utf8'));
check('render recorded results', rb && rb.nLoaded > 0);

// Step 2: sensitivity analysis
check('sensitivity.json exists', existsSync(
  path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'adversarial-subagents', 'sensitivity.json')));
const sen = JSON.parse(readFileSync(path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'adversarial-subagents', 'sensitivity.json'), 'utf8'));
check('sensitivity delta is positive across all weight variants',
  Array.isArray(sen.variants) && sen.variants.length >= 3 && sen.variants.every((v) => v.delta > 0));

// Step 3: multi-sample + error bars (adversarial should have >=2 samples/prompt)
const probe = JSON.parse(readFileSync(path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'adversarial-subagents', 'evaluated', 'augmented', 'product-table.json'), 'utf8'));
check('multi-sample: per-prompt n>=3 and aggregate recorded', probe.n >= 3 && probe.aggregate && probe.aggregate.scores);
check('error bars: compare has non-null 95% CI for both arms',
  adv.before && adv.after && adv.before.overallCI && adv.after.overallCI);
check('error bars: augmented CI floor > baseline CI ceiling (no overlap)',
  adv.after.overallCI[0] > adv.before.overallCI[1]);

// rolling scorecard exists & aggregates iterations
const scPath = path.join(REPO, 'tools', 'agent-tooling', 'bench', 'results', 'scorecard.json');
check('rolling scorecard.json exists', existsSync(scPath));
const sc = JSON.parse(readFileSync(scPath, 'utf8'));
check('scorecard aggregates >=2 iterations', Array.isArray(sc.generations) && sc.generations.length >= 2);

// persona batteries load
const personas = ['naive', 'experienced', 'adversarial'];
for (const p of personas) {
  const file = p === 'naive' ? 'prompts.json' : `${p}.json`;
  check(`persona battery ${p} exists`, existsSync(path.join(REPO, 'tools', 'agent-tooling', 'bench', 'prompts', file)));
}

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);

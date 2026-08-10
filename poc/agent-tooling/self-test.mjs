// Self-test for the Baklava agent-tooling PoC.
// Runs the CLI commands and the benchmark (mock mode) and asserts expected
// behaviour. Exit code 0 = pass. Run:  node poc/agent-tooling/self-test.mjs
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { existsSync, readFileSync, rmSync, mkdirSync } from 'node:fs';

const REPO = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
const CLI = path.join(REPO, 'poc', 'agent-tooling', 'cli', 'bin', 'baklava.mjs');
const BENCH = path.join(REPO, 'poc', 'agent-tooling', 'bench', 'src', 'cli.mjs');

let failures = 0;
function check(label, cond, extra = '') {
  if (cond) console.log(`  ok   ${label}`);
  else { failures++; console.error(`  FAIL ${label} ${extra}`); }
}

function run(cmd, args) {
  return execFileSync(process.execPath, [cmd, ...args], { cwd: REPO, encoding: 'utf8' });
}

console.log('CLI checks');
let out = run(CLI, ['component', 'button', '--dense']);
check('component button --dense lists attributes', out.includes('Attributes:') && out.includes('bl-button'));
check('  ...real variant union', out.includes('"primary" | "secondary" | "tertiary"'));
check('  ...real event bl-click', out.includes('bl-click'));

out = run(CLI, ['component', 'input', '--example']);
check('component input --example returns usage', out.includes('Usage examples') || out.includes('No usage example'));

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
const cmpPath = path.join(REPO, 'poc', 'agent-tooling', 'bench', 'results', 'real-subagents', 'compare.json');
check('committed real-subagents compare.json exists', existsSync(cmpPath));
const cmp = JSON.parse(readFileSync(cmpPath, 'utf8'));
check('real-subagents has before/after/delta', cmp.before && cmp.after && cmp.delta);
check('after overall > before overall', cmp.after.avgOverall > cmp.before.avgOverall);

// adversarial persona run + optional LLM-judge layer
const advPath = path.join(REPO, 'poc', 'agent-tooling', 'bench', 'results', 'adversarial-subagents', 'compare.json');
check('committed adversarial-subagents compare.json exists', existsSync(advPath));
const adv = JSON.parse(readFileSync(advPath, 'utf8'));
check('adversarial after overall > before', adv.after && adv.before && adv.after.avgOverall > adv.before.avgOverall);
check('adversarial baseline has hallucination gaps (before esc > after esc)', (adv.before.totalEscapeHatches || 0) > (adv.after.totalEscapeHatches || 0));
check('adversarial LLM-judge data present (augmented)', existsSync(
  path.join(REPO, 'poc', 'agent-tooling', 'bench', 'results', 'adversarial-subagents', 'judge', 'augmented', 'login-form.json')));

// rolling scorecard exists & aggregates iterations
const scPath = path.join(REPO, 'poc', 'agent-tooling', 'bench', 'results', 'scorecard.json');
check('rolling scorecard.json exists', existsSync(scPath));
const sc = JSON.parse(readFileSync(scPath, 'utf8'));
check('scorecard aggregates >=2 iterations', Array.isArray(sc.generations) && sc.generations.length >= 2);

// persona batteries load
const personas = ['naive', 'experienced', 'adversarial'];
for (const p of personas) {
  const file = p === 'naive' ? 'prompts.json' : `${p}.json`;
  check(`persona battery ${p} exists`, existsSync(path.join(REPO, 'poc', 'agent-tooling', 'bench', 'prompts', file)));
}

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);

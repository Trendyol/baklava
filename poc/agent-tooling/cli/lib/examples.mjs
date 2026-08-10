// Resolves usage examples for a component from its Storybook .stories.mdx file.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const REPO_ROOT = path.resolve(
  fileURLToPath(new URL('../../../../', import.meta.url)),
);
const COMPONENTS_BASE = path.join(REPO_ROOT, 'src', 'components');

function deepFindStory(base, dirName) {
  const flat = path.join(base, dirName, `bl-${dirName}.stories.mdx`);
  if (existsSync(flat)) return flat;
  if (!existsSync(base)) return null;
  let found = null;
  for (const group of readdirSync(base)) {
    const groupPath = path.join(base, group);
    if (!existsSync(groupPath)) continue;
    // nested: <group>/<dirName>/bl-<dirName>.stories.mdx
    const nested = path.join(groupPath, dirName, `bl-${dirName}.stories.mdx`);
    if (existsSync(nested)) { found = nested; break; }
  }
  return found;
}

/**
 * Extract `<bl-...>...</bl-...>` blocks belonging to a tag from its story.
 */
export function extractExamples(tag) {
  const story = deepFindStory(COMPONENTS_BASE, tag.replace(/^bl-/, ''));
  if (!story) return { source: null, examples: [] };
  const content = readFileSync(story, 'utf8');
  const examples = [];
  const re = /<bl-[a-z-]+[\s\S]*?<\/bl-[a-z-]+>|<bl-[a-z-]+\s*\/>/g;
  let m;
  const seen = new Set();
  while ((m = re.exec(content))) {
    const block = m[0].trim();
    if (!block.includes(tag)) continue;
    if (block.includes('${')) continue; // skip storyboard arg-template placeholders
    if (seen.has(block)) continue;
    seen.add(block);
    examples.push(block);
    if (examples.length >= 3) break;
  }
  return { source: story, examples };
}

export function renderExamples(tag, { source, examples }) {
  if (!examples.length) {
    return `No usage example found for ${tag}${source ? ` (checked ${source})` : ''}. Use "baklava component ${tag} --dense" for the API.`;
  }
  const head = `Usage examples for ${tag} (from ${source}):`;
  return [head, '```html', ...examples, '```'].join('\n');
}

// Dense, token-efficient rendering of component API for agents (Astryx --dense style).
// Keeps output minimal so it fits in an agent's context and is quick to scan.

export function prettyType(t, attr) {
  // Boolean attributes on a custom element are presence attributes; show as boolean.
  return t || 'any';
}

export function renderComponentDense(detail) {
  const lines = [];
  lines.push(`${detail.tag}`);
  if (detail.summary) lines.push(`  // ${detail.summary}`);
  lines.push(`  Attributes:`);
  for (const a of detail.attributes) {
    const def = a.default != null ? ` = ${a.default}` : '';
    lines.push(`    ${a.attribute} (${prettyType(a.type)})${def}${a.reflects ? ' #reflects' : ''}`);
  }
  if (detail.properties.length) {
    lines.push(`  JS Properties:`);
    for (const p of detail.properties) {
      const def = p.default != null ? ` = ${p.default}` : '';
      lines.push(`    .${p.name} (${prettyType(p.type)})${def}`);
    }
  }
  if (detail.events.length) {
    lines.push(`  Events:`);
    for (const e of detail.events) {
      lines.push(`    ${e.name} (${e.type})${e.description ? ' — ' + e.description : ''}`);
    }
  }
  if (detail.slots.length) {
    lines.push(`  Slots:`);
    for (const s of detail.slots) {
      lines.push(`    ${s.name}${s.description ? ' — ' + s.description : ''}`);
    }
  }
  if (detail.cssProperties.length) {
    lines.push(`  CSS vars:`);
    for (const c of detail.cssProperties) {
      lines.push(
        `    ${c.name}${c.default != null ? ' = ' + c.default : ''}${c.description ? ' — ' + c.description : ''}`,
      );
    }
  }
  return lines.join('\n');
}

export function renderComponentBrief(detail) {
  const attrs = detail.attributes.map((a) => a.attribute).join(', ');
  return `${detail.tag}\t${detail.summary ? detail.summary + ' | ' : ''}attrs: ${attrs || '—'}`;
}

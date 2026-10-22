// Accessible inline-SVG bar charts for blog posts. Labels sit above each bar so text stays readable on phones.
// rows: [{ label, values: [{ v, text, color }] }], max = value mapped to full width.
const F = 'system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif';
const escx = (s) => String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/</g, '&lt;');
export function hbars({ id, title, desc, rows, max, legend }) {
  const W = 400, barH = 18, gap = 5, labelH = 20, rowGap = 14, valW = 64;
  const barMax = W - valW;
  let y = legend ? 26 : 4;
  const parts = [];
  if (legend) {
    let x = 0;
    for (const l of legend) { parts.push(`<rect x="${x}" y="4" width="13" height="13" rx="3" fill="${l[1]}"/><text x="${x + 19}" y="15" font-size="13" fill="#344054" font-family="${F}">${escx(l[0])}</text>`); x += 30 + l[0].length * 7.5; }
  }
  for (const r of rows) {
    parts.push(`<text x="0" y="${y + 14}" font-size="15" font-weight="600" fill="#101828" font-family="${F}">${escx(r.label)}</text>`);
    y += labelH;
    for (const v of r.values) {
      const w = Math.max(3, (v.v / max) * barMax);
      parts.push(`<rect x="0" y="${y}" width="${w.toFixed(1)}" height="${barH}" rx="4" fill="${v.color}"/><text x="${(w + 7).toFixed(1)}" y="${y + 14}" font-size="14.5" font-weight="800" fill="#101828" font-family="${F}">${escx(v.text)}</text>`);
      y += barH + gap;
    }
    y += rowGap;
  }
  return `<svg viewBox="0 0 ${W} ${y - rowGap + 4}" style="max-width:520px" role="img" aria-labelledby="${id}-t ${id}-d"><title id="${id}-t">${escx(title)}</title><desc id="${id}-d">${escx(desc)}</desc>${parts.join('')}</svg>`;
}

// Hand-drawn SVG charts. No chart library: every chart below is built from
// the data with plain string math, so the first load stays small.
const NS = 'http://www.w3.org/2000/svg';
const PALETTE = ['#0f5e63', '#d98e1f', '#3a7ca5', '#7a9e4b', '#a44a3f', '#6b5b95', '#c65d7b'];

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceTicks(min, max, count) {
  const step = (max - min) / Math.max(count - 1, 1) || 1;
  const ticks = [];
  for (let i = 0; i < count; i++) ticks.push(min + step * i);
  return ticks;
}

// Line chart with dots, gridlines and year labels. `series` is [{year, value}].
export function lineChart(series, opts = {}) {
  const width = opts.width || 640;
  const height = opts.height || 280;
  const padL = 52, padR = 16, padT = 18, padB = 34;
  const values = series.map((d) => d.value);
  let min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  min -= span * 0.12; max += span * 0.12;
  const innerW = width - padL - padR, innerH = height - padT - padB;
  const x = (i) => padL + (i / (series.length - 1)) * innerW;
  const y = (v) => padT + (1 - (v - min) / (max - min)) * innerH;
  const ticks = niceTicks(Math.min(...values), Math.max(...values), 4);
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.label || 'Line chart')}">`;
  for (const t of ticks) {
    const ty = y(t);
    svg += `<line x1="${padL}" y1="${ty.toFixed(1)}" x2="${width - padR}" y2="${ty.toFixed(1)}" stroke="#e3e8e6" stroke-width="1"/>`;
    svg += `<text x="${padL - 8}" y="${(ty + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5a6b68">${esc(opts.formatTick ? opts.formatTick(t) : t.toFixed(1))}</text>`;
  }
  const points = series.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  svg += `<polyline points="${points}" fill="none" stroke="${opts.color || '#0f5e63'}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  series.forEach((d, i) => {
    svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="3.5" fill="${opts.color || '#0f5e63'}" stroke="#fff" stroke-width="1.5"><title>${d.year}: ${esc(opts.formatValue ? opts.formatValue(d.value) : d.value)}</title></circle>`;
  });
  series.forEach((d, i) => {
    if (i % 2 === 0 || i === series.length - 1) {
      svg += `<text x="${x(i).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#5a6b68">${d.year}</text>`;
    }
  });
  svg += `<text x="${x(series.length - 1).toFixed(1)}" y="${(y(series[series.length - 1].value) - 10).toFixed(1)}" text-anchor="end" font-size="12" font-weight="700" fill="${opts.color || '#0f5e63'}">${esc(opts.formatValue ? opts.formatValue(series[series.length - 1].value) : series[series.length - 1].value)}</text>`;
  svg += '</svg>';
  return svg;
}

// Bar chart. `series` is [{label, value}].
export function barChart(series, opts = {}) {
  const width = opts.width || 640;
  const height = opts.height || 280;
  const padL = 52, padR = 16, padT = 18, padB = 34;
  const values = series.map((d) => d.value);
  const lo = Math.min(0, ...values), hi = Math.max(0, ...values);
  const range = (hi - lo) * 1.08 || 1;
  const max = hi + (range - (hi - lo)) / 2, min = lo - (range - (hi - lo)) / 2;
  const innerW = width - padL - padR, innerH = height - padT - padB;
  const slot = innerW / series.length;
  const barW = Math.min(42, slot * 0.62);
  const yPos = (v) => padT + (1 - (v - min) / (max - min)) * innerH;
  const zeroY = yPos(0);
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.label || 'Bar chart')}">`;
  for (let f = 0; f <= 4; f++) {
    const v = min + ((max - min) / 4) * f;
    const ty = yPos(v);
    svg += `<line x1="${padL}" y1="${ty.toFixed(1)}" x2="${width - padR}" y2="${ty.toFixed(1)}" stroke="#e3e8e6" stroke-width="1"/>`;
    svg += `<text x="${padL - 8}" y="${(ty + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5a6b68">${esc(opts.formatTick ? opts.formatTick(v) : v.toFixed(0))}</text>`;
  }
  svg += `<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${width - padR}" y2="${zeroY.toFixed(1)}" stroke="#9aa8a4" stroke-width="1"/>`;
  series.forEach((d, i) => {
    const vy = yPos(d.value);
    const h = Math.abs(zeroY - vy);
    const bx = padL + i * slot + (slot - barW) / 2;
    const by = Math.min(zeroY, vy);
    const color = d.negative ? '#a44a3f' : (opts.color || PALETTE[i % PALETTE.length]);
    svg += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${color}"><title>${esc(d.label)}: ${esc(opts.formatValue ? opts.formatValue(d.value) : d.value)}</title></rect>`;
    svg += `<text x="${(bx + barW / 2).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#5a6b68">${esc(d.label)}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// Donut chart with a centre label. `slices` is [{label, value}].
export function donutChart(slices, opts = {}) {
  const size = opts.size || 260;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, inner = r * 0.62;
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  let angle = -Math.PI / 2;
  let svg = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.label || 'Share chart')}">`;
  slices.forEach((s, i) => {
    const frac = s.value / total;
    const a0 = angle, a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    const color = opts.colors ? opts.colors[i % opts.colors.length] : PALETTE[i % PALETTE.length];
    svg += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${color}"><title>${esc(s.label)}: ${s.value}%</title></path>`;
  });
  svg += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="#14332f">${esc(opts.centre || '')}</text>`;
  svg += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#5a6b68">${esc(opts.centreSub || '')}</text>`;
  svg += '</svg>';
  return svg;
}

// Horizontal share bars with labels, for age structure etc.
export function shareBars(rows, opts = {}) {
  let html = '<div class="share-bars">';
  for (const row of rows) {
    html += `<div class="share-row"><div class="share-label">${esc(row.label)}</div>`
      + `<div class="share-track"><div class="share-fill" style="width:${row.value}%;background:${opts.color || '#0f5e63'}"></div></div>`
      + `<div class="share-value">${row.value.toFixed(1)}%</div></div>`;
  }
  html += '</div>';
  return html;
}

export { PALETTE };

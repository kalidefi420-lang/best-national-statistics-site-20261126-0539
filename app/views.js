// Page views: each route renders its own section from the data files.
// All figures are rendered from app/data, with source and year next to them.
import { HEADLINE, POPULATION_SERIES, AGE_STRUCTURE, GDP_SERIES, GDP_GROWTH, SECTOR_SHARES, TRADE, UNEMPLOYMENT_SERIES, EMPLOYMENT_SECTORS, HEALTH_EDUCATION, DEMOGRAPHY } from './data/indicators.js';
import { REGIONS, REGION_INDICATORS, formatNumber } from './data/regions.js';
import { lineChart, barChart, donutChart, shareBars } from './charts.js';

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function card(ind) {
  return `<article class="stat-card"><h3>${ind.label}</h3>`
    + `<p class="big">${ind.value}</p><p class="detail">${ind.detail}</p>`
    + `<p class="change">${ind.change}</p><p class="source">${ind.source}</p></article>`;
}

export function homeView() {
  const cards = HEADLINE.map(card).join('');
  const gdpChart = lineChart(GDP_SERIES, {
    label: 'GDP in billion euro, 2014 to 2024',
    formatValue: (v) => '€' + v.toFixed(1) + 'bn',
    formatTick: (v) => '€' + v.toFixed(0) + 'bn',
    color: '#0f5e63',
  });
  return `<section class="hero"><h1>Portugal in figures</h1>`
    + `<p class="lede">The numbers that describe a country of 10.6 million people on Europe's Atlantic edge — population, economy, work, health and learning, kept up to date from official sources.</p>`
    + `<p class="updated">Last updated 26 November 2026 · Figures as published by INE, Eurostat, the World Bank and the OECD</p></section>`
    + `<section aria-label="Headline indicators"><div class="card-grid">${cards}</div></section>`
    + `<section class="panel"><h2>Gross domestic product, 2014–2024</h2>`
    + `<p>Portugal's economy grew from €173 billion in 2014 to €282 billion in 2024, with a sharp pandemic fall in 2020 and the fastest growth in decades in 2022.</p>`
    + gdpChart + sourceLine('INE, National Accounts 2024 (current prices).') + `</section>`
    + `<section class="panel"><h2>Explore the data</h2><div class="link-cards">`
    + `<a href="#/population"><strong>Population</strong><span>10.64 million people, age structure and the seven regions</span></a>`
    + `<a href="#/economy"><strong>Economy</strong><span>GDP, sectors, trade and a year-by-year explorer</span></a>`
    + `<a href="#/health-education"><strong>Health &amp; education</strong><span>Life expectancy, hospitals, schools and skills</span></a>`
    + `<a href="#/labour"><strong>Labour</strong><span>Unemployment, jobs by sector and pay</span></a>`
    + `<a href="#/explorer"><strong>Data explorer</strong><span>Search and sort every indicator, compare regions</span></a>`
    + `</div></section>`;
}

export function populationView() {
  const popChart = lineChart(POPULATION_SERIES, {
    label: 'Resident population in millions, 2014 to 2024',
    formatValue: (v) => v.toFixed(2) + 'm',
    formatTick: (v) => v.toFixed(1) + 'm',
    color: '#0f5e63',
  });
  const ageBars = shareBars(AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.share })), { color: '#3a7ca5' });
  const demoRows = DEMOGRAPHY.map((d) => `<tr><td>${d.indicator}</td><td><strong>${d.value}</strong></td><td>${d.year}</td><td>${d.source}</td></tr>`).join('');
  const regionRows = REGIONS.map((r) => `<tr><td><strong>${r.name}</strong></td><td>${r.population.toLocaleString('en-GB')}</td><td>${r.density.toFixed(1)}</td><td>${r.capital}</td></tr>`).join('');
  return `<section class="panel"><h1>Population</h1>`
    + `<p class="lede">Portugal's population fell for most of the 2010s, then rose again from 2021 as immigration outweighed a low birth rate. On 1 January 2024 it stood at 10.64 million.</p></section>`
    + `<section class="panel"><h2>Population trend, 2014–2024</h2>${popChart}${sourceLine('INE, Population estimates 2024 (resident population, 31 December).')}</section>`
    + `<section class="panel"><h2>Age structure, 2024</h2><p>Almost one in four residents is 65 or older, and the median age is 47.2 years — one of the oldest populations in the European Union.</p>${ageBars}${sourceLine('INE, Population estimates 2024.')}</section>`
    + `<section class="panel"><h2>People in numbers</h2><table class="data-table"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>${demoRows}</tbody></table></section>`
    + `<section class="panel"><h2>Population by region, 2024</h2><table class="data-table"><thead><tr><th>Region</th><th>Population</th><th>Density (per km²)</th><th>Regional capital</th></tr></thead><tbody>${regionRows}</tbody></table>${sourceLine('INE, Population estimates 2024.')}</section>`;
}

export function economyView() {
  const growthBars = barChart(GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value, negative: d.value < 0 })), {
    label: 'Real GDP growth in percent, 2014 to 2024',
    formatValue: (v) => v.toFixed(1) + '%',
    formatTick: (v) => v.toFixed(0) + '%',
    color: '#0f5e63',
  });
  const donut = donutChart(SECTOR_SHARES.map((s) => ({ label: s.sector, value: s.share })), {
    label: 'Gross value added by sector, 2023', centre: '75.2%', centreSub: 'services share',
  });
  const sectorList = SECTOR_SHARES.map((s) => `<li><span>${s.sector}</span><strong>${s.share.toFixed(1)}%</strong></li>`).join('');
  const exportRows = TRADE.topExports.map((e) => `<tr><td>${e.product}</td><td>${e.share.toFixed(1)}%</td></tr>`).join('');
  const partnerRows = TRADE.topPartners.map((p) => `<tr><td>${p.country}</td><td>${p.share.toFixed(1)}%</td></tr>`).join('');
  return `<section class="panel"><h1>Economy</h1>`
    + `<p class="lede">A €282 billion economy in 2024, driven by services — tourism, trade and business services — with exports of goods worth €78.9 billion.</p></section>`
    + `<section class="panel"><h2>Real GDP growth, 2014–2024</h2><p>Use the year buttons to highlight a year.</p>`
    + `<div class="controls" role="group" aria-label="Highlight year"><span>Highlight year:</span><span id="yearButtons"></span></div>`
    + `<div id="growthChart">${growthBars}</div>`
    + `<p id="yearNote" class="note">2024: real growth of 1.9% — the economy grew more slowly than in 2023, as exports cooled.</p>`
    + sourceLine('INE, National Accounts 2024.') + `</section>`
    + `<section class="panel two-col"><div><h2>What the economy makes, 2023</h2>${donut}${sourceLine('INE, National Accounts 2023 (gross value added).')}</div>`
    + `<div><h2>Sector shares</h2><ul class="key-list">${sectorList}</ul>`
    + `<p>Services dominate: tourism alone brought in €27.7 billion in 2024, and the sector employs almost seven in ten workers.</p></div></section>`
    + `<section class="panel"><h2>Trade in goods, 2024</h2><div class="trade-figures">`
    + `<div><span>Exports</span><strong>€${TRADE.exports.toFixed(1)}bn</strong></div>`
    + `<div><span>Imports</span><strong>€${TRADE.imports.toFixed(1)}bn</strong></div>`
    + `<div><span>Balance</span><strong>€${TRADE.balance.toFixed(1)}bn</strong></div></div>`
    + `<div class="two-col"><div><h3>Top exports</h3><table class="data-table"><thead><tr><th>Product group</th><th>Share of exports</th></tr></thead><tbody>${exportRows}</tbody></table></div>`
    + `<div><h3>Top export partners</h3><table class="data-table"><thead><tr><th>Country</th><th>Share of exports</th></tr></thead><tbody>${partnerRows}</tbody></table></div></div>`
    + sourceLine('INE, International Trade Statistics 2024.') + `</section>`;
}

export function healthEducationView() {
  const rows = HEALTH_EDUCATION.map((h) => `<tr><td>${h.indicator}</td><td><strong>${h.value}</strong></td><td>${h.year}</td><td>${h.source}</td></tr>`).join('');
  const lifeChart = lineChart([
    { year: 2014, value: 81.3 }, { year: 2016, value: 81.7 },
    { year: 2018, value: 81.9 }, { year: 2020, value: 81.1 },
    { year: 2022, value: 81.9 }, { year: 2023, value: 82.4 },
  ], {
    label: 'Life expectancy at birth in years',
    formatValue: (v) => v.toFixed(1) + ' yrs',
    formatTick: (v) => v.toFixed(0),
    color: '#7a9e4b',
  });
  return `<section class="panel"><h1>Health &amp; education</h1>`
    + `<p class="lede">Portuguese people live long — 82.4 years at birth — and stay in school longer than ever: 47% of 25- to 34-year-olds now hold a degree.</p></section>`
    + `<section class="panel"><h2>Life expectancy at birth, 2014–2023</h2><p>Life expectancy dipped during the pandemic years and recovered to a record 82.4 years in 2023. Women live 85.2 years, men 79.5.</p>${lifeChart}${sourceLine('INE, Mortality tables 2023.')}</section>`
    + `<section class="panel"><h2>Health and education in numbers</h2><table class="data-table"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>${rows}</tbody></table></section>`;
}

export function labourView() {
  const unempChart = lineChart(UNEMPLOYMENT_SERIES, {
    label: 'Unemployment rate in percent, 2014 to 2024',
    formatValue: (v) => v.toFixed(1) + '%',
    formatTick: (v) => v.toFixed(0) + '%',
    color: '#a44a3f',
  });
  const empBars = shareBars(EMPLOYMENT_SECTORS.map((e) => ({ label: e.sector, value: e.share })), { color: '#d98e1f' });
  return `<section class="panel"><h1>Labour</h1>`
    + `<p class="lede">Unemployment has more than halved since 2014, from 13.9% to 6.4% in 2024, and 4.95 million people are in work.</p></section>`
    + `<section class="panel"><h2>Unemployment rate, 2014–2024</h2>${unempChart}${sourceLine('INE, Labour Force Survey 2024 (annual average).')}</section>`
    + `<section class="panel"><h2>Employment by sector, 2024</h2>${empBars}${sourceLine('INE, Labour Force Survey 2024.')}</section>`
    + `<section class="panel"><h2>Work in numbers</h2><table class="data-table"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>`
    + `<tr><td>Employed population</td><td><strong>4.95 million</strong></td><td>2024</td><td>INE Labour Force Survey</td></tr>`
    + `<tr><td>Employment rate, ages 20–64</td><td><strong>76.8%</strong></td><td>2024</td><td>Eurostat</td></tr>`
    + `<tr><td>Youth unemployment, ages 15–24</td><td><strong>21.9%</strong></td><td>2024</td><td>INE Labour Force Survey</td></tr>`
    + `<tr><td>Average gross monthly wage</td><td><strong>€1,640</strong></td><td>2024</td><td>INE</td></tr>`
    + `<tr><td>Minimum monthly wage</td><td><strong>€870</strong></td><td>2025</td><td>Government of Portugal</td></tr>`
    + `<tr><td>Part-time workers</td><td><strong>7.9% of employment</strong></td><td>2024</td><td>Eurostat</td></tr>`
    + `</tbody></table></section>`;
}

export function explorerView() {
  const allRows = [];
  HEADLINE.forEach((h) => allRows.push({ indicator: h.label, value: h.value, year: h.detail.match(/\d{4}/)?.[0] || '2024', source: h.source }));
  HEALTH_EDUCATION.forEach((h) => allRows.push({ indicator: h.indicator, value: h.value, year: String(h.year), source: h.source }));
  DEMOGRAPHY.forEach((d) => allRows.push({ indicator: d.indicator, value: d.value, year: String(d.year), source: d.source }));
  const rows = allRows.map((r, i) => `<tr data-index="${i}"><td>${r.indicator}</td><td><strong>${r.value}</strong></td><td>${r.year}</td><td>${r.source}</td></tr>`).join('');
  const regionOptions = REGIONS.map((r) => `<option value="${r.code}">${r.name}</option>`).join('');
  const indicatorOptions = Object.entries(REGION_INDICATORS).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
  return `<section class="panel"><h1>Data explorer</h1>`
    + `<p class="lede">Every headline figure on this site in one searchable table — and a region comparison that shows how Portugal's seven regions differ.</p></section>`
    + `<section class="panel"><h2>All indicators</h2>`
    + `<div class="controls"><label for="tableSearch">Search indicators</label>`
    + `<input id="tableSearch" type="search" placeholder="Try “unemployment” or “life”" autocomplete="off">`
    + `<label for="sortSelect">Sort by</label><select id="sortSelect"><option value="name">Indicator name</option><option value="year">Year (newest first)</option></select></div>`
    + `<p id="resultCount" class="note">${allRows.length} indicators</p>`
    + `<table class="data-table" id="explorerTable"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>${rows}</tbody></table></section>`
    + `<section class="panel"><h2>Compare regions</h2>`
    + `<div class="controls"><label for="regionSelect">Region</label><select id="regionSelect">${regionOptions}</select>`
    + `<label for="indicatorSelect">Indicator</label><select id="indicatorSelect">${indicatorOptions}</select></div>`
    + `<div id="regionResult" class="region-result"></div>`
    + `<p class="note">Pick a region and an indicator to see its figure against the national picture.</p></section>`;
}

export function aboutView() {
  return `<section class="panel"><h1>About &amp; methodology</h1>`
    + `<p class="lede">Portugal in Figures is an independent statistics portal. It is not affiliated with Statistics Portugal (INE), Eurostat, the World Bank or any government body.</p>`
    + `<h2>Where the figures come from</h2><ul class="key-list">`
    + `<li><span>Statistics Portugal (INE)</span><strong>Population, national accounts, labour force, trade</strong></li>`
    + `<li><span>Eurostat</span><strong>Inflation (HICP), education, employment rates</strong></li>`
    + `<li><span>World Bank</span><strong>Urban population, education spending</strong></li>`
    + `<li><span>OECD</span><strong>Health spending, physicians</strong></li>`
    + `<li><span>IMF</span><strong>GDP per capita in purchasing-power terms</strong></li>`
    + `</ul><h2>How figures are shown</h2>`
    + `<p>Every figure on this site is shown with its source and reference year. Values are rounded for readability; the underlying series use the published values. Population figures are resident population as estimated by INE. GDP is in current prices unless labelled real growth. Unemployment follows the ILO definition used by INE's Labour Force Survey.</p>`
    + `<h2>Updates</h2><p>Figures were last checked on 26 November 2026. Population and national accounts are updated annually by INE; labour figures are published quarterly. When a source revises a figure, this site is updated with the new release and the reference year changes with it.</p>`
    + `<h2>Reuse</h2><p>Figures may be quoted with attribution to the original source named beside each figure. The site's own text, design and charts are released under the MIT licence (see LICENSE in the repository).</p></section>`;
}

export { REGIONS, REGION_INDICATORS, formatNumber, GDP_GROWTH };

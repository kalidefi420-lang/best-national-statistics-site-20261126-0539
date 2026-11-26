// Router and interactive controls for Portugal in Figures.
// Hash routes: #/ (home), #/population, #/economy, #/health-education,
// #/labour, #/explorer, #/about. All controls are wired here, after each
// view is rendered, so every button, select and search box really works.
import { homeView, populationView, economyView, healthEducationView, labourView, explorerView, aboutView, REGIONS, REGION_INDICATORS, formatNumber, GDP_GROWTH } from './views.js';
import { barChart } from './charts.js';

const ROUTES = {
  '': homeView,
  '/': homeView,
  '/population': populationView,
  '/economy': economyView,
  '/health-education': healthEducationView,
  '/labour': labourView,
  '/explorer': explorerView,
  '/about': aboutView,
};

const TITLES = {
  '': 'Portugal in Figures — National Statistics Portal',
  '/population': 'Population — Portugal in Figures',
  '/economy': 'Economy — Portugal in Figures',
  '/health-education': 'Health & Education — Portugal in Figures',
  '/labour': 'Labour — Portugal in Figures',
  '/explorer': 'Data Explorer — Portugal in Figures',
  '/about': 'About & Methodology — Portugal in Figures',
};

const YEAR_NOTES = {
  2014: '2014: real growth of 0.9% — the economy returned to growth after the bailout years.',
  2015: '2015: real growth of 1.8% — exports and household spending picked up.',
  2016: '2016: real growth of 2.0% — steady expansion, unemployment below 11%.',
  2017: '2017: real growth of 2.8% — tourism and exports drove the fastest growth in years.',
  2018: '2018: real growth of 2.8% — growth held strong, unemployment fell to 7.0%.',
  2019: '2019: real growth of 2.7% — the last pre-pandemic year, GDP of €214.4 billion.',
  2020: '2020: real growth of −8.2% — the pandemic hit tourism and services hard.',
  2021: '2021: real growth of 5.6% — the recovery began as restrictions lifted.',
  2022: '2022: real growth of 7.0% — the fastest growth since 1987, led by tourism.',
  2023: '2023: real growth of 2.6% — growth slowed as interest rates rose.',
  2024: '2024: real growth of 1.9% — the economy grew more slowly than in 2023, as exports cooled.',
};

function route() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return ROUTES[hash] ? hash : '/';
}

function render() {
  const path = route();
  const view = ROUTES[path] || homeView;
  document.getElementById('view').innerHTML = view();
  document.title = TITLES[path] || TITLES[''];
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + path);
  });
  window.scrollTo(0, 0);
  if (path === '/economy') wireEconomy();
  if (path === '/explorer') wireExplorer();
}

function wireEconomy() {
  const holder = document.getElementById('yearButtons');
  const note = document.getElementById('yearNote');
  const chart = document.getElementById('growthChart');
  if (!holder || !note || !chart) return;
  let selected = 2024;
  const draw = () => {
    const data = GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value, negative: d.value < 0 }));
    chart.innerHTML = barChart(data, {
      label: 'Real GDP growth in percent, 2014 to 2024',
      formatValue: (v) => v.toFixed(1) + '%',
      formatTick: (v) => v.toFixed(0) + '%',
      color: '#0f5e63',
    });
    // Recolour the selected year's bar.
    const bars = chart.querySelectorAll('rect');
    GDP_GROWTH.forEach((d, i) => {
      if (d.year === selected && bars[i]) bars[i].setAttribute('fill', '#d98e1f');
    });
    note.textContent = YEAR_NOTES[selected];
  };
  GDP_GROWTH.forEach((d) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(d.year);
    btn.className = 'year-btn' + (d.year === selected ? ' selected' : '');
    btn.setAttribute('aria-pressed', d.year === selected ? 'true' : 'false');
    btn.addEventListener('click', () => {
      selected = d.year;
      holder.querySelectorAll('.year-btn').forEach((b) => {
        b.classList.toggle('selected', b.textContent === String(selected));
        b.setAttribute('aria-pressed', b.textContent === String(selected) ? 'true' : 'false');
      });
      draw();
    });
    holder.appendChild(btn);
  });
  draw();
}

function wireExplorer() {
  const search = document.getElementById('tableSearch');
  const sort = document.getElementById('sortSelect');
  const table = document.getElementById('explorerTable');
  const count = document.getElementById('resultCount');
  if (!search || !sort || !table || !count) return;
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  const apply = () => {
    const q = search.value.trim().toLowerCase();
    let visible = rows.filter((r) => !q || r.textContent.toLowerCase().includes(q));
    if (sort.value === 'year') {
      visible = visible.slice().sort((a, b) => Number(b.cells[2].textContent) - Number(a.cells[2].textContent));
    } else {
      visible = visible.slice().sort((a, b) => a.cells[0].textContent.localeCompare(b.cells[0].textContent));
    }
    rows.forEach((r) => { r.style.display = 'none'; });
    const body = table.querySelector('tbody');
    visible.forEach((r) => { r.style.display = ''; body.appendChild(r); });
    count.textContent = visible.length + (visible.length === 1 ? ' indicator' : ' indicators') + (q ? ` matching “${search.value.trim()}”` : '');
  };
  search.addEventListener('input', apply);
  sort.addEventListener('change', apply);

  const regionSelect = document.getElementById('regionSelect');
  const indicatorSelect = document.getElementById('indicatorSelect');
  const result = document.getElementById('regionResult');
  const showRegion = () => {
    const region = REGIONS.find((r) => r.code === regionSelect.value) || REGIONS[0];
    const key = indicatorSelect.value;
    const meta = REGION_INDICATORS[key];
    const value = region[key];
    const national = key === 'population'
      ? REGIONS.reduce((s, r) => s + r.population, 0)
      : key === 'areaKm2'
        ? REGIONS.reduce((s, r) => s + r.areaKm2, 0)
        : key === 'gdpPerCapita' ? 26515
        : key === 'unemployment' ? 6.4
        : 115.5;
    const share = key === 'population' || key === 'areaKm2'
      ? ((value / national) * 100).toFixed(1) + '% of the national total'
      : (value > national ? 'above' : value < national ? 'below' : 'equal to') + ' the national figure';
    result.innerHTML = `<p class="region-line"><strong>${region.name}</strong> — ${meta.label}: `
      + `<strong>${formatNumber(value, meta.format)} ${meta.unit}</strong></p>`
      + `<p class="region-line">National ${meta.label.toLowerCase()}: <strong>${formatNumber(national, meta.format)} ${meta.unit}</strong> — ${share}.</p>`
      + `<p class="region-line">${region.note} Regional capital: ${region.capital}.</p>`;
  };
  regionSelect.addEventListener('change', showRegion);
  indicatorSelect.addEventListener('change', showRegion);
  showRegion();
}

window.addEventListener('hashchange', render);
render();

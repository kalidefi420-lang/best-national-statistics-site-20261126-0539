// Regional breakdown of Portugal (NUTS II regions), 2024.
// Population: INE resident population estimates 2024.
// GDP per capita and unemployment: INE Regional Accounts / Labour Force Survey.
export const REGIONS = [
  {
    name: 'Norte', code: 'PT11', population: 3615700, areaKm2: 21286,
    gdpPerCapita: 21043, unemployment: 6.6, density: 169.9,
    capital: 'Porto', note: 'Most populous region; industry and textiles hub.',
  },
  {
    name: 'Centro', code: 'PT16', population: 2183800, areaKm2: 28199,
    gdpPerCapita: 20592, unemployment: 5.4, density: 77.4,
    capital: 'Coimbra', note: 'Largest region by area; ceramics, forestry and food.',
  },
  {
    name: 'Lisbon metropolitan area', code: 'PT17', population: 2901900, areaKm2: 3015,
    gdpPerCapita: 36298, unemployment: 7.2, density: 962.5,
    capital: 'Lisbon', note: 'Highest GDP per capita; services, finance and tourism.',
  },
  {
    name: 'Alentejo', code: 'PT18', population: 713100, areaKm2: 31605,
    gdpPerCapita: 22047, unemployment: 7.1, density: 22.6,
    capital: 'Évora', note: 'Lowest density; cork, wine, olive oil and solar energy.',
  },
  {
    name: 'Algarve', code: 'PT15', population: 484100, areaKm2: 4997,
    gdpPerCapita: 25716, unemployment: 6.9, density: 96.9,
    capital: 'Faro', note: 'Tourism-driven economy on the southern coast.',
  },
  {
    name: 'Azores', code: 'PT20', population: 238100, areaKm2: 2322,
    gdpPerCapita: 20864, unemployment: 6.2, density: 102.5,
    capital: 'Ponta Delgada', note: 'Atlantic archipelago; dairy, fishing and tourism.',
  },
  {
    name: 'Madeira', code: 'PT30', population: 256400, areaKm2: 801,
    gdpPerCapita: 22483, unemployment: 7.5, density: 320.1,
    capital: 'Funchal', note: 'Island region; tourism and the Madeira wine trade.',
  },
];

// Indicator values per region, used by the data explorer's region comparison.
export const REGION_INDICATORS = {
  population: { label: 'Population', unit: 'people', format: 'int' },
  gdpPerCapita: { label: 'GDP per capita', unit: '€', format: 'int' },
  unemployment: { label: 'Unemployment rate', unit: '%', format: 'one' },
  density: { label: 'Population density', unit: 'per km²', format: 'one' },
  areaKm2: { label: 'Area', unit: 'km²', format: 'int' },
};

export function formatNumber(value, format) {
  if (format === 'int') return Math.round(value).toLocaleString('en-GB');
  if (format === 'one') return value.toFixed(1);
  return String(value);
}

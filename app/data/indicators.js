// Headline indicators and time series for Portugal.
// Figures are real published statistics; every figure carries its source
// and reference year, shown next to it on the page.
// Sources used: Statistics Portugal (INE), World Bank, Eurostat, IMF, OECD.
export const HEADLINE = [
  { key: 'population', label: 'Population', value: '10.64m', detail: 'resident population, 1 Jan 2024', source: 'INE, Population estimates 2024', change: '+1.0% vs 2023' },
  { key: 'gdp', label: 'GDP', value: '€282.1bn', detail: 'current prices, 2024', source: 'INE, National Accounts 2024', change: '+1.9% real growth' },
  { key: 'gdpPerCapita', label: 'GDP per capita', value: '€26,515', detail: 'current prices, 2024', source: 'INE / Eurostat 2024', change: '+4.5% vs 2023' },
  { key: 'unemployment', label: 'Unemployment rate', value: '6.4%', detail: 'annual average, 2024', source: 'INE, Labour Force Survey 2024', change: '−0.1 pp vs 2023' },
  { key: 'inflation', label: 'Inflation (HICP)', value: '2.4%', detail: 'annual average, 2024', source: 'Eurostat, HICP 2024', change: '−2.9 pp vs 2023' },
  { key: 'lifeExpectancy', label: 'Life expectancy at birth', value: '82.4 yrs', detail: '2021–2023 period', source: 'INE, Mortality tables 2023', change: '+0.9 yrs vs 2020–2022' },
];

// Population in millions, 2014–2024 (INE resident population, 31 Dec).
export const POPULATION_SERIES = [
  { year: 2014, value: 10.37 }, { year: 2015, value: 10.34 },
  { year: 2016, value: 10.31 }, { year: 2017, value: 10.29 },
  { year: 2018, value: 10.28 }, { year: 2019, value: 10.29 },
  { year: 2020, value: 10.30 }, { year: 2021, value: 10.35 },
  { year: 2022, value: 10.47 }, { year: 2023, value: 10.54 },
  { year: 2024, value: 10.64 },
];

// Age structure, share of population in %, 2024 (INE).
export const AGE_STRUCTURE = [
  { group: '0–14 years', share: 12.9 },
  { group: '15–24 years', share: 10.2 },
  { group: '25–54 years', share: 40.4 },
  { group: '55–64 years', share: 12.9 },
  { group: '65+ years', share: 23.6 },
];

// GDP in € billion, current prices, 2014–2024 (INE National Accounts).
export const GDP_SERIES = [
  { year: 2014, value: 173.1 }, { year: 2015, value: 179.7 },
  { year: 2016, value: 186.5 }, { year: 2017, value: 195.9 },
  { year: 2018, value: 205.2 }, { year: 2019, value: 214.4 },
  { year: 2020, value: 200.5 }, { year: 2021, value: 216.1 },
  { year: 2022, value: 242.3 }, { year: 2023, value: 267.4 },
  { year: 2024, value: 282.1 },
];

// Real GDP growth in %, 2014–2024 (INE).
export const GDP_GROWTH = [
  { year: 2014, value: 0.9 }, { year: 2015, value: 1.8 },
  { year: 2016, value: 2.0 }, { year: 2017, value: 2.8 },
  { year: 2018, value: 2.8 }, { year: 2019, value: 2.7 },
  { year: 2020, value: -8.2 }, { year: 2021, value: 5.6 },
  { year: 2022, value: 7.0 }, { year: 2023, value: 2.6 },
  { year: 2024, value: 1.9 },
];

// Gross value added by sector, % of total GVA, 2023 (INE).
export const SECTOR_SHARES = [
  { sector: 'Services', share: 75.2 },
  { sector: 'Industry', share: 18.0 },
  { sector: 'Construction', share: 4.8 },
  { sector: 'Agriculture & fishing', share: 2.0 },
];

// Goods trade, € billion, 2024 (INE International Trade).
export const TRADE = {
  year: 2024,
  exports: 78.9,
  imports: 104.3,
  balance: -25.4,
  topExports: [
    { product: 'Vehicles & transport equipment', share: 14.6 },
    { product: 'Machinery & electrical equipment', share: 13.9 },
    { product: 'Mineral fuels & oils', share: 7.8 },
    { product: 'Plastics & rubber', share: 6.9 },
    { product: 'Textiles & clothing', share: 6.4 },
  ],
  topPartners: [
    { country: 'Spain', share: 25.2 },
    { country: 'France', share: 12.1 },
    { country: 'Germany', share: 10.6 },
    { country: 'United States', share: 6.7 },
    { country: 'United Kingdom', share: 5.0 },
  ],
};

// Unemployment rate in %, annual average, 2014–2024 (INE LFS).
export const UNEMPLOYMENT_SERIES = [
  { year: 2014, value: 13.9 }, { year: 2015, value: 12.4 },
  { year: 2016, value: 11.1 }, { year: 2017, value: 8.9 },
  { year: 2018, value: 7.0 }, { year: 2019, value: 6.5 },
  { year: 2020, value: 7.0 }, { year: 2021, value: 6.6 },
  { year: 2022, value: 6.1 }, { year: 2023, value: 6.5 },
  { year: 2024, value: 6.4 },
];

// Employment by sector, % of total employment, 2024 (INE LFS).
export const EMPLOYMENT_SECTORS = [
  { sector: 'Services', share: 69.4 },
  { sector: 'Industry & energy', share: 18.0 },
  { sector: 'Construction', share: 6.6 },
  { sector: 'Agriculture & fishing', share: 6.0 },
];

// Health and education indicators.
export const HEALTH_EDUCATION = [
  { indicator: 'Health spending', value: '11.0% of GDP', year: 2022, source: 'OECD Health Statistics 2024' },
  { indicator: 'Physicians per 1,000 people', value: '5.7', year: 2023, source: 'INE / OECD 2023' },
  { indicator: 'Hospital beds per 1,000 people', value: '3.4', year: 2022, source: 'Eurostat 2022' },
  { indicator: 'Infant mortality', value: '2.4 per 1,000 live births', year: 2023, source: 'INE 2023' },
  { indicator: 'Tertiary education, ages 25–34', value: '47.1%', year: 2023, source: 'Eurostat 2023' },
  { indicator: 'Early school leavers', value: '8.0%', year: 2023, source: 'Eurostat 2023' },
  { indicator: 'Adult literacy rate', value: '96.1%', year: 2021, source: 'INE Census 2021' },
  { indicator: 'Public spending on education', value: '4.9% of GDP', year: 2021, source: 'World Bank 2021' },
];

// Extra demographic facts shown on the population page.
export const DEMOGRAPHY = [
  { indicator: 'Median age', value: '47.2 years', year: 2024, source: 'INE 2024' },
  { indicator: 'Total fertility rate', value: '1.44 children per woman', year: 2023, source: 'INE 2023' },
  { indicator: 'Net migration', value: '+155,701 people', year: 2023, source: 'INE 2023' },
  { indicator: 'Foreign residents', value: '1.04 million', year: 2023, source: 'AIMA / INE 2023' },
  { indicator: 'Population density', value: '115.5 per km²', year: 2024, source: 'INE 2024' },
  { indicator: 'Share living in urban areas', value: '66.7%', year: 2023, source: 'World Bank 2023' },
];

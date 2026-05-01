// Illustrative figures benchmarked vs publicly disclosed industry data.
// Not audited. For DSS demonstration only.

export const kpis = {
  installedGW: 14.2,
  underConstructionGW: 7.4,
  pipelineGW: 25.1,
  target2030GW: 50,
  cuf: 24.8,
  availability: 99.6,
  ebitdaMarginPct: 92,
  netDebtToEbitda: 5.8,
  dso: 142,
  receivablesCr: 9420,
  marketSharePct: 17.4,
  scope1Reduction: 18,
};

export const capacityGlide = [
  { year: "FY23", operational: 8.4, construction: 4.1, plan: 12.5 },
  { year: "FY24", operational: 10.9, construction: 5.8, plan: 16.7 },
  { year: "FY25", operational: 12.6, construction: 6.9, plan: 19.5 },
  { year: "FY26", operational: 14.2, construction: 7.4, plan: 21.6 },
  { year: "FY27", operational: 19.5, construction: 8.2, plan: 27.7 },
  { year: "FY28", operational: 27.0, construction: 7.0, plan: 34.0 },
  { year: "FY29", operational: 36.5, construction: 5.5, plan: 42.0 },
  { year: "FY30", operational: 50.0, construction: 0, plan: 50.0 },
];

export const peerScorecard = [
  { peer: "Adani Green", capacity: 14.2, cuf: 24.8, leverage: 5.8, marginPct: 92, share: 17.4 },
  { peer: "ReNew", capacity: 10.3, cuf: 23.1, leverage: 6.4, marginPct: 76, share: 12.6 },
  { peer: "Tata Power Renew.", capacity: 9.6, cuf: 22.4, leverage: 4.2, marginPct: 64, share: 11.7 },
  { peer: "Greenko", capacity: 7.5, cuf: 25.2, leverage: 7.1, marginPct: 71, share: 9.2 },
  { peer: "JSW Energy Renew.", capacity: 4.8, cuf: 21.9, leverage: 3.6, marginPct: 58, share: 5.9 },
];

export const capitalAllocation = [
  { name: "Solar Greenfield", value: 42 },
  { name: "Wind & Hybrid", value: 23 },
  { name: "Storage / BESS", value: 14 },
  { name: "Transmission", value: 9 },
  { name: "Green H₂ Pilot", value: 7 },
  { name: "Digital & O&M", value: 5 },
];

export const operationalMonthly = [
  { month: "Apr", cuf: 26.8, availability: 99.7, generation: 3120 },
  { month: "May", cuf: 28.4, availability: 99.5, generation: 3380 },
  { month: "Jun", cuf: 24.1, availability: 99.6, generation: 2980 },
  { month: "Jul", cuf: 22.7, availability: 99.4, generation: 2810 },
  { month: "Aug", cuf: 21.2, availability: 99.6, generation: 2640 },
  { month: "Sep", cuf: 23.5, availability: 99.7, generation: 2890 },
  { month: "Oct", cuf: 25.4, availability: 99.8, generation: 3050 },
  { month: "Nov", cuf: 26.1, availability: 99.6, generation: 3180 },
];

export const receivablesAging = [
  { bucket: "0–30d", amount: 2890 },
  { bucket: "31–60d", amount: 1960 },
  { bucket: "61–90d", amount: 1740 },
  { bucket: "91–180d", amount: 1620 },
  { bucket: ">180d", amount: 1210 },
];

export const tacticalActions = [
  { id: "T1", action: "Accelerate Khavda 5GW commissioning", owner: "COO", days: 90, impact: "High", status: "On track" },
  { id: "T2", action: "Refinance USD 750M HY notes at <7%", owner: "CFO", days: 60, impact: "High", status: "At risk" },
  { id: "T3", action: "Settle DISCOM dues — TN, AP, MH", owner: "CCO", days: 45, impact: "High", status: "On track" },
  { id: "T4", action: "Sign 2 GW corporate PPA pipeline", owner: "CCO", days: 90, impact: "Medium", status: "On track" },
  { id: "T5", action: "BESS tender — 1 GWh shortlist", owner: "CTO", days: 75, impact: "Medium", status: "On track" },
  { id: "T6", action: "Launch O&M digital twin (200 sites)", owner: "COO", days: 60, impact: "Medium", status: "On track" },
  { id: "T7", action: "Green H₂ JV — partner LOI", owner: "CSO", days: 90, impact: "Medium", status: "Watch" },
  { id: "T8", action: "ESG rating uplift to AA (MSCI)", owner: "CSO", days: 90, impact: "Medium", status: "On track" },
];

export const strategicPillars = [
  { pillar: "Scale", target: "50 GW by FY30", current: "14.2 GW", progress: 28 },
  { pillar: "Cost leadership", target: "LCOE ₹2.20/kWh", current: "₹2.48/kWh", progress: 68 },
  { pillar: "Balance sheet", target: "Net debt/EBITDA <4.0x", current: "5.8x", progress: 45 },
  { pillar: "Diversification", target: "30% storage+hybrid", current: "12%", progress: 40 },
  { pillar: "ESG leadership", target: "MSCI AA", current: "A", progress: 70 },
];

export const competitiveRadar = [
  { axis: "Scale", "Adani Green": 95, ReNew: 70, Tata: 65, Greenko: 55 },
  { axis: "CUF", "Adani Green": 88, ReNew: 78, Tata: 74, Greenko: 90 },
  { axis: "Margin", "Adani Green": 92, ReNew: 76, Tata: 64, Greenko: 71 },
  { axis: "Balance sheet", "Adani Green": 50, ReNew: 45, Tata: 80, Greenko: 38 },
  { axis: "Pipeline", "Adani Green": 95, ReNew: 70, Tata: 72, Greenko: 60 },
  { axis: "ESG", "Adani Green": 72, ReNew: 78, Tata: 80, Greenko: 70 },
];

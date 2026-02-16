export interface HesacoreMonthlyData {
  month: string;
  monthShort: string;
  spend: number;
  purchases: number;
  revenue: number;
  roas: number;
  cpa: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  leads: number;
  addToCart: number;
}

export interface HesacoreReport {
  clientName: string;
  clientWebsite: string;
  reportPeriod: string;
  generatedDate: string;
  monthlyData: HesacoreMonthlyData[];
  yearTotals: {
    totalSpend: number;
    totalPurchases: number;
    totalRevenue: number;
    overallRoas: number;
    avgCpa: number;
    totalLeads: number;
    totalAddToCart: number;
  };
  pixelStatus: { active: boolean; note: string };
  shopifyConnection: { connected: boolean; note: string };
  capiStatus: { active: boolean; note: string };
}

const monthlyData: HesacoreMonthlyData[] = [
  {
    month: 'Enero 2025', monthShort: 'Ene',
    spend: 8461.38, purchases: 888, revenue: 46427.94,
    roas: 5.49, cpa: 9.53, impressions: 1356240, clicks: 14208,
    ctr: 1.05, cpc: 0.60, leads: 262, addToCart: 1202,
  },
  {
    month: 'Febrero 2025', monthShort: 'Feb',
    spend: 5801.22, purchases: 438, revenue: 29510.35,
    roas: 5.09, cpa: 13.24, impressions: 1031025, clicks: 9220,
    ctr: 0.89, cpc: 0.63, leads: 146, addToCart: 591,
  },
  {
    month: 'Marzo 2025', monthShort: 'Mar',
    spend: 9963.61, purchases: 610, revenue: 24946.53,
    roas: 2.50, cpa: 16.33, impressions: 1628805, clicks: 19369,
    ctr: 1.19, cpc: 0.51, leads: 281, addToCart: 743,
  },
  {
    month: 'Abril 2025', monthShort: 'Abr',
    spend: 4574.39, purchases: 167, revenue: 8534.59,
    roas: 1.87, cpa: 27.39, impressions: 667045, clicks: 11102,
    ctr: 1.66, cpc: 0.41, leads: 39, addToCart: 192,
  },
  {
    month: 'Mayo 2025', monthShort: 'May',
    spend: 2932.56, purchases: 149, revenue: 7762.15,
    roas: 2.65, cpa: 19.68, impressions: 205627, clicks: 3188,
    ctr: 1.55, cpc: 0.92, leads: 63, addToCart: 249,
  },
  {
    month: 'Junio 2025', monthShort: 'Jun',
    spend: 3882.08, purchases: 150, revenue: 6848.62,
    roas: 1.76, cpa: 25.88, impressions: 244859, clicks: 3999,
    ctr: 1.63, cpc: 0.97, leads: 115, addToCart: 231,
  },
  {
    month: 'Julio 2025', monthShort: 'Jul',
    spend: 7721.17, purchases: 395, revenue: 23164.61,
    roas: 3.00, cpa: 19.55, impressions: 448939, clicks: 5631,
    ctr: 2.51, cpc: 0.69, leads: 269, addToCart: 651,
  },
  {
    month: 'Agosto 2025', monthShort: 'Ago',
    spend: 7974.26, purchases: 565, revenue: 29434.71,
    roas: 3.69, cpa: 14.11, impressions: 541340, clicks: 10586,
    ctr: 1.96, cpc: 0.75, leads: 226, addToCart: 1066,
  },
  {
    month: 'Septiembre 2025', monthShort: 'Sep',
    spend: 8245.27, purchases: 495, revenue: 22991.33,
    roas: 2.79, cpa: 16.66, impressions: 566754, clicks: 5180,
    ctr: 1.80, cpc: 0.81, leads: 168, addToCart: 909,
  },
  {
    month: 'Octubre 2025', monthShort: 'Oct',
    spend: 15776.88, purchases: 1091, revenue: 59535.52,
    roas: 3.77, cpa: 14.46, impressions: 646272, clicks: 16224,
    ctr: 2.51, cpc: 0.97, leads: 466, addToCart: 2082,
  },
  {
    month: 'Noviembre 2025', monthShort: 'Nov',
    spend: 19114.32, purchases: 1383, revenue: 53108.10,
    roas: 2.78, cpa: 13.82, impressions: 799984, clicks: 20284,
    ctr: 2.54, cpc: 0.94, leads: 558, addToCart: 3018,
  },
  {
    month: 'Diciembre 2025', monthShort: 'Dic',
    spend: 7904.64, purchases: 582, revenue: 23922.80,
    roas: 3.03, cpa: 13.58, impressions: 439736, clicks: 9911,
    ctr: 2.25, cpc: 0.80, leads: 178, addToCart: 1020,
  },
];

const totalSpend = monthlyData.reduce((s, m) => s + m.spend, 0);
const totalPurchases = monthlyData.reduce((s, m) => s + m.purchases, 0);
const totalRevenue = monthlyData.reduce((s, m) => s + m.revenue, 0);
const totalLeads = monthlyData.reduce((s, m) => s + m.leads, 0);
const totalAddToCart = monthlyData.reduce((s, m) => s + m.addToCart, 0);

export const hesacoreReport: HesacoreReport = {
  clientName: 'Hesacore USA',
  clientWebsite: 'hesacore.com',
  reportPeriod: 'Enero - Diciembre 2025',
  generatedDate: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
  monthlyData,
  yearTotals: {
    totalSpend,
    totalPurchases,
    totalRevenue,
    overallRoas: totalRevenue / totalSpend,
    avgCpa: totalSpend / totalPurchases,
    totalLeads,
    totalAddToCart,
  },
  pixelStatus: {
    active: true,
    note: 'El Meta Pixel se encuentra activo y funcionando correctamente en hesacore.com.',
  },
  shopifyConnection: {
    connected: true,
    note: 'Shopify se encuentra correctamente conectado a Meta Business Suite para el seguimiento de conversiones y catálogo de productos.',
  },
  capiStatus: {
    active: true,
    note: 'Conversion API (CAPI) se encuentra activa mediante Elevar, asegurando un seguimiento de conversiones server-side preciso y confiable.',
  },
};

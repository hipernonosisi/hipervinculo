export interface MonthlyData {
  month: string;
  monthShort: string;
  retargeting: {
    spend: number;
    purchases: number;
    revenue: number;
    roas: number;
    cpa: number;
  };
  advantagePlus: {
    spend: number;
    purchases: number;
    revenue: number;
    roas: number;
    cpa: number;
  };
  awareness: {
    spend: number;
  };
  totals: {
    spend: number;
    purchases: number;
    revenue: number;
    roas: number;
    cpa: number;
  };
}

export interface LalenasFoodReport {
  clientName: string;
  clientWebsite: string;
  reportPeriod: string;
  generatedDate: string;
  monthlyData: MonthlyData[];
  yearTotals: {
    totalSpend: number;
    totalPurchases: number;
    totalRevenue: number;
    overallRoas: number;
    avgCpa: number;
    awarenessSpend: number;
  };
  pixelStatus: {
    active: boolean;
    note: string;
  };
  shopifyConnection: {
    connected: boolean;
    note: string;
  };
  capiStatus: {
    active: boolean;
    note: string;
  };
}

const monthlyData: MonthlyData[] = [
  {
    month: 'Enero 2025',
    monthShort: 'Ene',
    retargeting: { spend: 926.75, purchases: 38, revenue: 4461.69, roas: 4.81, cpa: 24.39 },
    advantagePlus: { spend: 1170.47, purchases: 40, revenue: 5338.64, roas: 4.56, cpa: 29.26 },
    awareness: { spend: 77.40 },
    totals: { spend: 2174.62, purchases: 78, revenue: 9800.33, roas: 4.67, cpa: 26.83 },
  },
  {
    month: 'Febrero 2025',
    monthShort: 'Feb',
    retargeting: { spend: 830.34, purchases: 33, revenue: 3952.30, roas: 4.76, cpa: 25.16 },
    advantagePlus: { spend: 923.05, purchases: 50, revenue: 5329.93, roas: 5.77, cpa: 18.46 },
    awareness: { spend: 65.84 },
    totals: { spend: 1819.23, purchases: 83, revenue: 9282.23, roas: 5.29, cpa: 21.11 },
  },
  {
    month: 'Marzo 2025',
    monthShort: 'Mar',
    retargeting: { spend: 1079.82, purchases: 31, revenue: 4421.91, roas: 4.10, cpa: 34.83 },
    advantagePlus: { spend: 536.11, purchases: 30, revenue: 4770.52, roas: 8.90, cpa: 17.87 },
    awareness: { spend: 78.23 },
    totals: { spend: 1694.16, purchases: 61, revenue: 9192.43, roas: 5.69, cpa: 26.49 },
  },
  {
    month: 'Abril 2025',
    monthShort: 'Abr',
    retargeting: { spend: 1485.02, purchases: 34, revenue: 4836.18, roas: 3.26, cpa: 43.68 },
    advantagePlus: { spend: 1105.62, purchases: 34, revenue: 2669.31, roas: 2.41, cpa: 32.52 },
    awareness: { spend: 73.80 },
    totals: { spend: 2664.44, purchases: 68, revenue: 7505.49, roas: 2.90, cpa: 38.10 },
  },
  {
    month: 'Mayo 2025',
    monthShort: 'May',
    retargeting: { spend: 1540.87, purchases: 40, revenue: 7391.36, roas: 4.80, cpa: 38.52 },
    advantagePlus: { spend: 1291.75, purchases: 48, revenue: 4732.61, roas: 3.66, cpa: 26.91 },
    awareness: { spend: 75.80 },
    totals: { spend: 2908.42, purchases: 88, revenue: 12123.97, roas: 4.28, cpa: 32.19 },
  },
  {
    month: 'Junio 2025',
    monthShort: 'Jun',
    retargeting: { spend: 2856.33, purchases: 44, revenue: 6699.45, roas: 2.35, cpa: 64.92 },
    advantagePlus: { spend: 887.29, purchases: 26, revenue: 2681.52, roas: 3.02, cpa: 34.13 },
    awareness: { spend: 74.14 },
    totals: { spend: 3817.76, purchases: 70, revenue: 9380.97, roas: 2.51, cpa: 53.47 },
  },
  {
    month: 'Julio 2025',
    monthShort: 'Jul',
    retargeting: { spend: 1645.62, purchases: 23, revenue: 2277.21, roas: 1.38, cpa: 71.55 },
    advantagePlus: { spend: 2543.27, purchases: 45, revenue: 4292.09, roas: 1.69, cpa: 56.52 },
    awareness: { spend: 37.98 },
    totals: { spend: 4226.87, purchases: 68, revenue: 6569.30, roas: 1.57, cpa: 61.57 },
  },
  {
    month: 'Agosto 2025',
    monthShort: 'Ago',
    retargeting: { spend: 926.53, purchases: 47, revenue: 4939.69, roas: 5.33, cpa: 19.71 },
    advantagePlus: { spend: 1268.91, purchases: 49, revenue: 4696.42, roas: 3.70, cpa: 25.90 },
    awareness: { spend: 0 },
    totals: { spend: 2195.44, purchases: 96, revenue: 9636.11, roas: 4.39, cpa: 22.87 },
  },
  {
    month: 'Septiembre 2025',
    monthShort: 'Sep',
    retargeting: { spend: 911.58, purchases: 46, revenue: 4462.44, roas: 4.90, cpa: 19.82 },
    advantagePlus: { spend: 1038.64, purchases: 57, revenue: 6239.62, roas: 6.01, cpa: 18.22 },
    awareness: { spend: 0 },
    totals: { spend: 1950.22, purchases: 103, revenue: 10702.06, roas: 5.49, cpa: 18.93 },
  },
  {
    month: 'Octubre 2025',
    monthShort: 'Oct',
    retargeting: { spend: 1396.04, purchases: 42, revenue: 5305.85, roas: 3.80, cpa: 33.24 },
    advantagePlus: { spend: 1370.91, purchases: 53, revenue: 4705.63, roas: 3.43, cpa: 25.87 },
    awareness: { spend: 0 },
    totals: { spend: 2766.95, purchases: 95, revenue: 10011.48, roas: 3.62, cpa: 29.13 },
  },
  {
    month: 'Noviembre 2025',
    monthShort: 'Nov',
    retargeting: { spend: 603.65, purchases: 19, revenue: 1740.19, roas: 2.88, cpa: 31.77 },
    advantagePlus: { spend: 1315.34, purchases: 77, revenue: 10316.20, roas: 7.84, cpa: 17.08 },
    awareness: { spend: 0 },
    totals: { spend: 1918.99, purchases: 96, revenue: 12056.39, roas: 6.28, cpa: 19.99 },
  },
  {
    month: 'Diciembre 2025',
    monthShort: 'Dic',
    retargeting: { spend: 450.48, purchases: 9, revenue: 1107.67, roas: 2.46, cpa: 50.05 },
    advantagePlus: { spend: 2213.08, purchases: 75, revenue: 11488.44, roas: 5.19, cpa: 29.51 },
    awareness: { spend: 0 },
    totals: { spend: 2663.56, purchases: 84, revenue: 12596.11, roas: 4.73, cpa: 31.71 },
  },
];

export const lalenasFoodReport: LalenasFoodReport = {
  clientName: 'Lalenas Food',
  clientWebsite: 'lalenasfood.com',
  reportPeriod: 'Enero - Diciembre 2025',
  generatedDate: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
  monthlyData,
  yearTotals: {
    totalSpend: 14653.03 + 15664.44 + 483.19,
    totalPurchases: 406 + 584,
    totalRevenue: 51595.94 + 67260.93,
    overallRoas: (51595.94 + 67260.93) / (14653.03 + 15664.44),
    avgCpa: (14653.03 + 15664.44) / (406 + 584),
    awarenessSpend: 483.19,
  },
  pixelStatus: {
    active: true,
    note: 'El Meta Pixel se encuentra activo y funcionando correctamente en lalenasfood.com.',
  },
  shopifyConnection: {
    connected: true,
    note: 'Shopify se encuentra correctamente conectado a Meta Business Suite para el seguimiento de conversiones y catálogo de productos.',
  },
  capiStatus: {
    active: false,
    note: 'Actualmente no se utiliza Conversion API (CAPI). La implementación requiere herramientas adicionales con costos a partir de $150 USD/mes.',
  },
};

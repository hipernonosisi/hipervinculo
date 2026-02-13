import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import type { LalenasFoodReport } from '../data/lalenasFoodReportData';

const green = '#2d4a2d';
const lime = '#8BC34A';
const bg = '#f8f9f5';

const s = StyleSheet.create({
  page: { padding: 40, backgroundColor: bg, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  logo: { height: 28 },
  accent: { width: 40, height: 3, backgroundColor: lime },
  title: { fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 },
  subtitle: { fontSize: 11, color: '#666' },
  kpiRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  kpiCard: { flex: 1, backgroundColor: 'white', borderRadius: 10, padding: 14 },
  kpiLabel: { fontSize: 8, color: '#888', marginBottom: 4 },
  kpiValue: { fontSize: 10, fontWeight: 'bold', color: green },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: green, marginBottom: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#e8e8e8', borderRadius: 4, padding: 6, marginBottom: 2 },
  tableRow: { flexDirection: 'row', padding: 6, borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  tableRowAlt: { flexDirection: 'row', padding: 6, backgroundColor: '#f5f5f5', borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  tableTotalRow: { flexDirection: 'row', padding: 6, backgroundColor: '#e8f5e9', borderRadius: 4 },
  thCell: { fontSize: 7, fontWeight: 'bold', color: '#444' },
  tdCell: { fontSize: 7, color: '#333' },
  tdBold: { fontSize: 7, fontWeight: 'bold', color: green },
  statusCard: { flex: 1, backgroundColor: 'white', borderRadius: 10, padding: 14 },
  statusActive: { fontSize: 8, fontWeight: 'bold', color: '#2e7d32', backgroundColor: '#e8f5e9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 6 },
  statusInactive: { fontSize: 8, fontWeight: 'bold', color: '#f57f17', backgroundColor: '#fff8e1', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 6 },
  statusNote: { fontSize: 7, color: '#666', lineHeight: 1.4 },
  statusTitle: { fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 6 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 7, color: '#999' },
  roasBadgeGreen: { fontSize: 7, fontWeight: 'bold', color: '#2e7d32', backgroundColor: '#e8f5e9', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 6 },
  roasBadgeYellow: { fontSize: 7, fontWeight: 'bold', color: '#f57f17', backgroundColor: '#fff8e1', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 6 },
  roasBadgeRed: { fontSize: 7, fontWeight: 'bold', color: '#c62828', backgroundColor: '#fce4ec', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 6 },
  campTitle: { fontSize: 12, fontWeight: 'bold', color: green, marginBottom: 2 },
  campSubtitle: { fontSize: 8, color: '#888', marginBottom: 8 },
});

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function RoasBadge({ value }: { value: number }) {
  const style = value >= 3 ? s.roasBadgeGreen : value >= 2 ? s.roasBadgeYellow : s.roasBadgeRed;
  return <Text style={style}>{value.toFixed(2)}x</Text>;
}

interface Props {
  report: LalenasFoodReport;
  logoBase64: string;
}

export function LalenasFoodPDFDocument({ report, logoBase64 }: Props) {
  const colWidths = { month: '20%', spend: '18%', purchases: '14%', revenue: '20%', roas: '14%', cpa: '14%' };
  const campColWidths = { month: '16%', spend: '22%', purchases: '16%', revenue: '24%', roas: '22%' };

  return (
    <Document>
      {/* Page 1: Cover + KPIs + Table */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Image src={logoBase64} style={s.logo} />
          <View style={s.accent} />
        </View>

        <Text style={s.title}>Reporte de Meta Ads 2025</Text>
        <Text style={[s.subtitle, { marginBottom: 20 }]}>{report.clientName} &middot; {report.reportPeriod}</Text>

        <View style={s.kpiRow}>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>Inversión Total</Text>
            <Text style={s.kpiValue}>${fmt(report.yearTotals.totalSpend)}</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>Revenue Atribuido</Text>
            <Text style={s.kpiValue}>${fmt(report.yearTotals.totalRevenue)}</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>ROAS Promedio</Text>
            <Text style={s.kpiValue}>{report.yearTotals.overallRoas.toFixed(2)}x</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>Pedidos Totales</Text>
            <Text style={s.kpiValue}>{report.yearTotals.totalPurchases}</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>Desglose Mensual — Todas las Campañas</Text>

        <View style={s.tableHeader}>
          <Text style={[s.thCell, { width: colWidths.month }]}>Mes</Text>
          <Text style={[s.thCell, { width: colWidths.spend, textAlign: 'right' }]}>Inversión</Text>
          <Text style={[s.thCell, { width: colWidths.purchases, textAlign: 'right' }]}>Compras</Text>
          <Text style={[s.thCell, { width: colWidths.revenue, textAlign: 'right' }]}>Revenue</Text>
          <Text style={[s.thCell, { width: colWidths.roas, textAlign: 'right' }]}>ROAS</Text>
          <Text style={[s.thCell, { width: colWidths.cpa, textAlign: 'right' }]}>CPA</Text>
        </View>

        {report.monthlyData.map((m, i) => (
          <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
            <Text style={[s.tdBold, { width: colWidths.month }]}>{m.monthShort}</Text>
            <Text style={[s.tdCell, { width: colWidths.spend, textAlign: 'right' }]}>${fmt(m.totals.spend)}</Text>
            <Text style={[s.tdCell, { width: colWidths.purchases, textAlign: 'right' }]}>{m.totals.purchases}</Text>
            <Text style={[s.tdCell, { width: colWidths.revenue, textAlign: 'right' }]}>${fmt(m.totals.revenue)}</Text>
            <View style={{ width: colWidths.roas, alignItems: 'flex-end' }}><RoasBadge value={m.totals.roas} /></View>
            <Text style={[s.tdCell, { width: colWidths.cpa, textAlign: 'right' }]}>${fmt(m.totals.cpa)}</Text>
          </View>
        ))}

        <View style={s.tableTotalRow}>
          <Text style={[s.tdBold, { width: colWidths.month }]}>Total 2025</Text>
          <Text style={[s.tdBold, { width: colWidths.spend, textAlign: 'right' }]}>${fmt(report.yearTotals.totalSpend)}</Text>
          <Text style={[s.tdBold, { width: colWidths.purchases, textAlign: 'right' }]}>{report.yearTotals.totalPurchases}</Text>
          <Text style={[s.tdBold, { width: colWidths.revenue, textAlign: 'right' }]}>${fmt(report.yearTotals.totalRevenue)}</Text>
          <View style={{ width: colWidths.roas, alignItems: 'flex-end' }}><RoasBadge value={report.yearTotals.overallRoas} /></View>
          <Text style={[s.tdBold, { width: colWidths.cpa, textAlign: 'right' }]}>${fmt(report.yearTotals.avgCpa)}</Text>
        </View>

        <Text style={s.footer}>Reporte generado por Hipervínculo · hipervinculo.net · info@hipervinculo.net</Text>
      </Page>

      {/* Page 2: Campaign Breakdown */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Image src={logoBase64} style={s.logo} />
          <View style={s.accent} />
        </View>

        <Text style={s.campTitle}>Retargeting Campaign</Text>
        <Text style={s.campSubtitle}>Hipervinculo - Sales - Retargeting</Text>

        <View style={s.tableHeader}>
          <Text style={[s.thCell, { width: campColWidths.month }]}>Mes</Text>
          <Text style={[s.thCell, { width: campColWidths.spend, textAlign: 'right' }]}>Inversión</Text>
          <Text style={[s.thCell, { width: campColWidths.purchases, textAlign: 'right' }]}>Compras</Text>
          <Text style={[s.thCell, { width: campColWidths.revenue, textAlign: 'right' }]}>Revenue</Text>
          <Text style={[s.thCell, { width: campColWidths.roas, textAlign: 'right' }]}>ROAS</Text>
        </View>
        {report.monthlyData.map((m, i) => (
          <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
            <Text style={[s.tdBold, { width: campColWidths.month }]}>{m.monthShort}</Text>
            <Text style={[s.tdCell, { width: campColWidths.spend, textAlign: 'right' }]}>${fmt(m.retargeting.spend)}</Text>
            <Text style={[s.tdCell, { width: campColWidths.purchases, textAlign: 'right' }]}>{m.retargeting.purchases}</Text>
            <Text style={[s.tdCell, { width: campColWidths.revenue, textAlign: 'right' }]}>${fmt(m.retargeting.revenue)}</Text>
            <View style={{ width: campColWidths.roas, alignItems: 'flex-end' }}><RoasBadge value={m.retargeting.roas} /></View>
          </View>
        ))}

        <View style={{ marginTop: 24 }} />
        <Text style={s.campTitle}>Advantage+ Shopping Campaign</Text>
        <Text style={s.campSubtitle}>BOF - Sales - Dynamic Catalog</Text>

        <View style={s.tableHeader}>
          <Text style={[s.thCell, { width: campColWidths.month }]}>Mes</Text>
          <Text style={[s.thCell, { width: campColWidths.spend, textAlign: 'right' }]}>Inversión</Text>
          <Text style={[s.thCell, { width: campColWidths.purchases, textAlign: 'right' }]}>Compras</Text>
          <Text style={[s.thCell, { width: campColWidths.revenue, textAlign: 'right' }]}>Revenue</Text>
          <Text style={[s.thCell, { width: campColWidths.roas, textAlign: 'right' }]}>ROAS</Text>
        </View>
        {report.monthlyData.map((m, i) => (
          <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
            <Text style={[s.tdBold, { width: campColWidths.month }]}>{m.monthShort}</Text>
            <Text style={[s.tdCell, { width: campColWidths.spend, textAlign: 'right' }]}>${fmt(m.advantagePlus.spend)}</Text>
            <Text style={[s.tdCell, { width: campColWidths.purchases, textAlign: 'right' }]}>{m.advantagePlus.purchases}</Text>
            <Text style={[s.tdCell, { width: campColWidths.revenue, textAlign: 'right' }]}>${fmt(m.advantagePlus.revenue)}</Text>
            <View style={{ width: campColWidths.roas, alignItems: 'flex-end' }}><RoasBadge value={m.advantagePlus.roas} /></View>
          </View>
        ))}

        <Text style={s.footer}>Reporte generado por Hipervínculo · hipervinculo.net · info@hipervinculo.net</Text>
      </Page>

      {/* Page 3: Integrations Status */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Image src={logoBase64} style={s.logo} />
          <View style={s.accent} />
        </View>

        <Text style={{ fontSize: 18, fontWeight: 'bold', color: green, marginBottom: 16 }}>Estado de Integraciones</Text>

        {/* Stacked vertically, much larger */}
        <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: green, marginBottom: 6 }}>Meta Pixel</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#2e7d32', backgroundColor: '#e8f5e9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 8 }}>Activo</Text>
          <Text style={{ fontSize: 9, color: '#666', lineHeight: 1.5 }}>{report.pixelStatus.note}</Text>
        </View>

        <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: green, marginBottom: 6 }}>Shopify + Meta</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#2e7d32', backgroundColor: '#e8f5e9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 8 }}>Conectado</Text>
          <Text style={{ fontSize: 9, color: '#666', lineHeight: 1.5 }}>{report.shopifyConnection.note}</Text>
        </View>

        <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: green, marginBottom: 6 }}>Conversion API (CAPI)</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#f57f17', backgroundColor: '#fff8e1', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 8 }}>No activo</Text>
          <Text style={{ fontSize: 9, color: '#666', lineHeight: 1.5 }}>{report.capiStatus.note}</Text>
        </View>

        <Text style={s.footer}>Reporte generado por Hipervínculo · hipervinculo.net · info@hipervinculo.net</Text>
      </Page>

      {/* Page 4: Our Services - stacked vertically */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Image src={logoBase64} style={s.logo} />
          <View style={s.accent} />
        </View>

        <Text style={{ fontSize: 18, fontWeight: 'bold', color: green, marginBottom: 4 }}>Nuestros Servicios</Text>
        <Text style={{ fontSize: 10, color: '#666', marginBottom: 16 }}>Soluciones integrales de marketing digital para escalar tu negocio</Text>

        {[
          { name: 'Meta Ads Management', desc: 'Gestión profesional de campañas en Facebook e Instagram para maximizar tu ROAS.', url: 'hipervinculo.net/services/meta-ads-management' },
          { name: 'Lead Generation', desc: 'Sistemas de generación de leads calificados para alimentar tu pipeline de ventas.', url: 'hipervinculo.net/services/lead-generation' },
          { name: 'Shopify Development', desc: 'Desarrollo y optimización de tiendas Shopify para maximizar conversiones.', url: 'hipervinculo.net/services/shopify-development' },
          { name: 'Landing Page Development', desc: 'Páginas de aterrizaje optimizadas para conversión con tracking completo.', url: 'hipervinculo.net/services/landing-page-development' },
          { name: 'Brand Identity Design', desc: 'Diseño de manuales de imagen de marca profesionales y completos.', url: 'hipervinculo.net/services/brand-identity-design' },
          { name: 'Google Ads Management', desc: 'Campañas de búsqueda y shopping para capturar demanda existente.', url: 'hipervinculo.net/services/google-ads-management' },
        ].map((service, i) => (
          <View key={i} style={{ backgroundColor: 'white', borderRadius: 10, padding: 14, marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: lime, marginRight: 12, flexShrink: 0 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 2 }}>{service.name}</Text>
              <Text style={{ fontSize: 8, color: '#666', marginBottom: 2 }}>{service.desc}</Text>
              <Text style={{ fontSize: 7, color: lime }}>{service.url}</Text>
            </View>
          </View>
        ))}

        <Text style={s.footer}>Reporte generado por Hipervínculo · hipervinculo.net · info@hipervinculo.net</Text>
      </Page>

      {/* Page 5: Contact - split layout like presentations */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* Left side - Dark green */}
          <View style={{ width: '60%', backgroundColor: green, paddingHorizontal: 40, paddingVertical: 50, justifyContent: 'center' }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 6 }}>
              ¿Listo para escalar?
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: lime, marginBottom: 14 }}>
              Hablemos sobre tu estrategia de crecimiento
            </Text>
            <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginBottom: 28, lineHeight: 1.5 }}>
              Nuestro equipo está listo para ayudarte a llevar tus resultados al siguiente nivel con estrategias personalizadas y basadas en datos.
            </Text>

            {/* Contact items */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ width: 30, height: 30, borderRadius: 6, backgroundColor: 'rgba(139,195,74,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <Text style={{ fontSize: 12 }}>✉</Text>
              </View>
              <View>
                <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>Email</Text>
                <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>info@hipervinculo.net</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ width: 30, height: 30, borderRadius: 6, backgroundColor: 'rgba(139,195,74,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <Text style={{ fontSize: 12 }}>📞</Text>
              </View>
              <View>
                <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>Phone</Text>
                <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>+1 (786) 808-2868</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ width: 30, height: 30, borderRadius: 6, backgroundColor: 'rgba(139,195,74,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <Text style={{ fontSize: 12 }}>🌐</Text>
              </View>
              <View>
                <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>Website</Text>
                <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>hipervinculo.net</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 30, height: 30, borderRadius: 6, backgroundColor: 'rgba(139,195,74,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <Text style={{ fontSize: 12 }}>📍</Text>
              </View>
              <View>
                <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>Address</Text>
                <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>Miami, FL</Text>
              </View>
            </View>
          </View>

          {/* Right side - White with logo */}
          <View style={{ width: '40%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
            <Image src={logoBase64} style={{ height: 36, marginBottom: 16 }} />
            <View style={{ width: 40, height: 3, backgroundColor: lime, marginBottom: 16 }} />
            <Text style={{ fontSize: 9, color: green, textAlign: 'center', fontWeight: 'bold' }}>
              Where strategy meets{'\n'}scalable growth
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

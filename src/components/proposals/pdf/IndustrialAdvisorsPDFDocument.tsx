import { Document, Page, Text, View, Image, Font, StyleSheet, Link } from '@react-pdf/renderer';
import { iaSections, iaPricing } from '../data/industrialAdvisorsContent';

Font.register({ family: 'IAJakarta', fonts: [
  { src: '/fonts/jakarta-regular.ttf', fontWeight: 400 },
  { src: '/fonts/jakarta-bold.ttf', fontWeight: 700 },
] });
Font.registerHyphenationCallback(word => [word]);

const palette = { green: '#2F4F3E', lime: '#8BC34A', white: '#FFFFFF', ink: '#43534B', muted: '#64746C', line: '#DAE2DD', surface: '#F3F6F4' };
const s = StyleSheet.create({
  page: { padding: 50, paddingBottom: 65, fontFamily: 'IAJakarta', fontSize: 10, color: palette.ink, backgroundColor: palette.white },
  logo: { width: 125, marginBottom: 30 },
  eyebrow: { fontSize: 8, color: palette.muted, marginBottom: 12 },
  title: { fontSize: 25, fontWeight: 700, color: palette.green, lineHeight: 1.2, marginBottom: 16 },
  intro: { fontSize: 11, lineHeight: 1.65, marginBottom: 22 },
  block: { marginBottom: 16 },
  heading: { fontSize: 11, fontWeight: 700, color: palette.green, marginBottom: 7, lineHeight: 1.4 },
  body: { fontSize: 9.5, lineHeight: 1.65 },
  bullet: { flexDirection: 'row', marginBottom: 5 },
  dot: { width: 10, color: palette.green },
  cell: { flex: 1, padding: 9, fontSize: 8.5, lineHeight: 1.5 },
  row: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: palette.line },
  note: { padding: 12, backgroundColor: palette.surface, fontSize: 8.5, lineHeight: 1.6, marginTop: 10 },
  footer: { position: 'absolute', bottom: 28, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between', color: palette.muted, fontSize: 7 },
});

export function IndustrialAdvisorsPDFDocument({ logo }: { logo: string }) {
  const footer = <View fixed style={s.footer}><Text>HIPERVÍNCULO · INDUSTRIAL ADVISORS</Text><Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} /></View>;
  return <Document title="Propuesta de Google Ads para Industrial Advisors" author="Hipervínculo" language="es">
    <Page size="A4" style={s.page}>
      <Image src={logo} style={s.logo} />
      <Text style={s.eyebrow}>PROPUESTA COMERCIAL · OCTUBRE 2026</Text>
      <Text style={[s.title, { fontSize: 34, marginTop: 35 }]}>Propuesta de Google Ads para Industrial Advisors</Text>
      <Text style={[s.intro, { fontSize: 14, marginTop: 12 }]}>Una estrategia para captar demanda industrial y convertir búsquedas en oportunidades comerciales.</Text>
      <View style={{ height: 4, width: 55, backgroundColor: palette.lime, marginTop: 18, marginBottom: 30 }} />
      {iaPricing.map(p => <View key={p.label} style={[s.block, { paddingBottom: 12, borderBottomWidth: 0.5, borderBottomColor: palette.line }]}><Text style={s.eyebrow}>{p.label}</Text><Text style={[s.heading, { fontSize: 19 }]}>{p.amount}</Text><Text style={s.body}>{p.detail}</Text></View>)}
      <Text style={s.note}>La publicidad se paga aparte, directamente a Google. Rango orientativo del piloto, pendiente de validar. No garantiza resultados.</Text>
      {footer}
    </Page>
    {iaSections.map((section, index) => <Page key={section.id} size="A4" style={s.page}>
      <Text style={s.eyebrow}>{String(index + 1).padStart(2, '0')} · {section.nav.toUpperCase()}</Text>
      <Text style={s.title}>{section.title}</Text>
      <Text style={s.intro}>{section.intro}</Text>
      {section.blocks?.map(block => <View key={block.title} style={s.block} wrap={false}>
        <Text style={s.heading}>{block.title}</Text>
        {block.text && <Text style={s.body}>{block.text}</Text>}
        {block.bullets?.map(item => <View key={item} style={s.bullet}><Text style={s.dot}>•</Text><Text style={[s.body, { flex: 1 }]}>{item}</Text></View>)}
      </View>)}
      {section.table && <View style={{ marginBottom: 8 }}>
        <View style={[s.row, { backgroundColor: palette.green }]}>{section.table.headers.map(h => <Text key={h} style={[s.cell, { color: palette.white, fontWeight: 700 }]}>{h}</Text>)}</View>
        {section.table.rows.map(row => <View key={row[0]} style={s.row} wrap={false}>{row.map((cell, i) => <Text key={i} style={[s.cell, i === 0 ? { fontWeight: 700, color: palette.green } : {}]}>{cell}</Text>)}</View>)}
      </View>}
      {section.note && <Text style={s.note}>{section.note}</Text>}
      {section.id === 'cierre' && <Link src="mailto:info@hipervinculo.net" style={[s.heading, { marginTop: 20 }]}>Coordinar el lanzamiento → info@hipervinculo.net</Link>}
      {footer}
    </Page>)}
  </Document>;
}
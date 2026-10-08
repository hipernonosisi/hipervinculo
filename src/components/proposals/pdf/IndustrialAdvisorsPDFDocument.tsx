import { Document, Page, Text, View, Image, Font, StyleSheet, Link } from '@react-pdf/renderer';
import { iaCover, iaSections, iaPricing } from '../data/industrialAdvisorsContent';

Font.register({ family: 'IAJakarta', fonts: [
  { src: '/fonts/jakarta-regular.ttf', fontWeight: 400 },
  { src: '/fonts/jakarta-bold.ttf', fontWeight: 700 },
] });
Font.registerHyphenationCallback(word => [word]);

const palette = { green: '#2F4F3E', lime: '#8BC34A', white: '#FFFFFF', ink: '#43534B', muted: '#64746C', line: '#DAE2DD', surface: '#F3F6F4' };
const s = StyleSheet.create({
  page: { padding: 50, paddingBottom: 65, fontFamily: 'IAJakarta', fontSize: 10, color: palette.ink, backgroundColor: palette.white },
  fullPage: { padding: 0, fontFamily: 'IAJakarta', backgroundColor: palette.white },
  logoHeader: { padding: 50, paddingBottom: 28, backgroundColor: palette.white },
  logo: { width: 140 },
  cover: { flex: 1, backgroundColor: palette.green, padding: 50, justifyContent: 'center', color: palette.white },
  coverTitle: { fontSize: 38, fontWeight: 700, lineHeight: 1.15, marginTop: 18, marginBottom: 18 },
  coverSubtitle: { fontSize: 16, lineHeight: 1.5, marginBottom: 14 },
  coverTagline: { fontSize: 11, lineHeight: 1.7, color: palette.white, marginBottom: 24 },
  coverEyebrow: { fontSize: 9, fontWeight: 700, color: palette.lime },
  priceRow: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: palette.muted, paddingVertical: 12, gap: 16 },
  priceLabel: { flex: 1, fontSize: 10, lineHeight: 1.5 },
  priceDetail: { fontSize: 8, lineHeight: 1.5, marginTop: 3 },
  price: { fontSize: 15, fontWeight: 700, flexShrink: 0 },
  coverNote: { fontSize: 8, lineHeight: 1.7, marginTop: 12 },
  bottomStrip: { paddingHorizontal: 50, paddingVertical: 22, flexDirection: 'row', justifyContent: 'space-between', fontSize: 7, color: palette.muted, backgroundColor: palette.white },
  accent: { width: 36, height: 3, backgroundColor: palette.lime, marginBottom: 20 },
  eyebrow: { fontSize: 8, color: palette.muted, marginBottom: 10, fontWeight: 700 },
  title: { fontSize: 25, fontWeight: 700, color: palette.green, lineHeight: 1.2, marginBottom: 16 },
  intro: { fontSize: 10.5, lineHeight: 1.6, marginBottom: 22, color: palette.muted },
  block: { marginBottom: 14, backgroundColor: palette.surface, padding: 15, borderRadius: 6, flexDirection: 'row', gap: 10 },
  blockContent: { flex: 1 },
  check: { fontSize: 13, color: palette.green, width: 13 },
  heading: { fontSize: 10.5, fontWeight: 700, color: palette.green, marginBottom: 7, lineHeight: 1.4 },
  body: { fontSize: 9, lineHeight: 1.6 },
  bullet: { flexDirection: 'row', marginBottom: 4 },
  dot: { width: 10, color: palette.green },
  table: { marginTop: 8, marginBottom: 8 },
  cell: { flex: 1, padding: 10, fontSize: 8.5, lineHeight: 1.55 },
  row: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: palette.line },
  note: { padding: 12, backgroundColor: palette.surface, borderLeftWidth: 2, borderLeftColor: palette.lime, fontSize: 8, lineHeight: 1.6, marginTop: 10 },
  footer: { position: 'absolute', bottom: 28, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between', color: palette.muted, fontSize: 7 },
  contact: { flex: 1, padding: 50, justifyContent: 'center', backgroundColor: palette.green, color: palette.white },
  contactTitle: { fontSize: 30, fontWeight: 700, lineHeight: 1.2, marginTop: 20, marginBottom: 20 },
  contactIntro: { fontSize: 12, lineHeight: 1.7, marginBottom: 28 },
  contactBlock: { marginBottom: 24 },
  contactHeading: { fontSize: 12, fontWeight: 700, marginBottom: 10 },
  contactText: { fontSize: 10, lineHeight: 1.8 },
  contactLink: { color: palette.lime, fontSize: 11, fontWeight: 700, marginTop: 18 },
  closingLogo: { padding: 42, alignItems: 'center', backgroundColor: palette.white },
});

export function IndustrialAdvisorsPDFDocument({ logo }: { logo: string }) {
  const footer = <View fixed style={s.footer}><Text>HIPERVÍNCULO · INDUSTRIAL ADVISORS</Text><Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} /></View>;
  return <Document title="Google Ads Proposal for Industrial Advisors" author="Hipervínculo" language="en">
    <Page size="A4" style={s.fullPage}>
      <View style={s.logoHeader}><Image src={logo} style={s.logo} /></View>
      <View style={s.cover}>
        <Text style={s.coverEyebrow}>{iaCover.title.toUpperCase()} · {iaCover.date.toUpperCase()}</Text>
        <Text style={s.coverTitle}>{iaCover.client}</Text>
        <Text style={s.coverSubtitle}>{iaCover.subtitle}</Text>
        <Text style={s.coverTagline}>{iaCover.tagline}</Text>
        {iaPricing.map(p => <View key={p.label} style={s.priceRow}><View style={s.priceLabel}><Text>{p.label}</Text><Text style={s.priceDetail}>{p.detail}</Text></View><Text style={s.price}>{p.amount}</Text></View>)}
        <Text style={s.coverNote}>{iaCover.note}</Text>
      </View>
      <View style={s.bottomStrip}><Text>CONFIDENTIAL · MIGUEL CAMACHO</Text><Text>hipervinculo.net</Text></View>
    </Page>
    {iaSections.map((section, index) => section.id === 'cierre' ? <Page key={section.id} size="A4" style={s.fullPage}>
      <View style={s.contact}><Text style={s.coverEyebrow}>NEXT STEP</Text><Text style={s.contactTitle}>{section.title}</Text><Text style={s.contactIntro}>{section.intro}</Text>{section.blocks?.map(block => <View key={block.title} style={s.contactBlock}><Text style={s.contactHeading}>{block.title}</Text><Text style={s.contactText}>{block.text}</Text></View>)}<Link src="https://calendly.com/hipervinculo_usa/30-minutes-call" style={s.contactLink}>Coordinate launch →</Link><Link src="mailto:info@hipervinculo.net" style={s.contactLink}>Contact Hipervínculo →</Link></View>
      <View style={s.closingLogo}><Image src={logo} style={s.logo} /></View><View style={s.bottomStrip}><Text>HIPERVÍNCULO · INDUSTRIAL ADVISORS</Text><Text>{iaSections.length + 1} / {iaSections.length + 1}</Text></View>
    </Page> : <Page key={section.id} size="A4" style={s.page}>
      <View style={s.accent} /><Text style={s.eyebrow}>{String(index + 1).padStart(2, '0')} · {section.nav.toUpperCase()}</Text>
      <Text style={s.title}>{section.title}</Text><Text style={s.intro}>{section.intro}</Text>
      {section.blocks?.map(block => <View key={block.title} style={s.block} wrap={false}><Text style={s.check}>•</Text><View style={s.blockContent}><Text style={s.heading}>{block.title}</Text>{block.text && <Text style={s.body}>{block.text}</Text>}{block.bullets?.map(item => <View key={item} style={s.bullet}><Text style={s.dot}>•</Text><Text style={[s.body, { flex: 1 }]}>{item}</Text></View>)}</View></View>)}
      {section.table && <View style={s.table}><View style={[s.row, { backgroundColor: palette.green }]}>{section.table.headers.map(h => <Text key={h} style={[s.cell, { color: palette.white, fontWeight: 700 }]}>{h}</Text>)}</View>{section.table.rows.map(row => <View key={row[0]} style={s.row} wrap={false}>{row.map((cell, i) => <Text key={i} style={[s.cell, i === 0 ? { fontWeight: 700, color: palette.green } : {}]}>{cell}</Text>)}</View>)}</View>}
      {section.note && <Text style={s.note}>{section.note}</Text>}{footer}
    </Page>)}
  </Document>;
}

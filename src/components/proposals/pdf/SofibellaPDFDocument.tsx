import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';
import { sofibellaContent as content, type SofibellaSection } from '../data/sofibellaContent';
import { supremeHerbalsTheme as theme } from './supremeHerbalsTheme';

Font.registerHyphenationCallback(word => [word]);
const s = StyleSheet.create({
  page: { padding: 50, paddingBottom: 60, fontFamily: 'Helvetica', backgroundColor: theme.paper },
  accent: { width: 34, height: 3, backgroundColor: theme.lime, marginBottom: 14 },
  eyebrow: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: theme.lime, marginBottom: 8, letterSpacing: 0 },
  title: { fontSize: 26, fontFamily: 'Helvetica-Bold', color: theme.green, lineHeight: 1.12 },
  lead: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', color: theme.green, lineHeight: 1.4, marginTop: 8, marginBottom: 18 },
  body: { fontSize: 9.5, color: theme.ink, lineHeight: 1.65 },
  itemTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: theme.green, marginBottom: 5 },
  itemBody: { fontSize: 9, color: theme.ink, lineHeight: 1.55 },
  card: { backgroundColor: theme.surface, borderRadius: 8, padding: 13, marginBottom: 9 },
  note: { fontSize: 8.5, color: theme.ink, lineHeight: 1.6, borderLeftWidth: 2, borderLeftColor: theme.lime, paddingLeft: 12, marginTop: 14 },
  footer: { position: 'absolute', bottom: 24, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 7, color: theme.muted },
  coverPanel: { flex: 1, backgroundColor: theme.green, paddingHorizontal: 50, justifyContent: 'center' },
  coverTitle: { fontSize: 38, fontFamily: 'Helvetica-Bold', color: theme.paper, lineHeight: 1.15 },
});
function Footer() {
  return <View style={s.footer} fixed><Text style={s.footerText}>HIPERVÍNCULO</Text><Text style={s.footerText} render={({ pageNumber }) => `${String(pageNumber).padStart(2, '0')} · hipervinculo.net`} /></View>;
}
function Head({ eyebrow, title, headline }: { eyebrow: string; title: string; headline: string }) {
  return <View><View style={s.accent} /><Text style={s.eyebrow}>{eyebrow}</Text><Text style={s.title}>{title}</Text><Text style={s.lead}>{headline}</Text></View>;
}
function Options() {
  return <View style={{ flexDirection: 'row', gap: 12 }}>{content.options.map(o => { const inv = o.recommended; const fg = inv ? theme.paper : theme.green; const sub = inv ? theme.inverseMuted : theme.ink; return <View key={o.name} wrap={false} style={{ flex: 1, backgroundColor: inv ? theme.green : theme.surface, borderRadius: 8, padding: 16 }}>
    <Text style={{ ...s.eyebrow, marginBottom: 6 }}>{o.label}</Text><Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: fg, marginBottom: 10, lineHeight: 1.3 }}>{o.name}</Text>
    <Text style={{ fontSize: inv ? 15 : 22, fontFamily: 'Helvetica-Bold', color: fg, lineHeight: 1.25 }}>{o.price}</Text><Text style={{ fontSize: 8, color: sub, marginTop: 4, marginBottom: 12 }}>{o.cadence}</Text>
    {o.includes.map(i => <Text key={i} style={{ fontSize: 8.3, color: sub, lineHeight: 1.45, paddingVertical: 4, borderBottomWidth: 0.5, borderBottomColor: inv ? theme.rule : theme.rule }}>• {i}</Text>)}
    <Text style={{ fontSize: 7.8, color: sub, lineHeight: 1.5, marginTop: 10 }}>{o.excludes}</Text></View>; })}</View>;
}
function Items({ section }: { section: SofibellaSection }) {
  if (section.layout === 'table') return <View>
    <View style={{ backgroundColor: theme.green, padding: 11, flexDirection: 'row' }}><Text style={{ width: '31%', color: theme.paper, fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{section.columns?.[0] ?? 'AREA'}</Text><Text style={{ flex: 1, color: theme.paper, fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{section.columns?.[1] ?? 'DETAILS'}</Text></View>
    {section.items.map(item => <View key={item.title} wrap={false} style={{ flexDirection: 'row', gap: 14, paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 0.5, borderBottomColor: theme.rule }}><Text style={{ ...s.itemTitle, width: '28%', fontSize: 10 }}>{item.title}</Text><Text style={{ ...s.itemBody, flex: 1 }}>{item.description}</Text></View>)}
  </View>;
  return <View>{section.items.map((item, index) => <View key={item.title} wrap={false} style={section.layout === 'terms' ? { paddingVertical: 13, borderBottomWidth: 0.5, borderBottomColor: theme.rule } : s.card}>
    {section.layout === 'steps' && <Text style={{ ...s.eyebrow, marginBottom: 6 }}>{String(index + 1).padStart(2, '0')}</Text>}
    <Text style={s.itemTitle}>{item.title}</Text><Text style={s.itemBody}>{item.description}</Text>
  </View>)}</View>;
}
export function SofibellaPDFDocument({ logoBase64 }: { logoBase64: string }) {
  return <Document title="Sofibella Wear Proposal — Hipervínculo" author="Hipervínculo" language="en-US">
    <Page size="A4" style={{ fontFamily: 'Helvetica', backgroundColor: theme.paper }}>
      <View style={{ paddingHorizontal: 50, paddingTop: 46, paddingBottom: 30 }}><Image src={logoBase64} style={{ height: 30, objectFit: 'contain', objectPositionX: 'left' }} /></View>
      <View style={s.coverPanel}><Text style={{ ...s.eyebrow, marginBottom: 24 }}>{content.cover.eyebrow}</Text><Text style={s.coverTitle}>{content.cover.title}</Text><Text style={{ fontSize: 22, color: theme.paper, fontFamily: 'Helvetica-Bold', marginTop: 24 }}>{content.cover.client}</Text><Text style={{ fontSize: 12, color: theme.inverseMuted, marginTop: 10 }}>{content.cover.recipient}</Text><View style={{ ...s.accent, marginTop: 26, marginBottom: 22 }} /><Text style={{ fontSize: 11.5, color: theme.inverseMuted, lineHeight: 1.7, maxWidth: 360 }}>{content.cover.tagline}</Text></View>
      <View style={{ paddingHorizontal: 50, paddingVertical: 24, flexDirection: 'row', justifyContent: 'space-between' }}><Text style={s.footerText}>CONFIDENTIAL</Text><Text style={s.footerText}>hipervinculo.net</Text></View>
    </Page>
    <Page size="A4" style={s.page}><Head eyebrow="ABOUT US" title={content.about.title} headline={content.about.headline} /><Text style={{ ...s.body, marginBottom: 28 }}>{content.about.description}</Text>
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 30 }}>{content.about.stats.map(stat => <View key={stat.value} style={{ flex: 1, backgroundColor: theme.surface, padding: 14, paddingVertical: 24, borderRadius: 8 }}><Text style={{ fontSize: 30, color: theme.green, fontFamily: 'Helvetica-Bold' }}>{stat.value}</Text><View style={{ ...s.accent, width: 18, height: 2, marginTop: 12, marginBottom: 10 }} /><Text style={{ ...s.itemBody, fontSize: 8 }}>{stat.label}</Text></View>)}</View>
      <Text style={s.eyebrow}>CAPABILITIES</Text>{content.about.capabilities.map(item => <Text key={item} style={{ ...s.body, marginBottom: 12 }}>• {item}</Text>)}<Footer />
    </Page>
    {content.sections.map(section => <Page key={section.title} size="A4" style={s.page}>
      <Head eyebrow={section.eyebrow} title={section.title} headline={section.headline} />
      {section.intro && <Text style={{ ...s.body, marginBottom: 20 }}>{section.intro}</Text>}
      <Items section={section} />{section.layout === 'options' && <Options />}{section.note && <Text style={s.note}>{section.note}</Text>}<Footer />
    </Page>)}
    <Page size="A4" style={{ fontFamily: 'Helvetica', backgroundColor: theme.paper }}>
      <View style={{ paddingHorizontal: 50, paddingTop: 46, paddingBottom: 30 }}><Image src={logoBase64} style={{ height: 30, objectFit: 'contain', objectPositionX: 'left' }} /></View>
      <View style={s.coverPanel}><Text style={s.eyebrow}>LET’S TALK</Text><Text style={{ ...s.coverTitle, marginTop: 16 }}>{content.contact.title}</Text><Text style={{ fontSize: 11.5, color: theme.inverseMuted, marginTop: 20, lineHeight: 1.7 }}>{content.contact.subtitle}</Text><View style={{ ...s.accent, marginTop: 30 }} />{[content.contact.name, content.contact.email, content.contact.phone, content.contact.website, content.contact.address].map(text => <Text key={text} style={{ fontSize: 11, color: theme.paper, lineHeight: 1.7, marginBottom: 9 }}>{text}</Text>)}</View>
      <View style={{ padding: 24 }}><Text style={{ ...s.footerText, textAlign: 'center' }}>CONFIDENTIAL · HIPERVÍNCULO</Text></View>
    </Page>
  </Document>;
}
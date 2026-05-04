import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Circle } from '@react-pdf/renderer';
import { doorDistrictProposalContent } from '../data/doorDistrictProposalContent';

const green = '#2d4a2d';
const lime = '#8BC34A';
const bg = '#f8f9f5';
const gray = '#666666';
const grayLight = '#999999';

const s = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  pageBg: { padding: 40, backgroundColor: bg, fontFamily: 'Helvetica' },
  accent: { width: 40, height: 3, backgroundColor: lime, marginBottom: 16 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 7, color: '#999' },
});

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M22 4L12 14.01l-3-3" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const FileIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const CalendarIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const DollarIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const ClockIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M12 6v6l4 2" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const MailIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M22 6l-10 7L2 6" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const PhoneIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);
const GlobeIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);
const MapPinIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke={lime} strokeWidth="2" />
    <Circle cx="12" cy="10" r="3" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  files: FileIcon, calendar: CalendarIcon, dollar: DollarIcon, clock: ClockIcon,
};

interface Props { logoBase64: string }

export function DoorDistrictPDFDocument({ logoBase64 }: Props) {
  const c = doorDistrictProposalContent;
  const u = c.ui;

  return (
    <Document>
      {/* PAGE 1: Cover */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ padding: 40, paddingBottom: 20, flexDirection: 'row' }}>
          <Image src={logoBase64} style={{ height: 30, objectFit: 'contain' }} />
        </View>
        <View style={{ flex: 1, backgroundColor: green, padding: 40, justifyContent: 'center' }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 14 }}>{c.cover.title.toUpperCase()}</Text>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 10, lineHeight: 1.15 }}>{c.cover.subtitle}</Text>
          <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>{c.cover.tagline}</Text>
          <View style={{ width: 50, height: 3, backgroundColor: lime }} />
        </View>
        <View style={{ padding: '16 40', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 8, color: grayLight, letterSpacing: 2 }}>{u.confidential.toUpperCase()}</Text>
          <Text style={{ fontSize: 8, color: grayLight }}>hipervinculo.net</Text>
        </View>
      </Page>

      {/* PAGE 2: About */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>{u.aboutUs.toUpperCase()}</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{c.about.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{c.about.headline}</Text>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 24 }}>{c.about.description}</Text>
        <View style={{ flexDirection: 'row', gap: 14, marginBottom: 24 }}>
          {c.about.stats.map((stat, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: bg, borderRadius: 12, paddingVertical: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: lime, marginBottom: 4 }}>{stat.value}</Text>
              <Text style={{ fontSize: 8, color: gray }}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {c.about.credentials.map((cred, i) => (
            <Text key={i} style={{ fontSize: 9, color: green, backgroundColor: 'rgba(139,195,74,0.1)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 }}>{cred}</Text>
          ))}
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 3: Objective */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>{u.scopeOfWork.toUpperCase()}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: green, marginBottom: 4 }}>{c.objective.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{c.objective.headline}</Text>
        <Text style={{ fontSize: 9.5, color: gray, lineHeight: 1.55, marginBottom: 12 }}>{c.objective.description}</Text>
        {c.objective.scope.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 9, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 4: Tech / SEO */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>{u.technical.toUpperCase()}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: green, marginBottom: 4 }}>{c.techStack.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 10 }}>{c.techStack.headline}</Text>
        <Text style={{ fontSize: 9, color: gray, lineHeight: 1.55, marginBottom: 10 }}>{c.techStack.description}</Text>
        {c.techStack.items.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 8, padding: 8, marginBottom: 4, flexDirection: 'row', gap: 8 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={11} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: green, marginBottom: 1 }}>{item.title}</Text>
              <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 5: Investment */}
      <Page size="A4" style={s.pageBg}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>{u.investment.toUpperCase()}</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{c.investment.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{c.investment.headline}</Text>

        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 18, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>{c.investment.priceLabel.toUpperCase()}</Text>
            <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>100% upfront · Square</Text>
          </View>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>{c.investment.price}</Text>
        </View>

        <Text style={{ fontSize: 9, color: gray, lineHeight: 1.55, marginBottom: 12 }}>{c.investment.description}</Text>

        <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 8 }}>{u.totalInvestment} — Desglose</Text>
          {c.investment.items.map((item, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, paddingBottom: 5, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' }}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={{ fontSize: 9, color: '#374151', fontWeight: 'medium' }}>{item.name}</Text>
                <Text style={{ fontSize: 7, color: grayLight, marginTop: 2 }}>{item.detail}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <CheckIcon size={10} />
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: lime }}>Incluido</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Timeline */}
        <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ flex: 1, paddingRight: 16 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 4 }}>{c.investment.timeline.title}</Text>
            <Text style={{ fontSize: 8, color: gray, lineHeight: 1.5 }}>{c.investment.timeline.description}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: lime, lineHeight: 1 }}>{c.investment.timeline.duration}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: lime }}>{c.investment.timeline.durationUnit}</Text>
          </View>
        </View>

        {/* Exclusions */}
        <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 14 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 6 }}>{u.outOfScope}</Text>
          {c.exclusions.items.map((it, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 6, marginBottom: 3 }}>
              <Text style={{ fontSize: 8, color: gray }}>•</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.45, flex: 1 }}>{it}</Text>
            </View>
          ))}
        </View>

        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 6: Terms */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>{u.terms.toUpperCase()}</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{c.terms.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{c.terms.headline}</Text>
        {c.terms.sections.map((section, i) => {
          const Icon = iconMap[section.icon] || FileIcon;
          return (
            <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 9, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
              <View style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: 'rgba(139,195,74,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={12} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: green, marginBottom: 2 }}>{section.title}</Text>
                <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.45 }}>{section.description}</Text>
              </View>
            </View>
          );
        })}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 7: Signature */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>{u.signatures.toUpperCase()}</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{c.signature.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{c.signature.headline}</Text>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 40 }}>{c.signature.intro}</Text>
        <View style={{ flexDirection: 'row', gap: 30 }}>
          {[c.signature.client, c.signature.agency].map((sig, i) => (
            <View key={i} style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 2, marginBottom: 8 }}>{sig.role.toUpperCase()}</Text>
              <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#cccccc', height: 50, marginBottom: 6 }} />
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: green }}>{sig.name}</Text>
              <Text style={{ fontSize: 9, color: gray }}>{sig.company}</Text>
              <View style={{ marginTop: 24 }}>
                <Text style={{ fontSize: 8, color: grayLight, letterSpacing: 1.5, marginBottom: 4 }}>{u.date.toUpperCase()}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#cccccc', height: 18 }} />
              </View>
            </View>
          ))}
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 8: Contact */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ backgroundColor: green, padding: 40, flex: 1 }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 8 }}>{u.contactUs.toUpperCase()}</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 6 }}>{c.contact.title}</Text>
          <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.5 }}>{c.contact.description}</Text>
          <View style={{ flexDirection: 'row', gap: 40 }}>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}><MailIcon size={16} /><Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>{u.email}</Text></View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{c.contact.email}</Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}><PhoneIcon size={16} /><Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>{u.phone}</Text></View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{c.contact.phone}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}><MapPinIcon size={16} /><Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>{u.location}</Text></View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{c.contact.address}</Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}><GlobeIcon size={16} /><Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>{u.web}</Text></View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{c.contact.website}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: 'white', paddingVertical: 30, alignItems: 'center' }}>
          <View style={{ width: 150, height: 32, marginBottom: 10 }}>
            <Image src={logoBase64} style={{ objectFit: 'contain' }} />
          </View>
          <View style={{ width: 30, height: 2, backgroundColor: lime, marginBottom: 10 }} />
          <Text style={{ fontSize: 9, color: grayLight, textAlign: 'center' }}>{u.tagline}</Text>
        </View>
      </Page>
    </Document>
  );
}

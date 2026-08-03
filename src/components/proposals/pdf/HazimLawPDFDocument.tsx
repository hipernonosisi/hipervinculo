import { Document, Page, View, Text, Image, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import { hazimLawProposalContent } from '../data/hazimLawProposalContent';

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
    <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M12 6v6l4 2" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const ShieldIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M9 12l2 2 4-4" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const LockIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const MonitorIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20 3H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2zM8 21h8M12 17v4" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
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
    <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);
const MapPinIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M12 10a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);
const CodeIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M16 18l6-6-6-6M8 6l-6 6 6 6" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  files: FileIcon,
  refresh: FileIcon,
  server: FileIcon,
  calendar: CalendarIcon,
  dollar: DollarIcon,
  clock: ClockIcon,
  shield: ShieldIcon,
};

interface Props {
  logoBase64: string;
}

export function HazimLawPDFDocument({ logoBase64 }: Props) {
  const content = hazimLawProposalContent;

  return (
    <Document>
      {/* PAGE 1: Cover */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ padding: 40, paddingBottom: 20, flexDirection: 'row' }}>
          <Image src={logoBase64} style={{ height: 30, objectFit: 'contain', objectPositionX: 'left' }} />
        </View>
        <View style={{ flex: 1, backgroundColor: green, padding: 40, justifyContent: 'center' }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 14 }}>
            {content.cover.title.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 10, lineHeight: 1.15 }}>
            {content.cover.subtitle}
          </Text>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
            {content.cover.tagline}
          </Text>
          <View style={{ width: 50, height: 3, backgroundColor: lime }} />
        </View>
        <View style={{ padding: '16 40', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 8, color: grayLight, letterSpacing: 2 }}>CONFIDENTIAL</Text>
          <Text style={{ fontSize: 8, color: grayLight }}>hipervinculo.net</Text>
        </View>
      </Page>

      {/* PAGE 2: About */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>ABOUT US</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.about.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.about.headline}</Text>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 24 }}>{content.about.description}</Text>
        <View style={{ flexDirection: 'row', gap: 14, marginBottom: 24 }}>
          {content.about.stats.map((stat, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: bg, borderRadius: 12, paddingVertical: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: lime, marginBottom: 4 }}>{stat.value}</Text>
              <Text style={{ fontSize: 8, color: gray }}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {content.about.credentials.map((cred, i) => (
            <Text key={i} style={{ fontSize: 9, color: green, backgroundColor: 'rgba(139,195,74,0.1)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 }}>
              {cred}
            </Text>
          ))}
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 3: Client Overview */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>THE CLIENT</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.clientOverview.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.clientOverview.headline}</Text>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 14 }}>{content.clientOverview.description}</Text>
        {content.clientOverview.services.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 12, marginBottom: 6, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><ShieldIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <View style={{ backgroundColor: 'rgba(139,195,74,0.08)', borderRadius: 10, padding: 12, marginTop: 8 }}>
          <Text style={{ fontSize: 8, color: gray, lineHeight: 1.5 }}>{content.clientOverview.marketNote}</Text>
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 4: Objective */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SCOPE OF WORK</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.objective.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.objective.headline}</Text>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 14 }}>{content.objective.description}</Text>
        {content.objective.scope.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 12, marginBottom: 6, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <View style={{ backgroundColor: 'rgba(255,193,7,0.06)', borderRadius: 10, padding: 12, marginTop: 8, borderWidth: 0.5, borderColor: 'rgba(255,193,7,0.3)' }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{content.objective.exclusions.title}</Text>
          <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{content.objective.exclusions.description}</Text>
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 5: Platform Access */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>REQUIREMENTS</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.platformAccess.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.platformAccess.headline}</Text>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 16 }}>{content.platformAccess.description}</Text>
        {content.platformAccess.platforms.map((platform, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 12, marginBottom: 6, flexDirection: 'row', gap: 12 }}>
            <View style={{ width: 24, height: 24, borderRadius: 8, backgroundColor: 'rgba(139,195,74,0.15)', alignItems: 'center', justifyContent: 'center' }}>
              <LockIcon size={12} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{platform.title}</Text>
                <View style={{ backgroundColor: 'rgba(139,195,74,0.15)', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
                  <Text style={{ fontSize: 7, fontWeight: 'bold', color: green }}>{platform.role}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{platform.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 6: Website Build */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.websiteService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.websiteService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 16, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>ONE-TIME FIXED FEE</Text>
            <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>$2,500 — invoiced 50% at kickoff, 50% at launch</Text>
          </View>
          <MonitorIcon size={22} />
        </View>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 12 }}>{content.websiteService.description}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {content.websiteService.includes.map((item, i) => (
            <View key={i} style={{ width: '48%', backgroundColor: bg, borderRadius: 10, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
              <View style={{ paddingTop: 1 }}><CodeIcon size={12} /></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
                <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 7: Google Ads Management */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.googleAdsService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.googleAdsService.headline}</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 14 }}>
          <View style={{ flex: 1, backgroundColor: green, borderRadius: 14, padding: 16 }}>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, marginBottom: 4 }}>
              {content.googleAdsService.retainerLabel.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#c5e86a' }}>{content.googleAdsService.retainer}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: bg, borderRadius: 14, padding: 16, borderWidth: 0.5, borderColor: 'rgba(139,195,74,0.4)' }}>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: grayLight, letterSpacing: 1.5, marginBottom: 4 }}>
              {content.googleAdsService.mediaSpendLabel.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: green }}>{content.googleAdsService.mediaSpend}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 12 }}>{content.googleAdsService.description}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {content.googleAdsService.includes.map((item, i) => (
            <View key={i} style={{ width: '48%', backgroundColor: bg, borderRadius: 10, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
              <View style={{ paddingTop: 1 }}><CheckIcon size={12} /></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
                <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 8: Investment Summary */}

      <Page size="A4" style={{ ...s.pageBg, padding: 36 }}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>INVESTMENT</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.investment.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 6 }}>{content.investment.headline}</Text>

        {/* Fee card */}
        <View style={{ backgroundColor: green, borderRadius: 14, padding: 18, marginBottom: 14, position: 'relative' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
            <View style={{ width: 12, height: 1, backgroundColor: '#c5e86a' }} />
            <Text style={{ fontSize: 6.5, fontWeight: 'bold', color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase' }}>One-Time</Text>
          </View>
          <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#ffffff', letterSpacing: 1, marginBottom: 14, textTransform: 'uppercase', minHeight: 22 }}>
            {content.investment.websiteBuild.label}
          </Text>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#c5e86a', marginBottom: 6, letterSpacing: -0.3 }}>
            {content.investment.websiteBuild.rate}
          </Text>
          <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.75)', marginBottom: 12, lineHeight: 1.4 }}>
            {content.investment.websiteBuild.basis}
          </Text>
          <View style={{ height: 0.5, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 10 }} />
          <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>
            {content.investment.websiteBuild.description}
          </Text>
        </View>

        {/* Payment terms */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 18, marginBottom: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 10 }}>{content.investment.paymentTerms.title}</Text>
          {content.investment.paymentTerms.rows.map((row, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontSize: 8, color: gray }}>{row.label}</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: green }}>{row.value}</Text>
            </View>
          ))}
          <Text style={{ fontSize: 7, color: grayLight, marginTop: 8, lineHeight: 1.4 }}>{content.investment.paymentTerms.note}</Text>
        </View>

        {/* Client pays */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 18, marginBottom: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 10 }}>{content.investment.clientPays.title}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {content.investment.clientPays.items.map((item, i) => (
              <View key={i} style={{ width: '50%', flexDirection: 'row', gap: 8, marginBottom: 8, paddingRight: 6 }}>
                <View style={{ paddingTop: 1 }}><MonitorIcon size={10} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#374151', marginBottom: 1 }}>{item.name}</Text>
                  <Text style={{ fontSize: 7, color: grayLight }}>{item.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Timeline */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 2 }}>{content.investment.timeline.title}</Text>
            <Text style={{ fontSize: 7, color: gray, lineHeight: 1.4 }}>{content.investment.timeline.description}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: lime }}>{content.investment.timeline.duration}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: lime }}>{content.investment.timeline.durationUnit}</Text>
          </View>
        </View>

        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 8: Terms & Conditions */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>LEGAL</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.terms.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.terms.headline}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {content.terms.sections.map((section, i) => {
            const Icon = iconMap[section.icon] || CheckIcon;
            return (
              <View key={i} style={{ width: '48%', backgroundColor: bg, borderRadius: 10, padding: 12, marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <View style={{ width: 24, height: 24, borderRadius: 8, backgroundColor: 'rgba(139,195,74,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={12} />
                  </View>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{section.title}</Text>
                </View>
                <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{section.description}</Text>
              </View>
            );
          })}
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 9: Legal Details */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>AGREEMENT</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 14 }}>{content.legalTerms.title}</Text>
        {content.legalTerms.sections.map((section, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 12, marginBottom: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 4 }}>{section.heading}</Text>
            {section.items.map((item, j) => (
              <View key={j} style={{ flexDirection: 'row', gap: 6, marginBottom: 2 }}>
                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: lime, marginTop: 3 }} />
                <Text style={{ flex: 1, fontSize: 8, color: gray, lineHeight: 1.4 }}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 10: Contact */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: green, padding: 40, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>{content.contact.title}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.contact.headline}</Text>
            <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 20, maxWidth: 340 }}>
              {content.contact.description}
            </Text>

            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: 'rgba(139,195,74,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                  <MailIcon size={12} />
                </View>
                <View>
                  <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>Email</Text>
                  <Text style={{ fontSize: 9, color: 'white', fontWeight: 'medium' }}>{content.contact.email}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: 'rgba(139,195,74,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                  <PhoneIcon size={12} />
                </View>
                <View>
                  <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>Phone</Text>
                  <Text style={{ fontSize: 9, color: 'white', fontWeight: 'medium' }}>{content.contact.phone}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: 'rgba(139,195,74,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPinIcon size={12} />
                </View>
                <View>
                  <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>Address</Text>
                  <Text style={{ fontSize: 9, color: 'white', fontWeight: 'medium', maxWidth: 200 }}>{content.contact.address}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: 'rgba(139,195,74,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                  <GlobeIcon size={12} />
                </View>
                <View>
                  <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>Website</Text>
                  <Text style={{ fontSize: 9, color: 'white', fontWeight: 'medium' }}>{content.contact.website}</Text>
                </View>
              </View>
            </View>

            <View style={{ backgroundColor: lime, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: green }}>{content.contact.cta}</Text>
            </View>
          </View>

          <View style={{ width: '35%', backgroundColor: 'white', padding: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Image src={logoBase64} style={{ height: 40, objectFit: 'contain', marginBottom: 16 }} />
            <View style={{ width: 40, height: 2, backgroundColor: lime, marginBottom: 16 }} />
            <Text style={{ fontSize: 8, color: gray, textAlign: 'center', lineHeight: 1.5, maxWidth: 140 }}>
              Clean, modern websites that build trust and convert visitors into consultations.
            </Text>
          </View>
        </View>
      </Page>

    </Document>
  );
}

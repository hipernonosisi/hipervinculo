import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Circle } from '@react-pdf/renderer';
import { scottsdaleInstituteContent } from '../data/scottsdaleInstituteContent';

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
const BarChartIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 20V10M18 20V4M6 20v-4" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const LockIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const MonitorIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20 3H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2zM8 21h8M12 17v4" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const ShieldIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke={lime} strokeWidth="2" />
    <Path d="M9 12l2 2 4-4" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const StethoscopeIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M6 2v6a4 4 0 008 0V2M4.22 4.22l1.42 1.42M18.36 5.64l1.42-1.42M18 14a4 4 0 01-8 0" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="18" cy="18" r="3" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);
const SparkleIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17l-1.9-5.1L4.5 10l5.6-1.4L12 3z" fill="none" stroke={lime} strokeWidth="2" strokeLinejoin="round" />
  </Svg>
);

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  files: FileIcon,
  calendar: CalendarIcon,
  dollar: DollarIcon,
  clock: ClockIcon,
  shield: ShieldIcon,
};

interface Props {
  logoBase64: string;
}

export function ScottsdaleInstitutePDFDocument({ logoBase64 }: Props) {
  const content = scottsdaleInstituteContent;

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
            <View style={{ paddingTop: 1 }}><StethoscopeIcon size={12} /></View>
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

      {/* PAGE 6: Website */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE 1</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.websiteService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.websiteService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 16, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>INCLUDED IN MONTHLY FEE</Text>
            <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>No separate one-time development charge</Text>
          </View>
          <MonitorIcon size={22} />
        </View>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 12 }}>{content.websiteService.description}</Text>
        {content.websiteService.includes.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><SparkleIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 7: Google Ads */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE 2</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.googleAdsService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.googleAdsService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 16, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>INCLUDED IN MONTHLY FEE</Text>
            <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Google Ads budget paid directly by clinic</Text>
          </View>
          <BarChartIcon size={22} />
        </View>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 12 }}>{content.googleAdsService.description}</Text>
        {content.googleAdsService.includes.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 8: Meta Ads */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE 3</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.metaAdsService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.metaAdsService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 16, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>INCLUDED IN MONTHLY FEE</Text>
            <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Meta Ads budget paid directly by clinic</Text>
          </View>
          <BarChartIcon size={22} />
        </View>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 12 }}>{content.metaAdsService.description}</Text>
        {content.metaAdsService.includes.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 9: Investment Summary */}
      <Page size="A4" style={{ ...s.pageBg, padding: 36 }}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>INVESTMENT</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.investment.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 6 }}>{content.investment.headline}</Text>
        <Text style={{ fontSize: 9, color: gray, lineHeight: 1.5, marginBottom: 20 }}>{content.investment.ongoing.subtitle}</Text>

        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
          {[
            { ...content.investment.ongoing.websiteBuild, cadence: 'One-time', featured: false },
            { ...content.investment.ongoing.performance, cadence: 'Success-based', featured: true },
          ].map((card, i) => {
            const dark = card.featured;
            const cardBg = dark ? green : '#ffffff';
            const borderColor = dark ? green : '#e6e8df';
            const eyebrow = dark ? 'rgba(255,255,255,0.6)' : '#9aa39a';
            const labelC = dark ? '#ffffff' : green;
            const priceC = dark ? '#c5e86a' : green;
            const basisC = dark ? 'rgba(255,255,255,0.75)' : '#6b7268';
            const bodyC = dark ? 'rgba(255,255,255,0.82)' : '#5a635a';
            const ruleC = dark ? 'rgba(255,255,255,0.2)' : '#eceee6';
            const chipBg = dark ? 'rgba(197,232,106,0.15)' : '#f4f6ef';
            const chipTx = dark ? '#c5e86a' : green;
            const numC = dark ? 'rgba(255,255,255,0.12)' : 'rgba(45,74,45,0.07)';
            const accentC = dark ? '#c5e86a' : lime;
            return (
              <View key={i} style={{ flex: 1, backgroundColor: cardBg, borderRadius: 14, padding: 14, borderWidth: 0.5, borderColor: borderColor, position: 'relative', minHeight: 210 }}>
                {/* Index watermark */}
                <Text style={{ position: 'absolute', top: 8, right: 12, fontSize: 28, fontWeight: 'bold', color: numC, letterSpacing: -1 }}>
                  {String(i + 1).padStart(2, '0')}
                </Text>
                {/* Eyebrow */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                  <View style={{ width: 12, height: 1, backgroundColor: accentC }} />
                  <Text style={{ fontSize: 6.5, fontWeight: 'bold', color: eyebrow, letterSpacing: 1.5, textTransform: 'uppercase' }}>{card.cadence}</Text>
                </View>
                {/* Label */}
                <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: labelC, letterSpacing: 1, marginBottom: 14, textTransform: 'uppercase', minHeight: 22 }}>{card.label}</Text>
                {/* Price */}
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: priceC, marginBottom: 6, letterSpacing: -0.3 }}>{card.rate}</Text>
                <Text style={{ fontSize: 7, color: basisC, marginBottom: 12, lineHeight: 1.4 }}>{card.basis}</Text>
                {/* Rule */}
                <View style={{ height: 0.5, backgroundColor: ruleC, marginBottom: 10 }} />
                {/* Description */}
                <Text style={{ fontSize: 7, color: bodyC, lineHeight: 1.5, marginBottom: 12 }}>{card.description}</Text>
                {/* Chip */}
                <View style={{ alignSelf: 'flex-start', backgroundColor: chipBg, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8 }}>
                  <Text style={{ fontSize: 6, fontWeight: 'bold', color: chipTx, letterSpacing: 1.2, textTransform: 'uppercase' }}>{card.cadence}</Text>
                </View>
              </View>
            );
          })}
        </View>



        {/* Client Pays */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 18, marginBottom: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 10 }}>{content.investment.ongoing.clientPays.title}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {content.investment.ongoing.clientPays.items.map((item, i) => (
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

        {/* Example */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 2 }}>{content.investment.example.title}</Text>
          <Text style={{ fontSize: 7, color: grayLight, marginBottom: 10 }}>{content.investment.example.subtitle}</Text>
          {content.investment.example.rows.map((row, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontSize: 8, color: gray }}>{row.label}</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: green }}>{row.value}</Text>
            </View>
          ))}
          <View style={{ borderTopWidth: 0.5, borderTopColor: '#e5e7eb', marginTop: 4, paddingTop: 6, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{content.investment.example.netSales.label}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: lime }}>{content.investment.example.netSales.value}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{content.investment.example.commission.label}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: green }}>{content.investment.example.commission.value}</Text>
          </View>
          <Text style={{ fontSize: 6.5, color: grayLight, lineHeight: 1.5 }}>{content.investment.example.note}</Text>
        </View>

        {/* Timeline */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, paddingRight: 16 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.investment.timeline.title}</Text>
            <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.5 }}>{content.investment.timeline.description}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: lime, lineHeight: 1 }}>{content.investment.timeline.duration}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: lime }}>{content.investment.timeline.durationUnit}</Text>
          </View>
        </View>

        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 9b: Media Budget Plan */}
      <Page size="A4" style={{ ...s.page, padding: 50 }}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>MEDIA BUDGET</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.investment.mediaBudget.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 10 }}>{content.investment.mediaBudget.subtitle}</Text>
        <Text style={{ fontSize: 9, color: gray, lineHeight: 1.6, marginBottom: 14 }}>{content.investment.mediaBudget.description}</Text>

        {/* Split banner */}
        <View style={{ backgroundColor: green, borderRadius: 12, padding: 14, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#c5e86a', letterSpacing: 1.5 }}>CHANNEL SPLIT</Text>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#ffffff', marginTop: 2 }}>{content.investment.mediaBudget.splitLabel}</Text>
          </View>
        </View>

        {/* Tiers */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
          {content.investment.mediaBudget.tiers.map((tier, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: '#e6e8df', position: 'relative', minHeight: 180 }}>
              <Text style={{ position: 'absolute', top: 6, right: 10, fontSize: 24, fontWeight: 'bold', color: 'rgba(45,74,45,0.07)', letterSpacing: -1 }}>
                {String(i + 1).padStart(2, '0')}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                <View style={{ width: 10, height: 1, backgroundColor: lime }} />
                <Text style={{ fontSize: 6.5, fontWeight: 'bold', color: '#9aa39a', letterSpacing: 1.5 }}>TIER {i + 1}</Text>
              </View>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: green, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>{tier.months}</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: green, letterSpacing: -0.3 }}>{tier.monthly}</Text>
              <Text style={{ fontSize: 7, color: '#6b7268', marginBottom: 8 }}>per month</Text>
              <View style={{ height: 0.5, backgroundColor: '#eceee6', marginBottom: 6 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                <Text style={{ fontSize: 7.5, color: gray }}>Google Ads</Text>
                <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: green }}>{tier.google}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 7.5, color: gray }}>Meta Ads</Text>
                <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: green }}>{tier.meta}</Text>
              </View>
              <Text style={{ fontSize: 6.8, color: '#5a635a', lineHeight: 1.5 }}>{tier.note}</Text>
            </View>
          ))}
        </View>

        <Text style={{ fontSize: 7.5, color: grayLight, lineHeight: 1.6, marginBottom: 10 }}>{content.investment.mediaBudget.splitNote}</Text>

        {/* Total */}
        <View style={{ backgroundColor: '#f4f6ef', borderRadius: 12, padding: 16, borderWidth: 0.5, borderColor: '#e6e8df', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: lime, letterSpacing: 1.5, marginBottom: 3 }}>6-MONTH PILOT TOTAL</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{content.investment.mediaBudget.totalLabel}</Text>
            <Text style={{ fontSize: 7, color: grayLight, marginTop: 3, lineHeight: 1.4 }}>{content.investment.mediaBudget.totalNote}</Text>
          </View>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: green, letterSpacing: -0.4 }}>{content.investment.mediaBudget.totalValue}</Text>
        </View>

        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 9c: Projections */}
      <Page size="A4" style={{ ...s.pageBg, padding: 40 }}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>PROJECTIONS</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.investment.projections.title}</Text>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: lime, marginBottom: 8 }}>{content.investment.projections.subtitle}</Text>
        <Text style={{ fontSize: 8.5, color: gray, lineHeight: 1.5, marginBottom: 10 }}>{content.investment.projections.description}</Text>

        {/* Assumptions */}
        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, marginBottom: 10, borderWidth: 0.5, borderColor: '#e6e8df', flexDirection: 'row' }}>
          {content.investment.projections.assumptions.items.map((a, i) => (
            <View key={i} style={{ flex: 1, paddingHorizontal: 4 }}>
              <Text style={{ fontSize: 6.5, fontWeight: 'bold', color: '#9aa39a', letterSpacing: 1.2, marginBottom: 2 }}>{a.label.toUpperCase()}</Text>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{a.value}</Text>
            </View>
          ))}
        </View>

        {/* Scenarios */}
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
          {content.investment.projections.scenarios.map((sc, i) => {
            const dark = sc.featured;
            const cardBg = dark ? green : '#ffffff';
            const labelC = dark ? '#ffffff' : green;
            const eyebrowC = dark ? '#c5e86a' : '#9aa39a';
            const priceC = dark ? '#c5e86a' : green;
            const rowLabelC = dark ? 'rgba(255,255,255,0.65)' : '#6b7268';
            const rowValC = dark ? '#ffffff' : green;
            const ruleC = dark ? 'rgba(255,255,255,0.2)' : '#eceee6';
            const bodyC = dark ? 'rgba(255,255,255,0.82)' : '#5a635a';
            const accentC = dark ? '#c5e86a' : lime;
            const highlightC = dark ? '#c5e86a' : lime;
            const rows = [
              { l: 'Cost per Lead', v: sc.costPerLead },
              { l: 'Qualified Leads', v: sc.qualifiedLeads },
              { l: 'Booked Consults', v: sc.bookedConsults },
              { l: 'Closed Treatments', v: sc.closedTreatments },
              { l: 'Avg. Ticket', v: sc.avgTicket },
            ];
            return (
              <View key={i} style={{ flex: 1, backgroundColor: cardBg, borderRadius: 12, padding: 12, borderWidth: 0.5, borderColor: dark ? green : '#e6e8df' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                  <View style={{ width: 8, height: 1, backgroundColor: accentC }} />
                  <Text style={{ fontSize: 6, fontWeight: 'bold', color: eyebrowC, letterSpacing: 1.4 }}>{sc.tag.toUpperCase()}</Text>
                </View>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: labelC, marginBottom: 8 }}>{sc.label}</Text>
                {rows.map((r, j) => (
                  <View key={j} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                    <Text style={{ fontSize: 7, color: rowLabelC }}>{r.l}</Text>
                    <Text style={{ fontSize: 7, fontWeight: 'bold', color: rowValC }}>{r.v}</Text>
                  </View>
                ))}
                <View style={{ height: 0.5, backgroundColor: ruleC, marginVertical: 6 }} />
                <Text style={{ fontSize: 6, fontWeight: 'bold', color: eyebrowC, letterSpacing: 1.2, marginBottom: 2 }}>GROSS REVENUE</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: priceC, letterSpacing: -0.3, marginBottom: 6 }}>{sc.grossRevenue}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Text style={{ fontSize: 7, color: rowLabelC }}>Hipervínculo (50%)</Text>
                  <Text style={{ fontSize: 7, fontWeight: 'bold', color: rowValC }}>{sc.hipervinculoShare}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ fontSize: 7, color: rowLabelC }}>Clinic Net Profit</Text>
                  <Text style={{ fontSize: 7, fontWeight: 'bold', color: highlightC }}>{sc.clinicNet}</Text>
                </View>
                <Text style={{ fontSize: 6.5, color: bodyC, lineHeight: 1.5 }}>{sc.note}</Text>
              </View>
            );
          })}
        </View>

        <Text style={{ fontSize: 7.5, color: grayLight, lineHeight: 1.5, marginBottom: 8 }}>{content.investment.projections.scenarioNote}</Text>

        {/* Summary */}
        <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, borderWidth: 0.5, borderColor: '#e6e8df', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: lime, letterSpacing: 1.5, marginBottom: 3 }}>BOTTOM LINE</Text>
            <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: green }}>{content.investment.projections.summaryLabel}</Text>
            <Text style={{ fontSize: 7, color: grayLight, marginTop: 3, lineHeight: 1.4 }}>{content.investment.projections.summaryNote}</Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: green, letterSpacing: -0.4 }}>{content.investment.projections.summaryRange}</Text>
        </View>

        <Text style={{ fontSize: 6.5, color: grayLight, lineHeight: 1.5, fontStyle: 'italic' }}>{content.investment.projections.disclaimer}</Text>

        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>



      {/* PAGE 10: Terms */}
      <Page size="A4" style={{ ...s.page, padding: 36 }}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>TERMS</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.terms.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.terms.headline}</Text>
        {content.terms.sections.map((section, i) => {
          const Icon = iconMap[section.icon] || FileIcon;
          return (
            <View key={i} style={{ backgroundColor: bg, borderRadius: 12, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
              <View style={{ width: 22, height: 22, borderRadius: 8, backgroundColor: 'rgba(139,195,74,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={11} />
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

      {/* PAGE 11: Agreement Details */}
      <Page size="A4" style={{ ...s.pageBg, padding: 50 }} wrap={false}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>AGREEMENT</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: green, marginBottom: 18 }}>{content.legalTerms.title}</Text>
        {content.legalTerms.sections.map((section, i) => (
          <View key={i} style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 5 }}>{section.heading}</Text>
            {section.items.map((item, j) => (
              <View key={j} style={{ flexDirection: 'row', gap: 6, marginBottom: 3, paddingLeft: 10 }}>
                <Text style={{ fontSize: 7.5, color: gray }}>{j + 1}.</Text>
                <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.5, flex: 1 }}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 12: Contact */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ backgroundColor: green, padding: 40, flex: 1 }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 8 }}>CONTACT US</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 6 }}>{content.contact.title}</Text>
          <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.5 }}>{content.contact.description}</Text>
          <View style={{ flexDirection: 'row', gap: 40 }}>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <MailIcon size={16} />
                  <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Email</Text>
                </View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{content.contact.email}</Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <PhoneIcon size={16} />
                  <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Phone</Text>
                </View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{content.contact.phone}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <MapPinIcon size={16} />
                  <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Location</Text>
                </View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{content.contact.address}</Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <GlobeIcon size={16} />
                  <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Web</Text>
                </View>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', paddingLeft: 26 }}>{content.contact.website}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: 'white', paddingVertical: 30, alignItems: 'center' }}>
          <View style={{ width: 150, height: 32, marginBottom: 10 }}>
            <Image src={logoBase64} style={{ objectFit: 'contain' }} />
          </View>
          <View style={{ width: 30, height: 2, backgroundColor: lime, marginBottom: 10 }} />
          <Text style={{ fontSize: 9, color: grayLight, textAlign: 'center' }}>
            Results-driven growth systems for businesses ready to scale.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Circle } from '@react-pdf/renderer';
import { orbitalSunglassesProposalContent } from '../data/orbitalSunglassesProposalContent';

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

const TargetIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={lime} strokeWidth="2" />
    <Circle cx="12" cy="12" r="6" fill="none" stroke={lime} strokeWidth="2" />
    <Circle cx="12" cy="12" r="2" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);

const TrendingIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M23 6l-9.5 9.5-5-5L1 18" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17 6h6v6" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ZapIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BarChartIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 20V10M18 20V4M6 20v-4" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BrainIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2a4 4 0 014 4v1a4 4 0 012 3.46V12a4 4 0 01-2 3.46V16a4 4 0 01-4 4 4 4 0 01-4-4v-.54A4 4 0 016 12v-1.54A4 4 0 018 7V6a4 4 0 014-4z" fill="none" stroke={lime} strokeWidth="2" />
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

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  files: FileIcon,
  calendar: CalendarIcon,
  dollar: DollarIcon,
  clock: ClockIcon,
};

const commitmentIcons = [TrendingIcon, ZapIcon, BarChartIcon, BrainIcon];

interface Props {
  logoBase64: string;
}

export function OrbitalSunglassesPDFDocument({ logoBase64 }: Props) {
  const content = orbitalSunglassesProposalContent;

  return (
    <Document>
      {/* PAGE 1: Cover */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ padding: 40, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Image src={logoBase64} style={{ height: 30, objectFit: 'contain', objectPositionX: 'left' }} />
          <Text style={{ fontSize: 7, color: grayLight, letterSpacing: 2 }}>{content.cover.alliance.toUpperCase()}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: green, padding: 40, justifyContent: 'center' }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 14 }}>
            {content.cover.title.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 10, lineHeight: 1.15 }}>
            {content.cover.subtitle}
          </Text>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
            {content.cover.tagline}
          </Text>
          <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 24, letterSpacing: 0.5 }}>
            {content.cover.preparedFor}
          </Text>
          <View style={{ width: 50, height: 3, backgroundColor: lime }} />
        </View>
        <View style={{ padding: '16 40', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 8, color: grayLight, letterSpacing: 2 }}>CONFIDENCIAL</Text>
          <Text style={{ fontSize: 8, color: grayLight }}>hipervinculo.net · eclipseexperience.net</Text>
        </View>
      </Page>

      {/* PAGE 2: About — Alliance */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>NUESTRA ALIANZA</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.about.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.about.headline}</Text>
        <Text style={{ fontSize: 9.5, color: gray, lineHeight: 1.6, marginBottom: 20 }}>{content.about.description}</Text>
        <View style={{ flexDirection: 'row', gap: 14, marginBottom: 18 }}>
          {content.about.stats.map((stat, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: bg, borderRadius: 12, paddingVertical: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 26, fontWeight: 'bold', color: lime, marginBottom: 4 }}>{stat.value}</Text>
              <Text style={{ fontSize: 7, color: gray }}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          {content.about.credentials.map((cred, i) => (
            <Text key={i} style={{ fontSize: 9, color: green, backgroundColor: 'rgba(139,195,74,0.1)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 }}>
              {cred}
            </Text>
          ))}
        </View>
        <View style={{ backgroundColor: bg, borderRadius: 12, padding: 16 }}>
          <Text style={{ fontSize: 9, color: gray, lineHeight: 1.6, fontStyle: 'italic' }}>{content.about.allianceNote}</Text>
        </View>
        <Text style={s.footer}>Eclipse + Hipervínculo</Text>
      </Page>

      {/* PAGE 3: Assessment */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>DIAGNÓSTICO</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.assessment.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 16 }}>{content.assessment.headline}</Text>
        {content.assessment.sections.map((section, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 12, padding: 16, marginBottom: 10, flexDirection: 'row', gap: 12 }}>
            <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(139,195,74,0.15)', alignItems: 'center', justifyContent: 'center' }}>
              <TargetIcon size={14} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 3 }}>{section.title}</Text>
              <Text style={{ fontSize: 9, color: gray, lineHeight: 1.5 }}>{section.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Eclipse + Hipervínculo</Text>
      </Page>

      {/* PAGE 4: Shopify Development */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICIO 1</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.shopifyService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.shopifyService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 16, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>INVERSIÓN</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{content.shopifyService.price}</Text>
            <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginLeft: 8 }}>{content.shopifyService.priceLabel}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 9.5, color: gray, lineHeight: 1.6, marginBottom: 12 }}>{content.shopifyService.description}</Text>
        {content.shopifyService.includes.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Eclipse + Hipervínculo</Text>
      </Page>

      {/* PAGE 5: Ads Management */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICIO 2</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.adsService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.adsService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 14, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>GESTIÓN CONTINUA</Text>
            <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Retainer $3,000/mes mín. ó 10% del Profit Neto</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>$3,000</Text>
            <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>mínimo / mes</Text>
          </View>
        </View>
        <Text style={{ fontSize: 9, color: gray, lineHeight: 1.6, marginBottom: 10 }}>{content.adsService.description}</Text>

        <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 6 }}>Google Ads</Text>
        {content.adsService.googleAds.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 8, padding: 8, marginBottom: 4, flexDirection: 'row', gap: 8 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={11} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: green, marginBottom: 1 }}>{item.title}</Text>
              <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}

        <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginTop: 10, marginBottom: 6 }}>Meta Ads</Text>
        {content.adsService.metaAds.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 8, padding: 8, marginBottom: 4, flexDirection: 'row', gap: 8 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={11} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: green, marginBottom: 1 }}>{item.title}</Text>
              <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Eclipse + Hipervínculo</Text>
      </Page>

      {/* PAGE 6: Commitment */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>COMPROMISO</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.commitment.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 20 }}>{content.commitment.headline}</Text>
        {content.commitment.items.map((item, i) => {
          const Icon = commitmentIcons[i] || TrendingIcon;
          return (
            <View key={i} style={{ backgroundColor: bg, borderRadius: 14, padding: 18, marginBottom: 10, flexDirection: 'row', gap: 14 }}>
              <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(139,195,74,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={16} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 3 }}>{item.title}</Text>
                <Text style={{ fontSize: 9, color: gray, lineHeight: 1.5 }}>{item.description}</Text>
              </View>
            </View>
          );
        })}
        <Text style={s.footer}>Eclipse + Hipervínculo</Text>
      </Page>

      {/* PAGE 7: Investment Summary */}
      <Page size="A4" style={{ ...s.pageBg, padding: 50 }}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>INVERSIÓN</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.investment.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 20 }}>{content.investment.headline}</Text>

        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 14 }}>
          {/* Setup */}
          <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 14, padding: 22 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: green, marginBottom: 16 }}>{content.investment.setup.title}</Text>
            {content.investment.setup.items.map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, paddingBottom: 8, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' }}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <Text style={{ fontSize: 10, color: '#374151', fontWeight: 'medium' }}>{item.name}</Text>
                  <Text style={{ fontSize: 8, color: grayLight, marginTop: 2 }}>{item.detail}</Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: green, flexShrink: 0 }}>{item.price}</Text>
              </View>
            ))}
            <View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 12, marginTop: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: green }}>Total Setup</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: lime }}>{content.investment.setup.total}</Text>
            </View>
          </View>
          {/* Ongoing */}
          <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 14, padding: 22 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: green, marginBottom: 16 }}>{content.investment.ongoing.title}</Text>
            {/* Retainer */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, paddingBottom: 8, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' }}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={{ fontSize: 10, color: '#374151', fontWeight: 'medium' }}>{content.investment.ongoing.retainer.label}</Text>
                <Text style={{ fontSize: 8, color: grayLight, marginTop: 2 }}>{content.investment.ongoing.retainer.basis}</Text>
              </View>
              <View style={{ flexShrink: 0, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: lime }}>{content.investment.ongoing.retainer.amount}</Text>
                <Text style={{ fontSize: 7, color: grayLight }}>/mes</Text>
              </View>
            </View>
            {/* Commission */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' }}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={{ fontSize: 10, color: '#374151', fontWeight: 'medium' }}>{content.investment.ongoing.commission.label}</Text>
                <Text style={{ fontSize: 8, color: grayLight, marginTop: 2 }}>{content.investment.ongoing.commission.basis}</Text>
              </View>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: lime, flexShrink: 0 }}>{content.investment.ongoing.commission.rate}</Text>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 10 }}>
              <Text style={{ fontSize: 7.5, color: grayLight, lineHeight: 1.5 }}>{content.investment.ongoing.retainer.description}</Text>
            </View>
          </View>
        </View>

        {/* Commission Example */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 2 }}>{content.investment.example.title}</Text>
          <Text style={{ fontSize: 7, color: grayLight, marginBottom: 10 }}>{content.investment.example.subtitle}</Text>
          {content.investment.example.rows.map((row, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontSize: 8, color: gray }}>{row.label}</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: row.type === 'deduction' ? '#ef4444' : green }}>{row.value}</Text>
            </View>
          ))}
          <View style={{ borderTopWidth: 0.5, borderTopColor: '#e5e7eb', marginTop: 4, paddingTop: 6, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{content.investment.example.netProfit.label}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: lime }}>{content.investment.example.netProfit.value}</Text>
          </View>
          {/* Retainer vs Commission comparison */}
          <View style={{ borderTopWidth: 0.5, borderTopColor: '#e5e7eb', borderTopStyle: 'dashed', paddingTop: 6, marginBottom: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ fontSize: 8, color: grayLight }}>{content.investment.example.retainerComparison.retainerLabel}</Text>
              <Text style={{ fontSize: 8, color: grayLight }}>{content.investment.example.retainerComparison.retainerValue}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ fontSize: 8, color: gray }}>{content.investment.example.retainerComparison.commissionLabel}</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: green }}>{content.investment.example.retainerComparison.commissionValue}</Text>
            </View>
          </View>
          <View style={{ borderTopWidth: 0.5, borderTopColor: '#e5e7eb', paddingTop: 6, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{content.investment.example.retainerComparison.resultLabel}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: green }}>{content.investment.example.retainerComparison.resultValue}</Text>
          </View>
          <Text style={{ fontSize: 6.5, color: grayLight, lineHeight: 1.5 }}>{content.investment.example.note}</Text>
        </View>

        {/* Timeline */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, paddingRight: 16 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.investment.timeline.title}</Text>
            <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.5 }}>{content.investment.timeline.description}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: lime, lineHeight: 1 }}>{content.investment.timeline.duration}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: lime }}>{content.investment.timeline.durationUnit}</Text>
          </View>
        </View>
        <Text style={s.footer}>Eclipse + Hipervínculo</Text>
      </Page>

      {/* PAGE 8: Terms */}
      <Page size="A4" style={{ ...s.page, padding: 50 }}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>TÉRMINOS</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.terms.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 16 }}>{content.terms.headline}</Text>
        {content.terms.sections.map((section, i) => {
          const Icon = iconMap[section.icon] || FileIcon;
          return (
            <View key={i} style={{ backgroundColor: bg, borderRadius: 12, padding: 12, marginBottom: 6, flexDirection: 'row', gap: 12 }}>
              <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(139,195,74,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={14} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: green, marginBottom: 2 }}>{section.title}</Text>
                <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.45 }}>{section.description}</Text>
              </View>
            </View>
          );
        })}
        <Text style={s.footer}>Eclipse + Hipervínculo</Text>
      </Page>

      {/* PAGE 9: Agreement Details */}
      <Page size="A4" style={{ ...s.pageBg, padding: 50 }} wrap={false}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>ACUERDO</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: green, marginBottom: 18 }}>{content.legalTerms.title}</Text>
        {content.legalTerms.sections.map((section, i) => (
          <View key={i} style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 5 }}>{section.heading}</Text>
            {section.items.map((item, j) => (
              <View key={j} style={{ flexDirection: 'row', gap: 6, marginBottom: 3, paddingLeft: 10 }}>
                <Text style={{ fontSize: 8, color: gray }}>{j + 1}.</Text>
                <Text style={{ fontSize: 8, color: gray, lineHeight: 1.5, flex: 1 }}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={s.footer}>Eclipse + Hipervínculo</Text>
      </Page>

      {/* PAGE 10: Signature */}
      <Page size="A4" style={s.pageBg}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>ACEPTACIÓN</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 8 }}>Firma de Acuerdo</Text>
        <Text style={{ fontSize: 9, color: gray, marginBottom: 30, lineHeight: 1.5, maxWidth: 340 }}>
          Al firmar este documento, ambas partes aceptan los términos y condiciones descritos en esta propuesta.
        </Text>

        <View style={{ flexDirection: 'row', gap: 40, flex: 1, alignItems: 'flex-start', marginTop: 20 }}>
          {/* Client */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: lime, letterSpacing: 2, marginBottom: 4 }}>EL CLIENTE</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: green, marginBottom: 2 }}>Gustavo Holstein</Text>
            <Text style={{ fontSize: 8, color: grayLight, marginBottom: 40 }}>Orbital Sunglasses</Text>
            <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#cccccc', marginBottom: 6, height: 50 }} />
            <Text style={{ fontSize: 7, color: grayLight }}>Firma</Text>
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0', marginBottom: 6, height: 30, marginTop: 16 }} />
            <Text style={{ fontSize: 7, color: grayLight }}>Fecha</Text>
          </View>

          {/* Agency */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: lime, letterSpacing: 2, marginBottom: 4 }}>LA AGENCIA</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: green, marginBottom: 2 }}>Eclipse Marketing & CX + Hipervínculo</Text>
            <Text style={{ fontSize: 8, color: grayLight, marginBottom: 40 }}>Miguel Camacho — Director</Text>
            <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#cccccc', marginBottom: 6, height: 50 }} />
            <Text style={{ fontSize: 7, color: grayLight }}>Firma</Text>
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0', marginBottom: 6, height: 30, marginTop: 16 }} />
            <Text style={{ fontSize: 7, color: grayLight }}>Fecha</Text>
          </View>
        </View>

        <Text style={{ fontSize: 7, color: grayLight, textAlign: 'center', marginTop: 20 }}>
          Este documento tiene validez como acuerdo entre las partes una vez firmado por ambos representantes.
        </Text>
        <Text style={s.footer}>Eclipse + Hipervínculo</Text>
      </Page>

      {/* PAGE 11: Contact */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ backgroundColor: green, padding: 40, flex: 1 }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 8 }}>CONTÁCTANOS</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 6 }}>{content.contact.title}</Text>
          <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.5 }}>{content.contact.description}</Text>
          <View style={{ flexDirection: 'row', gap: 40 }}>
            {content.contact.contacts.map((c, i) => (
              <View key={i} style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>{c.company}</Text>
                <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>{c.name}</Text>

                <View style={{ marginBottom: 14 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <MailIcon size={12} />
                    <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>Email</Text>
                  </View>
                  <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold', paddingLeft: 20 }}>{c.email}</Text>
                </View>

                <View style={{ marginBottom: 14 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <PhoneIcon size={12} />
                    <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>Teléfono</Text>
                  </View>
                  <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold', paddingLeft: 20 }}>{c.phone}</Text>
                </View>

                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <GlobeIcon size={12} />
                    <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>Web</Text>
                  </View>
                  <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold', paddingLeft: 20 }}>{c.website}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={{ backgroundColor: 'white', paddingVertical: 30, alignItems: 'center' }}>
          <View style={{ width: 150, height: 32, marginBottom: 10 }}>
            <Image src={logoBase64} style={{ objectFit: 'contain' }} />
          </View>
          <View style={{ width: 30, height: 2, backgroundColor: lime, marginBottom: 10 }} />
          <Text style={{ fontSize: 9, color: grayLight, textAlign: 'center' }}>
            Eclipse Marketing & CX + Hipervínculo — Enfocados en tus resultados.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

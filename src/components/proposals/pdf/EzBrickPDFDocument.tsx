import { Document, Page, View, Text, Image, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import { ezBrickProposalContent } from '../data/ezBrickProposalContent';

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
const SearchIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
const TrendIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M23 6l-9.5 9.5-5-5L1 18" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17 6h6v6" fill="none" stroke={lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  globe: GlobeIcon,
};

interface Props {
  logoBase64: string;
}

export function EzBrickPDFDocument({ logoBase64 }: Props) {
  const content = ezBrickProposalContent;

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
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>{content.cover.tagline}</Text>
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
              <Text style={{ fontSize: 26, fontWeight: 'bold', color: lime, marginBottom: 4 }}>{stat.value}</Text>
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

      {/* PAGE 4: Objective & Strategy */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>STRATEGY</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.objective.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.objective.headline}</Text>
        <Text style={{ fontSize: 9.5, color: gray, lineHeight: 1.55, marginBottom: 12 }}>{content.objective.description}</Text>
        {content.objective.scope.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <View style={{ backgroundColor: 'rgba(255,193,7,0.06)', borderRadius: 10, padding: 10, marginTop: 6, borderWidth: 0.5, borderColor: 'rgba(255,193,7,0.3)' }}>
          <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: green, marginBottom: 2 }}>{content.objective.exclusions.title}</Text>
          <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.4 }}>{content.objective.exclusions.description}</Text>
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 5: Platform Access */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>REQUIREMENTS</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.platformAccess.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.platformAccess.headline}</Text>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 14 }}>{content.platformAccess.description}</Text>
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

      {/* PAGE 6: Media Plan */}
      <Page size="A4" style={s.pageBg}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>BUDGET</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.mediaPlan.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.mediaPlan.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 22, paddingVertical: 16, marginBottom: 12 }}>
          <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>
            {content.mediaPlan.totalLabel.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#c5e86a', marginTop: 4 }}>{content.mediaPlan.total}</Text>
        </View>
        <Text style={{ fontSize: 9.5, color: gray, lineHeight: 1.55, marginBottom: 12 }}>{content.mediaPlan.description}</Text>
        {content.mediaPlan.allocation.map((row, i) => (
          <View key={i} style={{ backgroundColor: 'white', borderRadius: 10, padding: 11, marginBottom: 6 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{row.channel}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: green, backgroundColor: 'rgba(139,195,74,0.15)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 }}>{row.share}</Text>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime }}>{row.amount}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{row.note}</Text>
          </View>
        ))}
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
          {content.mediaPlan.phases.map((p, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
              <Text style={{ fontSize: 7, fontWeight: 'bold', color: lime, letterSpacing: 1.2, marginBottom: 3 }}>{p.phase.toUpperCase()}</Text>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: green, marginBottom: 3 }}>{p.focus}</Text>
              <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.4 }}>{p.detail}</Text>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 7.5, color: grayLight, marginTop: 10, lineHeight: 1.4 }}>{content.mediaPlan.note}</Text>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 7: Performance Targets */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>PROJECTIONS</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.projections.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.projections.headline}</Text>
        <Text style={{ fontSize: 9.5, color: gray, lineHeight: 1.55, marginBottom: 8 }}>{content.projections.description}</Text>
        <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: green, marginBottom: 14 }}>{content.projections.spendBasis}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {content.projections.scenarios.map((sc, i) => {
            const highlight = i === 1;
            const labelColor = highlight ? 'rgba(255,255,255,0.6)' : gray;
            const valueColor = highlight ? '#ffffff' : green;
            return (
              <View key={i} style={{ flex: 1, backgroundColor: highlight ? green : bg, borderRadius: 14, padding: 14, borderWidth: highlight ? 0.5 : 0.5, borderColor: highlight ? green : 'rgba(139,195,74,0.4)' }}>
                <Text style={{ fontSize: 7, fontWeight: 'bold', letterSpacing: 1.5, color: highlight ? 'rgba(255,255,255,0.55)' : lime, marginBottom: 3 }}>
                  {sc.label.toUpperCase()}
                </Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: highlight ? '#c5e86a' : green, marginBottom: 12 }}>{sc.roas}</Text>
                {[
                  ['Gross sales', sc.revenue],
                  ['Refunds & returns', sc.returns],
                  ['Ad spend', sc.adSpend],
                ].map(([label, value]) => (
                  <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                    <Text style={{ fontSize: 7.5, color: labelColor }}>{label}</Text>
                    <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: valueColor }}>{value}</Text>
                  </View>
                ))}
                <View style={{ height: 0.5, backgroundColor: highlight ? 'rgba(255,255,255,0.2)' : 'rgba(45,74,45,0.12)', marginVertical: 8 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 7.5, color: labelColor }}>Net sales</Text>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: highlight ? '#c5e86a' : lime }}>{sc.netSales}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <Text style={{ fontSize: 7.5, color: labelColor }}>3% commission</Text>
                  <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: valueColor }}>{sc.commission}</Text>
                </View>
                <View style={{ backgroundColor: highlight ? 'rgba(197,232,106,0.15)' : 'rgba(139,195,74,0.12)', borderRadius: 8, padding: 8 }}>
                  <Text style={{ fontSize: 6.5, fontWeight: 'bold', letterSpacing: 1, color: labelColor, marginBottom: 2 }}>TOTAL HIPERVÍNCULO FEE</Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: highlight ? '#c5e86a' : green }}>{sc.totalFee}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ backgroundColor: 'rgba(139,195,74,0.08)', borderRadius: 10, padding: 12, marginTop: 16 }}>
          {content.projections.assumptions.map((a, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 6, marginBottom: 3 }}>
              <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: lime, marginTop: 3.5 }} />
              <Text style={{ flex: 1, fontSize: 7.5, color: gray, lineHeight: 1.45 }}>{a}</Text>
            </View>
          ))}
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 8: Google Search */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.searchService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.searchService.headline}</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 14 }}>
          <View style={{ flex: 1, backgroundColor: green, borderRadius: 14, padding: 16 }}>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, marginBottom: 4 }}>
              {content.searchService.mediaSpendLabel.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#c5e86a' }}>{content.searchService.mediaSpend}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: bg, borderRadius: 14, padding: 16, borderWidth: 0.5, borderColor: 'rgba(139,195,74,0.4)' }}>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: grayLight, letterSpacing: 1.5, marginBottom: 4 }}>
              {content.searchService.targetLabel.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: green }}>{content.searchService.target}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 12 }}>{content.searchService.description}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {content.searchService.includes.map((item, i) => (
            <View key={i} style={{ width: '48%', backgroundColor: bg, borderRadius: 10, padding: 10, marginBottom: 5, flexDirection: 'row', gap: 10 }}>
              <View style={{ paddingTop: 1 }}><SearchIcon size={12} /></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
                <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 9: Retargeting */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.retargetingService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.retargetingService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 22, paddingVertical: 16, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 7.5, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5 }}>
              {content.retargetingService.mediaSpendLabel.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#c5e86a', marginTop: 4 }}>{content.retargetingService.mediaSpend}</Text>
          </View>
          <TrendIcon size={22} />
        </View>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 12 }}>{content.retargetingService.description}</Text>
        {content.retargetingService.includes.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 12, marginBottom: 6, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><TrendIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 10: Investment */}
      <Page size="A4" style={{ ...s.pageBg, padding: 34 }}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>INVESTMENT</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.investment.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 10 }}>{content.investment.headline}</Text>

        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
          {[
            { tag: 'Fixed Monthly', data: content.investment.retainer },
            { tag: 'Performance', data: content.investment.commission },
          ].map((card, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: green, borderRadius: 14, padding: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                <View style={{ width: 12, height: 1, backgroundColor: '#c5e86a' }} />
                <Text style={{ fontSize: 6.5, fontWeight: 'bold', color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5 }}>{card.tag.toUpperCase()}</Text>
              </View>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#ffffff', letterSpacing: 1, marginBottom: 8, minHeight: 20 }}>
                {card.data.label.toUpperCase()}
              </Text>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#c5e86a', marginBottom: 4 }}>{card.data.rate}</Text>
              <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.75)', marginBottom: 6, lineHeight: 1.4 }}>{card.data.basis}</Text>
              <View style={{ height: 0.5, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 6 }} />
              <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>{card.data.description}</Text>
            </View>
          ))}
        </View>

        {/* Profit formula */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 14, marginBottom: 10 }}>
          <Text style={{ fontSize: 10.5, fontWeight: 'bold', color: green, marginBottom: 8 }}>{content.investment.profitFormula.title}</Text>
          {content.investment.profitFormula.rows.map((row, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ fontSize: 8, color: gray }}>{row.label}</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: green }}>{row.value}</Text>
            </View>
          ))}
          <Text style={{ fontSize: 7, color: grayLight, marginTop: 6, lineHeight: 1.45 }}>{content.investment.profitFormula.note}</Text>
        </View>

        {/* Payment terms */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 14, marginBottom: 10 }}>
          <Text style={{ fontSize: 10.5, fontWeight: 'bold', color: green, marginBottom: 8 }}>{content.investment.paymentTerms.title}</Text>
          {content.investment.paymentTerms.rows.map((row, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ fontSize: 8, color: gray }}>{row.label}</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: green }}>{row.value}</Text>
            </View>
          ))}
          <Text style={{ fontSize: 7, color: grayLight, marginTop: 6, lineHeight: 1.45 }}>{content.investment.paymentTerms.note}</Text>
        </View>

        {/* Client pays */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 14, marginBottom: 10 }}>
          <Text style={{ fontSize: 10.5, fontWeight: 'bold', color: green, marginBottom: 8 }}>{content.investment.clientPays.title}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {content.investment.clientPays.items.map((item, i) => (
              <View key={i} style={{ width: '50%', flexDirection: 'row', gap: 8, marginBottom: 6, paddingRight: 6 }}>
                <View style={{ paddingTop: 1 }}><CheckIcon size={10} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#374151', marginBottom: 1 }}>{item.name}</Text>
                  <Text style={{ fontSize: 7, color: grayLight }}>{item.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Timeline */}
        <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={{ fontSize: 10.5, fontWeight: 'bold', color: green, marginBottom: 2 }}>{content.investment.timeline.title}</Text>
            <Text style={{ fontSize: 7, color: gray, lineHeight: 1.45 }}>{content.investment.timeline.description}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: lime }}>{content.investment.timeline.duration}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: lime }}>{content.investment.timeline.durationUnit}</Text>
          </View>
        </View>

        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 11: Terms */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>LEGAL</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.terms.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.terms.headline}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {content.terms.sections.map((section, i) => {
            const Icon = iconMap[section.icon] || CheckIcon;
            return (
              <View key={i} style={{ width: '48%', backgroundColor: bg, borderRadius: 10, padding: 11, marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                  <View style={{ width: 22, height: 22, borderRadius: 8, backgroundColor: 'rgba(139,195,74,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={11} />
                  </View>
                  <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: green }}>{section.title}</Text>
                </View>
                <Text style={{ fontSize: 7.5, color: gray, lineHeight: 1.45 }}>{section.description}</Text>
              </View>
            );
          })}
        </View>
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 12: Agreement Details */}
      <Page size="A4" style={{ ...s.page, padding: 34 }}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>AGREEMENT</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: green, marginBottom: 10 }}>{content.legalTerms.title}</Text>
        {content.legalTerms.sections.map((section, i) => (
          <View key={i} wrap={false} style={{ backgroundColor: bg, borderRadius: 8, padding: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: green, marginBottom: 3 }}>{section.heading}</Text>
            {section.items.map((item, j) => (
              <View key={j} style={{ flexDirection: 'row', gap: 5, marginBottom: 1.5 }}>
                <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: lime, marginTop: 3 }} />
                <Text style={{ flex: 1, fontSize: 7, color: gray, lineHeight: 1.4 }}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 13: Contact */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: green, padding: 40, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>{content.contact.title}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.contact.headline}</Text>
            <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 20, maxWidth: 340 }}>
              {content.contact.description}
            </Text>

            <View style={{ marginBottom: 20 }}>
              {[
                { Icon: MailIcon, label: 'Email', value: content.contact.email },
                { Icon: PhoneIcon, label: 'Phone', value: content.contact.phone },
                { Icon: MapPinIcon, label: 'Address', value: content.contact.address },
                { Icon: GlobeIcon, label: 'Website', value: content.contact.website },
              ].map(({ Icon, label, value }) => (
                <View key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: 'rgba(139,195,74,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={12} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>{label}</Text>
                    <Text style={{ fontSize: 9, color: 'white', maxWidth: 200 }}>{value}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={{ backgroundColor: lime, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: green }}>{content.contact.cta}</Text>
            </View>
          </View>

          <View style={{ width: '35%', backgroundColor: 'white', padding: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Image src={logoBase64} style={{ height: 40, objectFit: 'contain', marginBottom: 16 }} />
            <View style={{ width: 40, height: 2, backgroundColor: lime, marginBottom: 16 }} />
            <Text style={{ fontSize: 8, color: gray, textAlign: 'center', lineHeight: 1.5, maxWidth: 140 }}>
              High-intent search traffic, disciplined budgets, and reporting measured in profit.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

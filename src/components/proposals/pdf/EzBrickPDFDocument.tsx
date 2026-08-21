import { Document, Page, View, Text, Image, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import { ezBrickProposalContent } from '../data/ezBrickProposalContent';

const green = '#2d4a2d';
const lime = '#8BC34A';
const bg = '#f8f9f5';
const gray = '#666666';
const grayLight = '#999999';

const inkStrong = '#1f2d1f';
const ink = '#4b5563';
const rule = 'rgba(45,74,45,0.10)';

const T = {
  eyebrow: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: lime, letterSpacing: 3 },
  h1: { fontSize: 29, fontFamily: 'Helvetica-Bold', color: green, lineHeight: 1.08 },
  lead: { fontSize: 12.5, fontFamily: 'Helvetica-Bold', color: '#5c7f43', lineHeight: 1.35 },
  body: { fontSize: 10, color: ink, lineHeight: 1.75 },
  cardTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: green },
  cardBody: { fontSize: 8.5, color: ink, lineHeight: 1.6 },
  micro: { fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 1.6 },
  sectionTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: green },
  rowLabel: { fontSize: 8.5, color: ink },
  rowValue: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: green },
  note: { fontSize: 7.5, color: grayLight, lineHeight: 1.6 },
};

const s = StyleSheet.create({
  page: { paddingTop: 46, paddingBottom: 58, paddingHorizontal: 48, backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  pageBg: { paddingTop: 46, paddingBottom: 58, paddingHorizontal: 48, backgroundColor: bg, fontFamily: 'Helvetica' },
  accent: { width: 34, height: 3, backgroundColor: lime, marginBottom: 18 },
  footer: { position: 'absolute', bottom: 28, left: 48, right: 48, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 7, color: '#b0b0b0', letterSpacing: 1 },
  card: { backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 9 },
  cardWhite: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginBottom: 12 },
});

const PageHead = ({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) => (
  <View style={{ marginBottom: 22 }}>
    <View style={s.accent} />
    <Text style={{ ...T.eyebrow, marginBottom: 10 }}>{eyebrow.toUpperCase()}</Text>
    <Text style={T.h1}>{title}</Text>
    {lead ? <Text style={{ ...T.lead, marginTop: 8 }}>{lead}</Text> : null}
  </View>
);

const Footer = () => (
  <View style={s.footer} fixed>
    <Text style={s.footerText}>HIPERVÍNCULO</Text>
    <Text style={s.footerText} render={({ pageNumber }) => `${String(pageNumber).padStart(2, '0')} · hipervinculo.net`} />
  </View>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
    <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: lime, marginTop: 5 }} />
    <Text style={{ flex: 1, ...T.cardBody }}>{children}</Text>
  </View>
);

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
        <View style={{ paddingHorizontal: 48, paddingTop: 46, paddingBottom: 30, flexDirection: 'row' }}>
          <Image src={logoBase64} style={{ height: 30, objectFit: 'contain', objectPositionX: 'left' }} />
        </View>
        <View style={{ flex: 1, backgroundColor: green, paddingHorizontal: 48, paddingVertical: 56, justifyContent: 'center' }}>
          <Text style={{ ...T.eyebrow, color: '#c5e86a', marginBottom: 22 }}>{content.cover.title.toUpperCase()}</Text>
          <Text style={{ fontSize: 38, fontFamily: 'Helvetica-Bold', color: '#ffffff', lineHeight: 1.1, maxWidth: 400 }}>
            {content.cover.subtitle}
          </Text>
          <View style={{ width: 44, height: 3, backgroundColor: lime, marginTop: 26, marginBottom: 22 }} />
          <Text style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 340 }}>
            {content.cover.tagline}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 48, paddingVertical: 22, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 7.5, color: grayLight, letterSpacing: 2.5 }}>CONFIDENTIAL</Text>
          <Text style={{ fontSize: 7.5, color: grayLight, letterSpacing: 1 }}>hipervinculo.net</Text>
        </View>
      </Page>

      {/* PAGE 2: About */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="About us" title={content.about.title} lead={content.about.headline} />
        <Text style={{ ...T.body, marginBottom: 30 }}>{content.about.description}</Text>
        <View style={{ flexDirection: 'row', gap: 14, marginBottom: 30 }}>
          {content.about.stats.map((stat, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: bg, borderRadius: 14, paddingVertical: 22, alignItems: 'center' }}>
              <Text style={{ fontSize: 30, fontFamily: 'Helvetica-Bold', color: green }}>{stat.value}</Text>
              <View style={{ width: 18, height: 2, backgroundColor: lime, marginVertical: 8 }} />
              <Text style={{ fontSize: 8, color: ink, letterSpacing: 0.5 }}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <Text style={{ ...T.micro, color: grayLight, marginBottom: 12 }}>CAPABILITIES</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {content.about.credentials.map((cred, i) => (
            <Text key={i} style={{ fontSize: 9, color: green, backgroundColor: 'rgba(139,195,74,0.12)', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 }}>
              {cred}
            </Text>
          ))}
        </View>
        <Footer />
      </Page>

      {/* PAGE 3: Client Overview */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="The client" title={content.clientOverview.title} lead={content.clientOverview.headline} />
        <Text style={{ ...T.body, marginBottom: 24 }}>{content.clientOverview.description}</Text>
        {content.clientOverview.services.map((item, i) => (
          <View key={i} wrap={false} style={{ ...s.card, flexDirection: 'row', gap: 12 }}>
            <View style={{ paddingTop: 2 }}><ShieldIcon size={13} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...T.cardTitle, marginBottom: 4 }}>{item.title}</Text>
              <Text style={T.cardBody}>{item.description}</Text>
            </View>
          </View>
        ))}
        <View style={{ borderLeftWidth: 2, borderLeftColor: lime, paddingLeft: 14, paddingVertical: 4, marginTop: 14 }}>
          <Text style={{ ...T.cardBody, color: inkStrong }}>{content.clientOverview.marketNote}</Text>
        </View>
        <Footer />
      </Page>

      {/* PAGE 4: Objective & Strategy */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Strategy" title={content.objective.title} lead={content.objective.headline} />
        <Text style={{ ...T.body, marginBottom: 24 }}>{content.objective.description}</Text>
        {content.objective.scope.map((item, i) => (
          <View key={i} wrap={false} style={{ ...s.card, flexDirection: 'row', gap: 12 }}>
            <View style={{ paddingTop: 2 }}><CheckIcon size={13} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...T.cardTitle, marginBottom: 4 }}>{item.title}</Text>
              <Text style={T.cardBody}>{item.description}</Text>
            </View>
          </View>
        ))}
        <View wrap={false} style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginTop: 12, borderWidth: 0.75, borderColor: 'rgba(255,193,7,0.45)' }}>
          <Text style={{ ...T.cardTitle, marginBottom: 5 }}>{content.objective.exclusions.title}</Text>
          <Text style={T.cardBody}>{content.objective.exclusions.description}</Text>
        </View>
        <Footer />
      </Page>

      {/* PAGE 5: Platform Access */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Requirements" title={content.platformAccess.title} lead={content.platformAccess.headline} />
        <Text style={{ ...T.body, marginBottom: 24 }}>{content.platformAccess.description}</Text>
        {content.platformAccess.platforms.map((platform, i) => (
          <View key={i} wrap={false} style={{ ...s.card, flexDirection: 'row', gap: 13 }}>
            <View style={{ width: 26, height: 26, borderRadius: 9, backgroundColor: 'rgba(139,195,74,0.18)', alignItems: 'center', justifyContent: 'center' }}>
              <LockIcon size={13} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <Text style={T.cardTitle}>{platform.title}</Text>
                <View style={{ backgroundColor: 'rgba(139,195,74,0.18)', borderRadius: 8, paddingHorizontal: 9, paddingVertical: 3 }}>
                  <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: green, letterSpacing: 0.8 }}>{platform.role}</Text>
                </View>
              </View>
              <Text style={T.cardBody}>{platform.description}</Text>
            </View>
          </View>
        ))}
        <Footer />
      </Page>

      {/* PAGE 6: Media Plan */}
      <Page size="A4" style={s.pageBg}>
        <PageHead eyebrow="Budget" title={content.mediaPlan.title} lead={content.mediaPlan.headline} />
        <View style={{ backgroundColor: green, borderRadius: 16, paddingHorizontal: 26, paddingVertical: 24, marginBottom: 22 }}>
          <Text style={{ ...T.micro, color: 'rgba(255,255,255,0.55)' }}>{content.mediaPlan.totalLabel.toUpperCase()}</Text>
          <Text style={{ fontSize: 40, fontFamily: 'Helvetica-Bold', color: '#c5e86a', marginTop: 8 }}>{content.mediaPlan.total}</Text>
        </View>
        <Text style={{ ...T.body, marginBottom: 22 }}>{content.mediaPlan.description}</Text>
        <Text style={{ ...T.micro, color: grayLight, marginBottom: 10 }}>ALLOCATION</Text>
        {content.mediaPlan.allocation.map((row, i) => (
          <View key={i} wrap={false} style={{ ...s.cardWhite, marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={{ ...T.sectionTitle, fontSize: 11.5, flex: 1, paddingRight: 10 }}>{row.channel}</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 15, fontFamily: 'Helvetica-Bold', color: green }}>{row.amount}</Text>
                <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#7a9a4e', letterSpacing: 0.8, marginTop: 2 }}>{row.share}</Text>
              </View>
            </View>
            <Text style={T.cardBody}>{row.note}</Text>
          </View>
        ))}
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
          {content.mediaPlan.phases.map((p, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 12, padding: 14 }}>
              <Text style={{ ...T.micro, color: lime, marginBottom: 6 }}>{p.phase.toUpperCase()}</Text>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: green, marginBottom: 5 }}>{p.focus}</Text>
              <Text style={{ fontSize: 8, color: ink, lineHeight: 1.6 }}>{p.detail}</Text>
            </View>
          ))}
        </View>
        <Text style={{ ...T.note, marginTop: 16 }}>{content.mediaPlan.note}</Text>
        <Footer />
      </Page>

      {/* PAGE 7: Projections */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Projections" title={content.projections.title} lead={content.projections.headline} />
        <Text style={{ ...T.body, marginBottom: 10 }}>{content.projections.description}</Text>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: green, marginBottom: 22 }}>{content.projections.spendBasis}</Text>
        <View style={{ flexDirection: 'row', gap: 11 }}>
          {content.projections.scenarios.map((sc, i) => {
            const highlight = i === 1;
            const labelColor = highlight ? 'rgba(255,255,255,0.6)' : ink;
            const valueColor = highlight ? '#ffffff' : green;
            return (
              <View key={i} wrap={false} style={{ flex: 1, backgroundColor: highlight ? green : bg, borderRadius: 14, padding: 15, borderWidth: 0.75, borderColor: highlight ? green : 'rgba(139,195,74,0.35)' }}>
                <Text style={{ ...T.micro, fontSize: 6.5, color: highlight ? 'rgba(255,255,255,0.55)' : '#7a9a4e', marginBottom: 8, minHeight: 16 }}>
                  {sc.label.toUpperCase()}
                </Text>
                <Text style={{ fontSize: 26, fontFamily: 'Helvetica-Bold', color: highlight ? '#c5e86a' : green, marginBottom: 16 }}>{sc.roas}</Text>
                {[
                  ['Gross sales', sc.revenue],
                  ['Refunds & returns', sc.returns],
                  ['Ad spend', sc.adSpend],
                ].map(([label, value]) => (
                  <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontSize: 7.5, color: labelColor }}>{label}</Text>
                    <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: valueColor }}>{value}</Text>
                  </View>
                ))}
                <View style={{ height: 0.75, backgroundColor: highlight ? 'rgba(255,255,255,0.2)' : rule, marginVertical: 10 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <Text style={{ fontSize: 7.5, color: labelColor }}>Net sales</Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: highlight ? '#c5e86a' : green }}>{sc.netSales}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                  <Text style={{ fontSize: 7.5, color: labelColor }}>3% commission</Text>
                  <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: valueColor }}>{sc.commission}</Text>
                </View>
                <View style={{ backgroundColor: highlight ? 'rgba(197,232,106,0.16)' : 'rgba(139,195,74,0.14)', borderRadius: 10, padding: 10 }}>
                  <Text style={{ ...T.micro, fontSize: 6, color: labelColor, marginBottom: 4 }}>TOTAL HIPERVÍNCULO FEE</Text>
                  <Text style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', color: highlight ? '#c5e86a' : green }}>{sc.totalFee}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <Text style={{ ...T.micro, color: grayLight, marginTop: 26, marginBottom: 10 }}>ASSUMPTIONS</Text>
        {content.projections.assumptions.map((a, i) => (
          <Bullet key={i}>{a}</Bullet>
        ))}
        <Footer />
      </Page>

      {/* PAGE 8: Google Search */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Service" title={content.searchService.title} lead={content.searchService.headline} />
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 22 }}>
          <View style={{ flex: 1, backgroundColor: green, borderRadius: 14, padding: 18 }}>
            <Text style={{ ...T.micro, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>{content.searchService.mediaSpendLabel.toUpperCase()}</Text>
            <Text style={{ fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#c5e86a' }}>{content.searchService.mediaSpend}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: bg, borderRadius: 14, padding: 18, borderWidth: 0.75, borderColor: 'rgba(139,195,74,0.35)' }}>
            <Text style={{ ...T.micro, color: grayLight, marginBottom: 8 }}>{content.searchService.targetLabel.toUpperCase()}</Text>
            <Text style={{ fontSize: 28, fontFamily: 'Helvetica-Bold', color: green }}>{content.searchService.target}</Text>
          </View>
        </View>
        <Text style={{ ...T.body, marginBottom: 24 }}>{content.searchService.description}</Text>
        <Text style={{ ...T.micro, color: grayLight, marginBottom: 12 }}>WHAT IS INCLUDED</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 9 }}>
          {content.searchService.includes.map((item, i) => (
            <View key={i} wrap={false} style={{ width: '47.8%', backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 9, flexDirection: 'row', gap: 10 }}>
              <View style={{ paddingTop: 2 }}><SearchIcon size={12} /></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: green, marginBottom: 4 }}>{item.title}</Text>
                <Text style={{ fontSize: 8, color: ink, lineHeight: 1.6 }}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <Footer />
      </Page>

      {/* PAGE 9: Retargeting */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Service" title={content.retargetingService.title} lead={content.retargetingService.headline} />
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 20, marginBottom: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ ...T.micro, color: 'rgba(255,255,255,0.55)' }}>{content.retargetingService.mediaSpendLabel.toUpperCase()}</Text>
            <Text style={{ fontSize: 30, fontFamily: 'Helvetica-Bold', color: '#c5e86a', marginTop: 8 }}>{content.retargetingService.mediaSpend}</Text>
          </View>
          <TrendIcon size={24} />
        </View>
        <Text style={{ ...T.body, marginBottom: 24 }}>{content.retargetingService.description}</Text>
        {content.retargetingService.includes.map((item, i) => (
          <View key={i} wrap={false} style={{ ...s.card, flexDirection: 'row', gap: 12 }}>
            <View style={{ paddingTop: 2 }}><TrendIcon size={13} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...T.cardTitle, marginBottom: 4 }}>{item.title}</Text>
              <Text style={T.cardBody}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Footer />
      </Page>

      {/* PAGE 10: Investment */}
      <Page size="A4" style={s.pageBg}>
        <PageHead eyebrow="Investment" title={content.investment.title} lead={content.investment.headline} />
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
          {[
            { tag: 'Fixed Monthly', data: content.investment.retainer },
            { tag: 'Performance', data: content.investment.commission },
          ].map((card, i) => (
            <View key={i} wrap={false} style={{ flex: 1, backgroundColor: green, borderRadius: 14, padding: 18 }}>
              <Text style={{ ...T.micro, fontSize: 6.5, color: 'rgba(255,255,255,0.55)', marginBottom: 10 }}>{card.tag.toUpperCase()}</Text>
              <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#ffffff', letterSpacing: 0.6, marginBottom: 12, minHeight: 22 }}>
                {card.data.label.toUpperCase()}
              </Text>
              <Text style={{ fontSize: 26, fontFamily: 'Helvetica-Bold', color: '#c5e86a', marginBottom: 8 }}>{card.data.rate}</Text>
              <Text style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 10 }}>{card.data.basis}</Text>
              <View style={{ height: 0.75, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 10 }} />
              <Text style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>{card.data.description}</Text>
            </View>
          ))}
        </View>

        <View wrap={false} style={s.cardWhite}>
          <Text style={{ ...T.sectionTitle, marginBottom: 12 }}>{content.investment.profitFormula.title}</Text>
          {content.investment.profitFormula.rows.map((row, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: i === content.investment.profitFormula.rows.length - 1 ? 0 : 0.5, borderBottomColor: rule }}>
              <Text style={T.rowLabel}>{row.label}</Text>
              <Text style={T.rowValue}>{row.value}</Text>
            </View>
          ))}
          <Text style={{ ...T.note, marginTop: 10 }}>{content.investment.profitFormula.note}</Text>
        </View>

        <View wrap={false} style={s.cardWhite}>
          <Text style={{ ...T.sectionTitle, marginBottom: 12 }}>{content.investment.paymentTerms.title}</Text>
          {content.investment.paymentTerms.rows.map((row, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: i === content.investment.paymentTerms.rows.length - 1 ? 0 : 0.5, borderBottomColor: rule }}>
              <Text style={T.rowLabel}>{row.label}</Text>
              <Text style={T.rowValue}>{row.value}</Text>
            </View>
          ))}
          <Text style={{ ...T.note, marginTop: 10 }}>{content.investment.paymentTerms.note}</Text>
        </View>

        <View wrap={false} style={s.cardWhite}>
          <Text style={{ ...T.sectionTitle, marginBottom: 12 }}>{content.investment.clientPays.title}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {content.investment.clientPays.items.map((item, i) => (
              <View key={i} style={{ width: '50%', flexDirection: 'row', gap: 9, marginBottom: 10, paddingRight: 10 }}>
                <View style={{ paddingTop: 2 }}><CheckIcon size={11} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: inkStrong, marginBottom: 2 }}>{item.name}</Text>
                  <Text style={{ fontSize: 7.5, color: grayLight, lineHeight: 1.5 }}>{item.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View wrap={false} style={{ ...s.cardWhite, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, paddingRight: 16 }}>
            <Text style={{ ...T.sectionTitle, marginBottom: 5 }}>{content.investment.timeline.title}</Text>
            <Text style={{ fontSize: 8, color: ink, lineHeight: 1.6 }}>{content.investment.timeline.description}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 28, fontFamily: 'Helvetica-Bold', color: green }}>{content.investment.timeline.duration}</Text>
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#7a9a4e', letterSpacing: 1 }}>{content.investment.timeline.durationUnit.toUpperCase()}</Text>
          </View>
        </View>

        <Footer />
      </Page>

      {/* PAGE 11: Terms */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Legal" title={content.terms.title} lead={content.terms.headline} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {content.terms.sections.map((section, i) => {
            const Icon = iconMap[section.icon] || CheckIcon;
            return (
              <View key={i} wrap={false} style={{ width: '47.6%', backgroundColor: bg, borderRadius: 12, padding: 14, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                  <View style={{ width: 24, height: 24, borderRadius: 8, backgroundColor: 'rgba(139,195,74,0.18)', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={12} />
                  </View>
                  <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: green, flex: 1 }}>{section.title}</Text>
                </View>
                <Text style={{ fontSize: 8, color: ink, lineHeight: 1.6 }}>{section.description}</Text>
              </View>
            );
          })}
        </View>
        <Footer />
      </Page>

      {/* PAGE 12: Agreement Details */}
      <Page size="A4" style={s.page}>
        <PageHead eyebrow="Agreement" title={content.legalTerms.title} />
        {content.legalTerms.sections.map((section, i) => (
          <View key={i} wrap={false} style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: green, marginBottom: 3 }}>{section.heading}</Text>
            <View style={{ width: 20, height: 2, backgroundColor: lime, marginBottom: 8 }} />
            {section.items.map((item, j) => (
              <Bullet key={j}>{item}</Bullet>
            ))}
          </View>
        ))}
        <Footer />
      </Page>

      {/* PAGE 13: Contact */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: green, paddingHorizontal: 48, paddingVertical: 56, justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, fontFamily: 'Helvetica-Bold', color: '#ffffff', lineHeight: 1.15 }}>{content.contact.title}</Text>
            <Text style={{ fontSize: 12.5, fontFamily: 'Helvetica-Bold', color: lime, marginTop: 10, marginBottom: 18 }}>{content.contact.headline}</Text>
            <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, marginBottom: 30, maxWidth: 330 }}>
              {content.contact.description}
            </Text>

            <View style={{ marginBottom: 30 }}>
              {[
                { Icon: MailIcon, label: 'Email', value: content.contact.email },
                { Icon: PhoneIcon, label: 'Phone', value: content.contact.phone },
                { Icon: MapPinIcon, label: 'Address', value: content.contact.address },
                { Icon: GlobeIcon, label: 'Website', value: content.contact.website },
              ].map(({ Icon, label, value }) => (
                <View key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(139,195,74,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={12} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 6.5, fontFamily: 'Helvetica-Bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 1.4, marginBottom: 2 }}>{label.toUpperCase()}</Text>
                    <Text style={{ fontSize: 9.5, color: '#ffffff', maxWidth: 210 }}>{value}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={{ backgroundColor: lime, paddingHorizontal: 22, paddingVertical: 10, borderRadius: 22, alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: green }}>{content.contact.cta}</Text>
            </View>
          </View>

          <View style={{ width: '34%', backgroundColor: '#ffffff', padding: 34, alignItems: 'center', justifyContent: 'center' }}>
            <Image src={logoBase64} style={{ height: 40, objectFit: 'contain', marginBottom: 18 }} />
            <View style={{ width: 34, height: 2, backgroundColor: lime, marginBottom: 18 }} />
            <Text style={{ fontSize: 8, color: ink, textAlign: 'center', lineHeight: 1.7, maxWidth: 140 }}>
              High-intent search traffic, disciplined budgets, and reporting measured in profit.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

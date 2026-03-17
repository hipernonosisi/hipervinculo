import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Circle } from '@react-pdf/renderer';
import { xtralluxProposalContent } from '../data/xtralluxProposalContent';

const green = '#2d4a2d';
const lime = '#8BC34A';
const bg = '#f8f9f5';
const gray = '#666666';
const grayLight = '#999999';
const amber = '#FFC107';

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

const ShieldIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke={lime} strokeWidth="2" />
  </Svg>
);

const AlertIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" fill="none" stroke={amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  files: FileIcon,
  calendar: CalendarIcon,
  dollar: DollarIcon,
  clock: ClockIcon,
};

interface Props {
  logoBase64: string;
}

export function XtralluxPDFDocument({ logoBase64 }: Props) {
  const content = xtralluxProposalContent;

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
          <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
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

      {/* PAGE 3: Objective & Scope */}
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
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 4: Listing Redesign */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE 1</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.listingService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.listingService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 14, marginBottom: 14 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>PER LISTING</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{content.listingService.pricePerListing}</Text>
          </View>
          <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>{content.listingService.totalListings} LISTINGS</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{content.listingService.totalPrice}</Text>
              <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginLeft: 6 }}>Total</Text>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 12 }}>{content.listingService.description}</Text>
        {content.listingService.includes.map((item, i) => (
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

      {/* PAGE 5: Amazon Store */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE 2</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.storeService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 14 }}>{content.storeService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 16, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>INVESTMENT</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{content.storeService.price}</Text>
            <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginLeft: 8 }}>{content.storeService.priceLabel}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 14 }}>{content.storeService.description}</Text>
        {content.storeService.includes.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 10, padding: 12, marginBottom: 6, flexDirection: 'row', gap: 10 }}>
            <View style={{ paddingTop: 1 }}><CheckIcon size={12} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 2 }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 6: Advertising */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE 3</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.advertisingService.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 12 }}>{content.advertisingService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 16, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>INCLUDED IN ONGOING MANAGEMENT</Text>
            <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Part of the 15% Net Profit Commission</Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>15%</Text>
        </View>
        <Text style={{ fontSize: 10, color: gray, lineHeight: 1.6, marginBottom: 12 }}>{content.advertisingService.description}</Text>
        {content.advertisingService.includes.map((item, i) => (
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

      {/* PAGE 7: Sellerise + Case Management */}
      <Page size="A4" style={s.page}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SERVICE 4</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.selleriseService.title}</Text>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: lime, marginBottom: 10 }}>{content.selleriseService.headline}</Text>
        <View style={{ backgroundColor: green, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>SELLERISE SUBSCRIPTION</Text>
            <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{content.selleriseService.monthlyCostLabel}</Text>
          </View>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>{content.selleriseService.monthlyCost}</Text>
        </View>
        <Text style={{ fontSize: 9, color: gray, lineHeight: 1.6, marginBottom: 8 }}>{content.selleriseService.description}</Text>
        {content.selleriseService.features.map((item, i) => (
          <View key={i} style={{ backgroundColor: bg, borderRadius: 8, padding: 8, marginBottom: 4, flexDirection: 'row', gap: 8 }}>
            <View style={{ paddingTop: 1 }}><BarChartIcon size={11} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: green, marginBottom: 1 }}>{item.title}</Text>
              <Text style={{ fontSize: 7, color: gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          </View>
        ))}

        {/* Case Management */}
        <View style={{ width: 40, height: 3, backgroundColor: lime, marginTop: 12, marginBottom: 10 }} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>SUPPORT</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.caseManagement.title}</Text>
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, marginBottom: 8 }}>{content.caseManagement.headline}</Text>
        <Text style={{ fontSize: 8, color: gray, lineHeight: 1.5, marginBottom: 8 }}>{content.caseManagement.description}</Text>
        {content.caseManagement.tiers.map((tier, i) => (
          <View key={i} style={{ backgroundColor: tier.included ? bg : 'rgba(255,193,7,0.06)', borderRadius: 8, padding: 10, marginBottom: 4, flexDirection: 'row', gap: 8 }}>
            <View style={{ paddingTop: 1 }}>
              {tier.included ? <ShieldIcon size={12} /> : <AlertIcon size={12} />}
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: green }}>{tier.title}</Text>
                {tier.included ? (
                  <View style={{ backgroundColor: lime, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 }}>
                    <Text style={{ fontSize: 6, fontWeight: 'bold', color: 'white' }}>Included</Text>
                  </View>
                ) : (
                  <View style={{ backgroundColor: 'rgba(255,193,7,0.2)', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 }}>
                    <Text style={{ fontSize: 6, fontWeight: 'bold', color: '#F57F17' }}>{tier.price}</Text>
                  </View>
                )}
              </View>
              <Text style={{ fontSize: 7, color: gray, lineHeight: 1.4 }}>{tier.description}</Text>
            </View>
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 8: Investment Summary */}
      <Page size="A4" style={s.pageBg}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>INVESTMENT</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: green, marginBottom: 4 }}>{content.investment.title}</Text>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: lime, marginBottom: 24 }}>{content.investment.headline}</Text>

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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' }}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={{ fontSize: 10, color: '#374151', fontWeight: 'medium' }}>{content.investment.ongoing.commission.label}</Text>
                <Text style={{ fontSize: 8, color: grayLight, marginTop: 2 }}>{content.investment.ongoing.commission.basis}</Text>
              </View>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: lime, flexShrink: 0 }}>{content.investment.ongoing.commission.rate}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' }}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={{ fontSize: 10, color: '#374151', fontWeight: 'medium' }}>{content.investment.ongoing.sellerise.label}</Text>
                <Text style={{ fontSize: 8, color: grayLight, marginTop: 2 }}>{content.investment.ongoing.sellerise.detail}</Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: green, flexShrink: 0 }}>{content.investment.ongoing.sellerise.price}</Text>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 10 }}>
              <Text style={{ fontSize: 7.5, color: grayLight, lineHeight: 1.5 }}>{content.investment.ongoing.commission.description}</Text>
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
          <View style={{ borderTopWidth: 0.5, borderTopColor: '#e5e7eb', marginTop: 4, paddingTop: 6, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{content.investment.example.netProfit.label}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: lime }}>{content.investment.example.netProfit.value}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green }}>{content.investment.example.commission.label}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: green }}>{content.investment.example.commission.value}</Text>
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

        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 9: Terms */}
      <Page size="A4" style={{ ...s.page, padding: 50 }}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>TERMS</Text>
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
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 10: Agreement Details */}
      <Page size="A4" style={{ ...s.pageBg, padding: 50 }} wrap={false}>
        <View style={s.accent} />
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: lime, letterSpacing: 3, marginBottom: 6 }}>AGREEMENT</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: green, marginBottom: 18 }}>{content.legalTerms.title}</Text>
        {content.legalTerms.sections.map((section, i) => (
          <View key={i} style={{ marginBottom: 14 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: green, marginBottom: 5 }}>{section.heading}</Text>
            {section.items.map((item, j) => (
              <View key={j} style={{ flexDirection: 'row', gap: 6, marginBottom: 4, paddingLeft: 10 }}>
                <Text style={{ fontSize: 8, color: gray }}>{j + 1}.</Text>
                <Text style={{ fontSize: 8, color: gray, lineHeight: 1.5, flex: 1 }}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={s.footer}>Hipervínculo · hipervinculo.net</Text>
      </Page>

      {/* PAGE 11: Contact */}
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

import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Circle, Rect } from '@react-pdf/renderer';
import { LVTherapyContent } from '../data/lvTherapyPresentationContent';

const colors = {
  darkGreen: '#2d4a2d',
  limeGreen: '#8BC34A',
  limeGreenLight: '#e8f5e0',
  background: '#f8f9f5',
  white: '#ffffff',
  gray: '#6b7280',
  red: '#ef4444',
  redLight: '#fef2f2',
};

const styles = StyleSheet.create({
  page: { width: 1920, height: 1080, backgroundColor: colors.background, padding: 80, fontFamily: 'Helvetica', position: 'relative', display: 'flex', flexDirection: 'column' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  logo: { height: 64, objectFit: 'contain' as const },
  accentBar: { width: 96, height: 8, backgroundColor: colors.limeGreen, borderRadius: 4 },
  title: { fontSize: 72, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 16 },
  headline: { fontSize: 40, fontWeight: 'bold', color: colors.limeGreen, marginBottom: 32 },
  description: { fontSize: 32, color: colors.gray, lineHeight: 1.5, marginBottom: 32 },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 28, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 },
  cardTitle: { fontSize: 28, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 10 },
  cardDescription: { fontSize: 22, color: colors.gray, lineHeight: 1.4 },
  grid2: { flexDirection: 'row' as const, gap: 32 },
  grid3: { flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 24 },
  statCard: { backgroundColor: colors.white, borderRadius: 20, padding: 40, alignItems: 'center' as const, justifyContent: 'center' as const, flex: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 12 },
  statValue: { fontSize: 72, fontWeight: 'bold', color: colors.limeGreen },
  statLabel: { fontSize: 24, color: colors.darkGreen, textAlign: 'center' as const, marginTop: 12 },
  credentialItem: { width: '50%', flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 16 },
  coverContainer: { flex: 1, alignItems: 'center' as const, justifyContent: 'center' as const },
  coverLogo: { height: 120, marginBottom: 48, objectFit: 'contain' as const },
  coverLine: { width: 120, height: 8, backgroundColor: colors.limeGreen, marginBottom: 32, borderRadius: 4 },
  coverTitle: { fontSize: 96, fontWeight: 'bold', color: colors.darkGreen, textAlign: 'center' as const, marginBottom: 24 },
  coverSubtitle: { fontSize: 40, color: colors.darkGreen, opacity: 0.8, textAlign: 'center' as const, marginBottom: 32 },
  coverTagline: { fontSize: 28, color: colors.limeGreen, fontWeight: 'bold', textAlign: 'center' as const, letterSpacing: 2, textTransform: 'uppercase' as const },
  coverSupertitle: { fontSize: 32, fontWeight: 'bold', color: colors.limeGreen, textAlign: 'center' as const, marginBottom: 16, letterSpacing: 4, textTransform: 'uppercase' as const },
  problemCard: { backgroundColor: colors.white, borderRadius: 16, padding: 24, flexDirection: 'row' as const, alignItems: 'flex-start' as const, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 },
  insightBox: { backgroundColor: colors.redLight, borderRadius: 16, padding: 28, flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 24 },
  principleBox: { backgroundColor: colors.darkGreen, borderRadius: 16, padding: 32 },
  principleText: { fontSize: 36, fontWeight: 'bold', color: colors.white, marginBottom: 12 },
  principleNote: { fontSize: 26, color: 'rgba(255,255,255,0.8)' },
  pricingCard: { backgroundColor: colors.white, borderRadius: 20, padding: 36, flex: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 12 },
  pricingCardDark: { backgroundColor: colors.darkGreen, borderRadius: 20, padding: 36, flex: 1 },
  priceTitle: { fontSize: 32, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 12 },
  priceTitleLight: { fontSize: 32, fontWeight: 'bold', color: colors.white, marginBottom: 12 },
  priceValue: { fontSize: 48, fontWeight: 'bold', color: colors.limeGreen, marginBottom: 28 },
  priceItem: { flexDirection: 'row' as const, alignItems: 'flex-start' as const, marginBottom: 14 },
  priceItemText: { fontSize: 24, color: colors.gray, marginLeft: 14, flex: 1 },
  priceItemTextLight: { fontSize: 24, color: 'rgba(255,255,255,0.9)', marginLeft: 14, flex: 1 },
  noteBox: { backgroundColor: colors.limeGreenLight, borderRadius: 16, padding: 28, marginTop: 32, alignItems: 'center' as const },
  noteText: { fontSize: 26, fontWeight: 'medium' as const, color: colors.darkGreen, textAlign: 'center' as const },
  serviceCard: { backgroundColor: colors.white, borderRadius: 16, padding: 28, flexDirection: 'row' as const, alignItems: 'flex-start' as const, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 },
  contactPage: { width: 1920, height: 1080, flexDirection: 'row' as const, fontFamily: 'Helvetica' },
  contactLeft: { width: '60%', backgroundColor: colors.darkGreen, padding: 80, justifyContent: 'center' as const, position: 'relative' as const },
  contactRight: { width: '40%', backgroundColor: colors.white, padding: 80, justifyContent: 'center' as const, alignItems: 'center' as const, position: 'relative' as const },
  contactTitle: { fontSize: 72, fontWeight: 'bold', color: colors.white, marginBottom: 16 },
  contactHeadline: { fontSize: 36, fontWeight: 'bold', color: colors.limeGreen, marginBottom: 28 },
  contactDesc: { fontSize: 28, color: 'rgba(255,255,255,0.8)', marginBottom: 40, lineHeight: 1.5, maxWidth: 600 },
  contactInfoItem: { flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 28 },
  contactIconBox: { width: 56, height: 56, borderRadius: 12, backgroundColor: 'rgba(139, 195, 74, 0.2)', alignItems: 'center' as const, justifyContent: 'center' as const, marginRight: 20 },
  contactLabel: { fontSize: 20, color: 'rgba(255,255,255,0.6)', marginBottom: 4 },
  contactValue: { fontSize: 26, fontWeight: 'medium' as const, color: colors.white },
  ctaButton: { backgroundColor: colors.limeGreen, paddingHorizontal: 48, paddingVertical: 24, borderRadius: 40, marginTop: 32 },
  ctaText: { fontSize: 26, fontWeight: 'bold', color: colors.darkGreen },
  rightLogo: { height: 100, marginBottom: 32, objectFit: 'contain' as const },
  rightLine: { width: 100, height: 6, backgroundColor: colors.limeGreen, marginBottom: 32, borderRadius: 3 },
  rightTagline: { fontSize: 24, color: colors.darkGreen, textAlign: 'center' as const, maxWidth: 360 },
});

const CheckIcon = ({ size = 20, color = colors.limeGreen }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
    <Path d="M9 12l2 2 4-4" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const XIcon = ({ size = 20, color = colors.red }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
    <Path d="M15 9l-6 6M9 9l6 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const AlertIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="none" stroke={colors.red} strokeWidth="2" />
    <Path d="M12 9v4M12 17h.01" fill="none" stroke={colors.red} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const ArrowIcon = ({ size = 16, color = colors.limeGreen }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MailIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Path d="M22 6l-10 7L2 6" fill="none" stroke={colors.limeGreen} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
  </Svg>
);

const MapPinIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Circle cx="12" cy="10" r="3" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
  </Svg>
);

const GlobeIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
  </Svg>
);

const SearchIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="11" cy="11" r="8" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Path d="M21 21l-4.35-4.35" fill="none" stroke={colors.limeGreen} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const VideoIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M23 7l-7 5 7 5V7z" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Rect x="1" y="5" width="15" height="14" rx="2" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
  </Svg>
);

const SlideHeader = ({ logoBase64 }: { logoBase64: string }) => (
  <View style={styles.header}>
    <Image src={logoBase64} style={styles.logo} />
    <View style={styles.accentBar} />
  </View>
);

interface LVTherapyPDFDocumentProps {
  content: LVTherapyContent;
  logoBase64: string;
}

export const LVTherapyPDFDocument = ({ content, logoBase64 }: LVTherapyPDFDocumentProps) => (
  <Document>
    {/* Cover */}
    <Page size={[1920, 1080]} style={styles.page}>
      <View style={styles.coverContainer}>
        <Image src={logoBase64} style={styles.coverLogo} />
        <Text style={styles.coverSupertitle}>{content.cover.supertitle}</Text>
        <View style={styles.coverLine} />
        <Text style={styles.coverTitle}>{content.cover.title}</Text>
        <Text style={styles.coverSubtitle}>{content.cover.subtitle}</Text>
        <View style={styles.coverLine} />
        <Text style={styles.coverTagline}>{content.cover.tagline}</Text>
      </View>
    </Page>

    {/* About */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.about.title}</Text>
      <Text style={styles.description}>{content.about.description}</Text>
      <View style={[styles.grid3, { marginBottom: 32 }]}>
        {content.about.stats.map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, marginTop: 32 }}>
        {content.about.credentials.map((cred, idx) => (
          <View key={idx} style={styles.credentialItem}>
            <CheckIcon size={28} />
            <Text style={{ fontSize: 28, color: colors.gray, marginLeft: 12 }}>{cred}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* Audit - Strengths & Weaknesses */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.audit.title}</Text>
      <Text style={styles.headline}>{content.audit.headline}</Text>
      <View style={[styles.grid2, { flex: 1, gap: 40 }]}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 20 }}>
            <CheckIcon size={28} />
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.darkGreen, marginLeft: 12 }}>Strengths</Text>
          </View>
          {content.audit.strengths.map((item, idx) => (
            <View key={idx} style={[styles.card, { marginBottom: 16 }]}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 20 }}>
            <XIcon size={28} />
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.red, marginLeft: 12 }}>Growth Opportunities</Text>
          </View>
          {content.audit.weaknesses.map((item, idx) => (
            <View key={idx} style={[styles.card, { marginBottom: 16, borderLeftWidth: 4, borderLeftColor: colors.red }]}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>

    {/* Problem */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.problem.title}</Text>
      <Text style={styles.headline}>{content.problem.headline}</Text>
      {content.problem.points.map((point, idx) => (
        <View key={idx} style={styles.problemCard}>
          <XIcon size={28} />
          <Text style={{ fontSize: 26, color: colors.gray, marginLeft: 16, flex: 1 }}>{point}</Text>
        </View>
      ))}
      <View style={styles.insightBox}>
        <AlertIcon size={32} />
        <Text style={{ fontSize: 28, color: colors.red, marginLeft: 16, flex: 1, fontWeight: 'bold' }}>{content.problem.insight}</Text>
      </View>
      <View style={styles.principleBox}>
        <Text style={styles.principleText}>{content.problem.principle}</Text>
        <Text style={styles.principleNote}>{content.problem.principleNote}</Text>
      </View>
    </Page>

    {/* Solution */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.solution.title}</Text>
      <Text style={styles.headline}>{content.solution.headline}</Text>
      <Text style={styles.description}>{content.solution.intro}</Text>
      <View style={{ gap: 20 }}>
        {content.solution.items.map((item, idx) => (
          <View key={idx} style={[styles.card, { flexDirection: 'row' as const, alignItems: 'flex-start' as const }]}>
            <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: colors.limeGreen, alignItems: 'center' as const, justifyContent: 'center' as const, marginRight: 20 }}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.white }}>{idx + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>

    {/* Google Ads */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.googleAds.title}</Text>
      <Text style={styles.headline}>{content.googleAds.headline}</Text>
      <Text style={{ fontSize: 28, color: colors.gray, lineHeight: 1.5, marginBottom: 28 }}>{content.googleAds.description}</Text>
      <View style={[styles.grid2, { flex: 1, gap: 40 }]}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 20 }}>
            <SearchIcon size={24} />
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginLeft: 12 }}>Target Keywords</Text>
          </View>
          {content.googleAds.targeting.map((kw, idx) => (
            <View key={idx} style={{ backgroundColor: colors.white, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4 }}>
              <Text style={{ fontSize: 22, color: colors.darkGreen, fontFamily: 'Courier' }}>{kw}</Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1, gap: 20 }}>
          {content.googleAds.adTypes.map((type, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{type.title}</Text>
              <Text style={styles.cardDescription}>{type.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>

    {/* Meta Ads + Video */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.metaAdsVideo.title}</Text>
      <Text style={styles.headline}>{content.metaAdsVideo.headline}</Text>
      <Text style={{ fontSize: 28, color: colors.gray, lineHeight: 1.5, marginBottom: 24 }}>{content.metaAdsVideo.description}</Text>
      <View style={[styles.grid2, { flex: 1, gap: 40 }]}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 16 }}>Video Concepts</Text>
          {content.metaAdsVideo.concepts.map((concept, idx) => (
            <View key={idx} style={[styles.card, { marginBottom: 16 }]}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.limeGreen, marginBottom: 6 }}>{concept.title}</Text>
              <Text style={styles.cardDescription}>{concept.description}</Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 16 }}>Pain Points to Address</Text>
          <View style={{ backgroundColor: colors.darkGreen, borderRadius: 20, padding: 32 }}>
            {content.metaAdsVideo.painPoints.map((point, idx) => (
              <View key={idx} style={{ flexDirection: 'row' as const, alignItems: 'flex-start' as const, marginBottom: 16 }}>
                <VideoIcon size={20} />
                <Text style={{ fontSize: 24, color: 'rgba(255,255,255,0.9)', marginLeft: 14, flex: 1 }}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>

    {/* Landing Page */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.landingPage.title}</Text>
      <Text style={styles.headline}>{content.landingPage.headline}</Text>
      <Text style={{ fontSize: 28, color: colors.gray, lineHeight: 1.5, marginBottom: 24 }}>{content.landingPage.description}</Text>
      <View style={[styles.grid2, { flex: 1, gap: 40 }]}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 16 }}>Features</Text>
          {content.landingPage.features.map((feature, idx) => (
            <View key={idx} style={{ flexDirection: 'row' as const, alignItems: 'flex-start' as const, marginBottom: 12 }}>
              <CheckIcon size={22} />
              <Text style={{ fontSize: 24, color: colors.gray, marginLeft: 12, flex: 1 }}>{feature}</Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 16 }}>Current vs. Proposed</Text>
          <View style={{ backgroundColor: colors.white, borderRadius: 16, overflow: 'hidden' as const, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8 }}>
            <View style={{ flexDirection: 'row' as const, backgroundColor: colors.darkGreen, paddingVertical: 14, paddingHorizontal: 20 }}>
              <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: colors.white }}>Metric</Text>
              <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: colors.white }}>Current</Text>
              <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: colors.white }}>Proposed</Text>
            </View>
            {content.landingPage.comparison.map((row, idx) => (
              <View key={idx} style={{ flexDirection: 'row' as const, paddingVertical: 14, paddingHorizontal: 20, borderBottomWidth: idx < content.landingPage.comparison.length - 1 ? 1 : 0, borderBottomColor: '#e5e7eb' }}>
                <Text style={{ flex: 1, fontSize: 22, fontWeight: 'bold', color: colors.darkGreen }}>{row.label}</Text>
                <Text style={{ flex: 1, fontSize: 22, color: colors.red }}>{row.current}</Text>
                <Text style={{ flex: 1, fontSize: 22, fontWeight: 'bold', color: colors.limeGreen }}>{row.proposed}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>

    {/* Local SEO */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.localSeo.title}</Text>
      <Text style={styles.headline}>{content.localSeo.headline}</Text>
      <Text style={{ fontSize: 28, color: colors.gray, lineHeight: 1.5, marginBottom: 32 }}>{content.localSeo.description}</Text>
      <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 24 }}>
        {content.localSeo.actions.map((action, idx) => (
          <View key={idx} style={{ width: '48%', backgroundColor: colors.white, borderRadius: 16, padding: 28, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8 }}>
            <View style={{ flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 12 }}>
              <View style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: colors.limeGreenLight, alignItems: 'center' as const, justifyContent: 'center' as const, marginRight: 12 }}>
                <MapPinIcon size={20} />
              </View>
              <Text style={styles.cardTitle}>{action.title}</Text>
            </View>
            <Text style={styles.cardDescription}>{action.description}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* Qualification Bot */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.qualificationBot.title}</Text>
      <Text style={styles.headline}>{content.qualificationBot.headline}</Text>
      <Text style={{ fontSize: 28, color: colors.gray, lineHeight: 1.5, marginBottom: 24 }}>{content.qualificationBot.description}</Text>
      <View style={[styles.grid2, { flex: 1, gap: 40 }]}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 16 }}>Patient Journey</Text>
          {content.qualificationBot.flow.map((item, idx) => (
            <View key={idx} style={{ flexDirection: 'row' as const, alignItems: 'flex-start' as const, marginBottom: 20 }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.limeGreen, alignItems: 'center' as const, justifyContent: 'center' as const, marginRight: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.white }}>{idx + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 6 }}>{item.step}</Text>
                <Text style={{ fontSize: 22, color: colors.gray, lineHeight: 1.4 }}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 16 }}>Key Benefits</Text>
          <View style={{ backgroundColor: colors.darkGreen, borderRadius: 20, padding: 32 }}>
            {content.qualificationBot.benefits.map((benefit, idx) => (
              <View key={idx} style={{ flexDirection: 'row' as const, alignItems: 'flex-start' as const, marginBottom: 16 }}>
                <CheckIcon size={24} color={colors.limeGreen} />
                <Text style={{ fontSize: 24, color: 'rgba(255,255,255,0.9)', marginLeft: 14, flex: 1 }}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>

    {/* Pricing */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.pricing.title}</Text>
      <Text style={styles.headline}>{content.pricing.headline}</Text>
      <View style={[styles.grid2, { gap: 40, flex: 1 }]}>
        <View style={styles.pricingCard}>
          <Text style={styles.priceTitle}>{content.pricing.setup.title}</Text>
          <Text style={styles.priceValue}>{content.pricing.setup.price}</Text>
          {content.pricing.setup.includes.map((item, idx) => (
            <View key={idx} style={styles.priceItem}>
              <CheckIcon size={22} />
              <Text style={styles.priceItemText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.pricingCardDark}>
          <Text style={styles.priceTitleLight}>{content.pricing.monthly.title}</Text>
          <Text style={styles.priceValue}>{content.pricing.monthly.price}</Text>
          {content.pricing.monthly.includes.map((item, idx) => (
            <View key={idx} style={styles.priceItem}>
              <CheckIcon size={22} />
              <Text style={styles.priceItemTextLight}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.noteBox}>
        <Text style={styles.noteText}>{content.pricing.note}</Text>
      </View>
    </Page>

    {/* Other Services */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.otherServices.title}</Text>
      <Text style={styles.headline}>{content.otherServices.headline}</Text>
      <View style={{ gap: 20 }}>
        {content.otherServices.services.map((svc, idx) => (
          <View key={idx} style={styles.serviceCard}>
            <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: colors.limeGreenLight, alignItems: 'center' as const, justifyContent: 'center' as const, marginRight: 20 }}>
              <ArrowIcon size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 8 }}>{svc.title}</Text>
              <Text style={{ fontSize: 22, color: colors.gray, lineHeight: 1.4 }}>{svc.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>

    {/* Contact */}
    <Page size={[1920, 1080]} style={styles.contactPage}>
      <View style={styles.contactLeft}>
        <Text style={styles.contactTitle}>{content.contact.title}</Text>
        <Text style={styles.contactHeadline}>{content.contact.headline}</Text>
        <Text style={styles.contactDesc}>{content.contact.description}</Text>
        {[
          { icon: <MailIcon size={24} />, label: 'Email', value: content.contact.email },
          { icon: <PhoneIcon size={24} />, label: 'Phone', value: content.contact.phone },
          { icon: <MapPinIcon size={24} />, label: 'Address', value: content.contact.address },
          { icon: <GlobeIcon size={24} />, label: 'Website', value: content.contact.website },
        ].map((item, idx) => (
          <View key={idx} style={styles.contactInfoItem}>
            <View style={styles.contactIconBox}>{item.icon}</View>
            <View>
              <Text style={styles.contactLabel}>{item.label}</Text>
              <Text style={styles.contactValue}>{item.value}</Text>
            </View>
          </View>
        ))}
        <View style={styles.ctaButton}>
          <Text style={styles.ctaText}>{content.contact.cta}</Text>
        </View>
      </View>
      <View style={styles.contactRight}>
        <Image src={logoBase64} style={styles.rightLogo} />
        <View style={styles.rightLine} />
        <Text style={styles.rightTagline}>Performance-Driven Growth Systems</Text>
      </View>
    </Page>
  </Document>
);

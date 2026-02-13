import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Circle, Rect } from '@react-pdf/renderer';
import { MetaAdsContent } from '../data/metaAdsPresentationContent';

// Brand colors
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
  page: {
    width: 1920,
    height: 1080,
    backgroundColor: colors.background,
    padding: 80,
    fontFamily: 'Helvetica',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: { height: 64, objectFit: 'contain' as const },
  accentBar: { width: 96, height: 8, backgroundColor: colors.limeGreen, borderRadius: 4 },
  title: { fontSize: 72, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 16 },
  headline: { fontSize: 40, fontWeight: 'bold', color: colors.limeGreen, marginBottom: 32 },
  description: { fontSize: 32, color: colors.gray, lineHeight: 1.5, marginBottom: 32 },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 28, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 },
  cardTitle: { fontSize: 28, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 10 },
  cardDescription: { fontSize: 22, color: colors.gray, lineHeight: 1.4 },
  grid3: { flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 24 },
  grid2: { flexDirection: 'row' as const, gap: 32 },
  iconBoxRect: { width: 48, height: 48, borderRadius: 10, backgroundColor: colors.limeGreenLight, alignItems: 'center' as const, justifyContent: 'center' as const, marginRight: 16 },
  iconBoxSmall: { width: 44, height: 44, borderRadius: 10, backgroundColor: colors.limeGreenLight, alignItems: 'center' as const, justifyContent: 'center' as const },
  statCard: { backgroundColor: colors.white, borderRadius: 20, padding: 40, alignItems: 'center' as const, justifyContent: 'center' as const, flex: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 12 },
  statValue: { fontSize: 72, fontWeight: 'bold', color: colors.limeGreen },
  statLabel: { fontSize: 24, color: colors.darkGreen, textAlign: 'center' as const, marginTop: 12 },
  credentialsGrid: { flexDirection: 'row' as const, flexWrap: 'wrap' as const, marginTop: 32 },
  credentialItem: { width: '50%', flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 16 },
  coverContainer: { flex: 1, alignItems: 'center' as const, justifyContent: 'center' as const },
  coverLogo: { height: 120, marginBottom: 48, objectFit: 'contain' as const },
  coverLine: { width: 120, height: 8, backgroundColor: colors.limeGreen, marginBottom: 32, borderRadius: 4 },
  coverTitle: { fontSize: 96, fontWeight: 'bold', color: colors.darkGreen, textAlign: 'center' as const, marginBottom: 24 },
  coverSubtitle: { fontSize: 40, color: colors.darkGreen, opacity: 0.8, textAlign: 'center' as const, marginBottom: 32 },
  coverTagline: { fontSize: 28, color: colors.limeGreen, fontWeight: 'bold', textAlign: 'center' as const, letterSpacing: 2, textTransform: 'uppercase' as const },
  problemCard: { backgroundColor: colors.white, borderRadius: 16, padding: 24, flexDirection: 'row' as const, alignItems: 'flex-start' as const, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 },
  insightBox: { backgroundColor: colors.redLight, borderRadius: 16, padding: 28, flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 24 },
  principleBox: { backgroundColor: colors.darkGreen, borderRadius: 16, padding: 32 },
  principleText: { fontSize: 36, fontWeight: 'bold', color: colors.white, marginBottom: 12 },
  principleNote: { fontSize: 26, color: 'rgba(255,255,255,0.8)' },
  phaseBox: { flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 32 },
  phaseNumber: { width: 56, height: 56, borderRadius: 12, backgroundColor: colors.limeGreen, alignItems: 'center' as const, justifyContent: 'center' as const, marginRight: 20 },
  phaseNumberText: { fontSize: 32, fontWeight: 'bold', color: colors.white },
  phaseTitle: { fontSize: 40, fontWeight: 'bold', color: colors.darkGreen },
  letterBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(45, 74, 45, 0.1)', alignItems: 'center' as const, justifyContent: 'center' as const, marginRight: 16 },
  letterText: { fontSize: 20, fontWeight: 'bold', color: colors.darkGreen },
  progressDots: { flexDirection: 'row' as const, justifyContent: 'center' as const, alignItems: 'center' as const, marginTop: 32, gap: 12 },
  progressDot: { width: 16, height: 16, borderRadius: 8 },
  techCategory: { backgroundColor: colors.white, borderRadius: 16, padding: 28, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 },
  techHeader: { flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 16 },
  techName: { fontSize: 26, fontWeight: 'bold', color: colors.darkGreen },
  techTools: { flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 10 },
  techTool: { backgroundColor: 'rgba(45, 74, 45, 0.08)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  techToolText: { fontSize: 20, color: colors.darkGreen },
  metricCard: { backgroundColor: colors.white, borderRadius: 16, padding: 28, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 },
  metricHeader: { flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 12 },
  metricName: { fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginLeft: 12 },
  metricDesc: { fontSize: 22, color: colors.gray, lineHeight: 1.4 },
  deliverables: { backgroundColor: colors.darkGreen, borderRadius: 20, padding: 36, marginTop: 28 },
  deliverableTitle: { fontSize: 32, fontWeight: 'bold', color: colors.white, marginBottom: 20 },
  deliverableGrid: { flexDirection: 'row' as const, flexWrap: 'wrap' as const },
  deliverableItem: { width: '50%', flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 14 },
  deliverableText: { fontSize: 24, color: 'rgba(255,255,255,0.9)', marginLeft: 14 },
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
  serviceContent: { flex: 1 },
  serviceTitle: { fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 10 },
  serviceDesc: { fontSize: 22, color: colors.gray, lineHeight: 1.4 },
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
  // Creative Scope specific
  scopeColumn: { flex: 1, borderRadius: 20, padding: 36 },
  scopeColumnWhite: { backgroundColor: colors.white, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 12 },
  scopeColumnDark: { backgroundColor: colors.darkGreen },
  scopeColumnTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
  scopeItem: { flexDirection: 'row' as const, alignItems: 'flex-start' as const, marginBottom: 16 },
  scopeItemText: { fontSize: 22, marginLeft: 14, flex: 1, lineHeight: 1.4 },
  clarificationBox: { backgroundColor: colors.limeGreenLight, borderRadius: 16, padding: 28, marginTop: 32, flexDirection: 'row' as const, alignItems: 'flex-start' as const },
  clarificationText: { fontSize: 24, color: colors.darkGreen, marginLeft: 14, flex: 1, lineHeight: 1.4 },
});

// SVG Icons
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

const BarChartIcon = ({ size = 16 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect x="3" y="12" width="4" height="9" rx="1" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Rect x="10" y="8" width="4" height="13" rx="1" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Rect x="17" y="3" width="4" height="18" rx="1" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
  </Svg>
);

const ServerIcon = ({ size = 16 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect x="2" y="2" width="20" height="8" rx="2" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Rect x="2" y="14" width="20" height="8" rx="2" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Circle cx="6" cy="6" r="1" fill={colors.limeGreen} />
    <Circle cx="6" cy="18" r="1" fill={colors.limeGreen} />
  </Svg>
);

const InfoIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Path d="M12 16v-4M12 8h.01" fill="none" stroke={colors.limeGreen} strokeWidth="2" strokeLinecap="round" />
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

const SlideHeader = ({ logoBase64 }: { logoBase64: string }) => (
  <View style={styles.header}>
    <Image src={logoBase64} style={styles.logo} />
    <View style={styles.accentBar} />
  </View>
);

// Creative Scope Slide (unique to Meta Ads)
const CreativeScopeSlidePDF = ({ content, logoBase64 }: { content: MetaAdsContent['creativeScope']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    
    <View style={[styles.grid2, { gap: 40, flex: 1 }]}>
      <View style={[styles.scopeColumn, styles.scopeColumnWhite]}>
        <Text style={[styles.scopeColumnTitle, { color: colors.limeGreen }]}>
          {content.title === 'Creative Scope' ? '✓ What We Create' : '✓ Lo Que Creamos'}
        </Text>
        {content.included.map((item, idx) => (
          <View key={idx} style={styles.scopeItem}>
            <CheckIcon size={24} />
            <Text style={[styles.scopeItemText, { color: colors.gray }]}>{item}</Text>
          </View>
        ))}
      </View>
      
      <View style={[styles.scopeColumn, styles.scopeColumnDark]}>
        <Text style={[styles.scopeColumnTitle, { color: colors.white }]}>
          {content.title === 'Creative Scope' ? '✗ What You Provide' : '✗ Lo Que Tú Provees'}
        </Text>
        {content.notIncluded.map((item, idx) => (
          <View key={idx} style={styles.scopeItem}>
            <XIcon size={24} color="rgba(239, 68, 68, 0.7)" />
            <Text style={[styles.scopeItemText, { color: 'rgba(255,255,255,0.9)' }]}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
    
    <View style={styles.clarificationBox}>
      <InfoIcon size={32} />
      <Text style={styles.clarificationText}>{content.clarification}</Text>
    </View>
  </Page>
);

// Main PDF Document
interface MetaAdsPDFDocumentProps {
  content: MetaAdsContent;
  logoBase64: string;
}

export const MetaAdsPDFDocument = ({ content, logoBase64 }: MetaAdsPDFDocumentProps) => (
  <Document>
    {/* Cover */}
    <Page size={[1920, 1080]} style={styles.page}>
      <View style={styles.coverContainer}>
        <Image src={logoBase64} style={styles.coverLogo} />
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
      <View style={styles.credentialsGrid}>
        {content.about.credentials.map((cred, idx) => (
          <View key={idx} style={styles.credentialItem}>
            <CheckIcon size={28} />
            <Text style={{ fontSize: 28, color: colors.gray, marginLeft: 12 }}>{cred}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* Problem */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.problem.title}</Text>
      <Text style={[styles.description, { marginBottom: 24 }]}>{content.problem.headline}</Text>
      <View style={[styles.grid2, { marginBottom: 24, flexWrap: 'wrap', gap: 20 }]}>
        {content.problem.points.map((point, idx) => (
          <View key={idx} style={[styles.problemCard, { width: '48%' }]}>
            <View style={{ marginRight: 14 }}><XIcon size={28} /></View>
            <Text style={{ fontSize: 26, color: colors.gray, flex: 1 }}>{point}</Text>
          </View>
        ))}
      </View>
      <View style={styles.insightBox}>
        <View style={{ marginRight: 16 }}><AlertIcon size={40} /></View>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#b91c1c', flex: 1 }}>{content.problem.insight}</Text>
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
      <Text style={[styles.description, { fontSize: 28, marginBottom: 28 }]}>{content.solution.intro}</Text>
      <View style={[styles.grid3, { gap: 24 }]}>
        {content.solution.items.map((item, idx) => (
          <View key={idx} style={[styles.card, { width: '31%', flexDirection: 'row' }]}>
            <View style={styles.iconBoxRect}><CheckIcon size={24} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>

    {/* Methodology 1-4 */}
    {[content.methodology1, content.methodology2, content.methodology3, content.methodology4].map((meth, mIdx) => (
      <Page key={mIdx} size={[1920, 1080]} style={styles.page}>
        <SlideHeader logoBase64={logoBase64} />
        {mIdx === 0 && <Text style={styles.title}>{(meth as typeof content.methodology1).title}</Text>}
        <View style={styles.phaseBox}>
          <View style={styles.phaseNumber}><Text style={styles.phaseNumberText}>{mIdx + 1}</Text></View>
          <Text style={styles.phaseTitle}>{meth.phase}</Text>
        </View>
        <View style={{ gap: 16, flex: 1 }}>
          {meth.items.map((item, idx) => (
            <View key={idx} style={[styles.card, { flexDirection: 'row', padding: 24 }]}>
              <View style={styles.letterBox}><Text style={styles.letterText}>{String.fromCharCode(65 + idx)}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardTitle, { fontSize: 26 }]}>{item.title}</Text>
                <Text style={[styles.cardDescription, { fontSize: 22 }]}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.progressDots}>
          {[1, 2, 3, 4].map((num) => (
            <View key={num} style={[styles.progressDot, { backgroundColor: num === mIdx + 1 ? colors.limeGreen : 'rgba(139, 195, 74, 0.2)' }]} />
          ))}
        </View>
      </Page>
    ))}

    {/* Tech Stack */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.techStack.title}</Text>
      <Text style={styles.headline}>{content.techStack.headline}</Text>
      <View style={[styles.grid3, { gap: 24, flex: 1 }]}>
        {content.techStack.categories.map((cat, idx) => (
          <View key={idx} style={[styles.techCategory, { width: '31%' }]}>
            <View style={styles.techHeader}>
              <View style={styles.iconBoxSmall}><ServerIcon size={24} /></View>
              <Text style={[styles.techName, { marginLeft: 14 }]}>{cat.name}</Text>
            </View>
            <View style={styles.techTools}>
              {cat.tools.map((tool, tidx) => (
                <View key={tidx} style={styles.techTool}><Text style={styles.techToolText}>{tool}</Text></View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Page>

    {/* Reporting */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.reporting.title}</Text>
      <Text style={styles.headline}>{content.reporting.headline}</Text>
      <View style={[styles.grid3, { gap: 20, marginBottom: 24, flex: 1 }]}>
        {content.reporting.metrics.map((metric, idx) => (
          <View key={idx} style={[styles.metricCard, { width: '31%' }]}>
            <View style={styles.metricHeader}>
              <BarChartIcon size={28} />
              <Text style={styles.metricName}>{metric.name}</Text>
            </View>
            <Text style={styles.metricDesc}>{metric.description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.deliverables}>
        <Text style={styles.deliverableTitle}>Deliverables</Text>
        <View style={styles.deliverableGrid}>
          {content.reporting.deliverables.map((item, idx) => (
            <View key={idx} style={styles.deliverableItem}>
              <CheckIcon size={24} color={colors.limeGreen} />
              <Text style={styles.deliverableText}>{item}</Text>
            </View>
          ))}
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
              <CheckIcon size={24} />
              <Text style={styles.priceItemText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.pricingCardDark}>
          <Text style={styles.priceTitleLight}>{content.pricing.monthly.title}</Text>
          <Text style={styles.priceValue}>{content.pricing.monthly.price}</Text>
          {content.pricing.monthly.includes.map((item, idx) => (
            <View key={idx} style={styles.priceItem}>
              <CheckIcon size={24} />
              <Text style={styles.priceItemTextLight}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.noteBox}>
        <Text style={styles.noteText}>{content.pricing.note}</Text>
      </View>
    </Page>

    {/* Creative Scope */}
    <CreativeScopeSlidePDF content={content.creativeScope} logoBase64={logoBase64} />

    {/* Other Services */}
    <Page size={[1920, 1080]} style={styles.page}>
      <SlideHeader logoBase64={logoBase64} />
      <Text style={styles.title}>{content.otherServices.title}</Text>
      <Text style={styles.headline}>{content.otherServices.headline}</Text>
      <View style={[styles.grid3, { gap: 24, flex: 1 }]}>
        {content.otherServices.services.map((service, idx) => (
          <View key={idx} style={[styles.serviceCard, { width: '31%' }]}>
            <View style={styles.iconBoxRect}><ArrowIcon size={24} /></View>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDesc}>{service.description}</Text>
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
        <View style={styles.contactInfoItem}>
          <View style={styles.contactIconBox}><MailIcon size={32} /></View>
          <View><Text style={styles.contactLabel}>Email</Text><Text style={styles.contactValue}>{content.contact.email}</Text></View>
        </View>
        <View style={styles.contactInfoItem}>
          <View style={styles.contactIconBox}><PhoneIcon size={32} /></View>
          <View><Text style={styles.contactLabel}>Phone</Text><Text style={styles.contactValue}>{content.contact.phone}</Text></View>
        </View>
        <View style={styles.contactInfoItem}>
          <View style={styles.contactIconBox}><MapPinIcon size={32} /></View>
          <View><Text style={styles.contactLabel}>Address</Text><Text style={styles.contactValue}>{content.contact.address.replace('\n', ', ')}</Text></View>
        </View>
        <View style={styles.contactInfoItem}>
          <View style={styles.contactIconBox}><GlobeIcon size={32} /></View>
          <View><Text style={styles.contactLabel}>Website</Text><Text style={styles.contactValue}>{content.contact.website}</Text></View>
        </View>
        <View style={styles.ctaButton}><Text style={styles.ctaText}>{content.contact.cta}</Text></View>
      </View>
      <View style={styles.contactRight}>
        <Image src={logoBase64} style={styles.rightLogo} />
        <View style={styles.rightLine} />
        <Text style={styles.rightTagline}>Performance-driven growth systems for eCommerce brands ready to scale.</Text>
      </View>
    </Page>
  </Document>
);

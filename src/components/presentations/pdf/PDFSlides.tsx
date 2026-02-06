import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Circle, Rect, Line } from '@react-pdf/renderer';
import { LeadGenContent } from '../data/leadGenPresentationContent';

// Brand colors
const colors = {
  darkGreen: '#2d4a2d',
  limeGreen: '#8BC34A',
  limeGreenLight: '#e8f5e0',
  background: '#f8f9f5',
  white: '#ffffff',
  gray: '#6b7280',
  grayLight: '#9ca3af',
  red: '#ef4444',
  redLight: '#fef2f2',
};

// Create styles
const styles = StyleSheet.create({
  // Common page styles
  page: {
    width: 1920,
    height: 1080,
    backgroundColor: colors.background,
    padding: 64,
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    height: 48,
    objectFit: 'contain',
  },
  accentBar: {
    width: 80,
    height: 6,
    backgroundColor: colors.limeGreen,
    borderRadius: 3,
  },
  // Typography
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.limeGreen,
    marginBottom: 20,
  },
  description: {
    fontSize: 22,
    color: colors.gray,
    lineHeight: 1.5,
    marginBottom: 24,
  },
  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 1.4,
  },
  // Grid layouts
  grid3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  grid2: {
    flexDirection: 'row',
    gap: 24,
  },
  gridItem3: {
    width: '31.5%',
  },
  gridItem2: {
    width: '48%',
  },
  // Icon boxes
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.limeGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconBoxSmall: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.limeGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxRect: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.limeGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  // Stats
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
  },
  statValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.limeGreen,
  },
  statLabel: {
    fontSize: 18,
    color: colors.darkGreen,
    textAlign: 'center',
    marginTop: 8,
  },
  // Check items
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkText: {
    fontSize: 18,
    color: colors.gray,
    marginLeft: 10,
  },
  // Cover specific
  coverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverLogo: {
    height: 80,
    marginBottom: 32,
    objectFit: 'contain',
  },
  coverLine: {
    width: 80,
    height: 5,
    backgroundColor: colors.limeGreen,
    marginBottom: 24,
    borderRadius: 2,
  },
  coverTitle: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.darkGreen,
    textAlign: 'center',
    marginBottom: 16,
  },
  coverSubtitle: {
    fontSize: 28,
    color: colors.darkGreen,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 24,
  },
  coverTagline: {
    fontSize: 20,
    color: colors.limeGreen,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  // Diagonal pattern overlay
  diagonalPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Corner decoration
  cornerDecor: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 160,
    height: 160,
  },
  // Methodology
  phaseBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  phaseNumber: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.limeGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  phaseNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  phaseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  letterBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(45, 74, 45, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  letterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  // Problem slide
  problemCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  insightBox: {
    backgroundColor: colors.redLight,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  principleBox: {
    backgroundColor: colors.darkGreen,
    borderRadius: 12,
    padding: 24,
  },
  principleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  principleNote: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
  },
  // Tech stack
  techCategory: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  techHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  techName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  techTools: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  techTool: {
    backgroundColor: 'rgba(45, 74, 45, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  techToolText: {
    fontSize: 13,
    color: colors.darkGreen,
  },
  // Reporting
  metricCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginLeft: 8,
  },
  metricDesc: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 1.4,
  },
  deliverables: {
    backgroundColor: colors.darkGreen,
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
  },
  deliverableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
  },
  deliverableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deliverableItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliverableText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 10,
  },
  // Pricing
  pricingCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
  },
  pricingCardDark: {
    backgroundColor: colors.darkGreen,
    borderRadius: 16,
    padding: 32,
    flex: 1,
  },
  priceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  priceTitleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.limeGreen,
    marginBottom: 20,
  },
  priceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  priceItemText: {
    fontSize: 15,
    color: colors.gray,
    marginLeft: 10,
    flex: 1,
  },
  priceItemTextLight: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 10,
    flex: 1,
  },
  noteBox: {
    backgroundColor: colors.limeGreenLight,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  noteText: {
    fontSize: 16,
    fontWeight: 'medium',
    color: colors.darkGreen,
    textAlign: 'center',
  },
  // Addons
  addonCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  addonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addonIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.limeGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addonPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.limeGreen,
  },
  addonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 6,
  },
  addonDesc: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 1.4,
  },
  // Services
  serviceCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 6,
  },
  serviceDesc: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 1.4,
  },
  // Contact
  contactPage: {
    width: 1920,
    height: 1080,
    flexDirection: 'row',
    fontFamily: 'Helvetica',
  },
  contactLeft: {
    width: '60%',
    backgroundColor: colors.darkGreen,
    padding: 64,
    justifyContent: 'center',
    position: 'relative',
  },
  contactRight: {
    width: '40%',
    backgroundColor: colors.white,
    padding: 64,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  contactTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  contactHeadline: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.limeGreen,
    marginBottom: 20,
  },
  contactDesc: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 40,
    lineHeight: 1.5,
    maxWidth: 500,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactIconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: 'rgba(139, 195, 74, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 18,
    fontWeight: 'medium',
    color: colors.white,
  },
  ctaButton: {
    backgroundColor: colors.limeGreen,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 32,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  rightLogo: {
    height: 64,
    marginBottom: 24,
    objectFit: 'contain',
  },
  rightLine: {
    width: 64,
    height: 4,
    backgroundColor: colors.limeGreen,
    marginBottom: 24,
    borderRadius: 2,
  },
  rightTagline: {
    fontSize: 16,
    color: colors.darkGreen,
    textAlign: 'center',
    maxWidth: 280,
  },
  // Progress dots
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  // Credentials grid
  credentialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
  },
  credentialItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contentArea: {
    flex: 1,
  },
});

// SVG Icon components for react-pdf
const CheckIcon = ({ size = 20, color = colors.limeGreen }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
    <Path d="M9 12l2 2 4-4" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const XIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={colors.red} strokeWidth="2" />
    <Path d="M15 9l-6 6M9 9l6 6" fill="none" stroke={colors.red} strokeWidth="2" strokeLinecap="round" />
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

const PlusIcon = ({ size = 16 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 5v14M5 12h14" fill="none" stroke={colors.limeGreen} strokeWidth="2" strokeLinecap="round" />
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

// Header component
const SlideHeader = ({ logoBase64 }: { logoBase64: string }) => (
  <View style={styles.header}>
    <Image src={logoBase64} style={styles.logo} />
    <View style={styles.accentBar} />
  </View>
);

// Corner decoration
const CornerDecor = () => (
  <View style={styles.cornerDecor}>
    <Svg width="160" height="160" viewBox="0 0 160 160">
      <Path d="M160 160 L0 160 L160 0 Z" fill="rgba(139, 195, 74, 0.1)" />
    </Svg>
  </View>
);

// SLIDES

// Cover Slide
export const CoverSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['cover']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <View style={styles.coverContainer}>
      <Image src={logoBase64} style={styles.coverLogo} />
      <View style={styles.coverLine} />
      <Text style={styles.coverTitle}>{content.title}</Text>
      <Text style={styles.coverSubtitle}>{content.subtitle}</Text>
      <View style={styles.coverLine} />
      <Text style={styles.coverTagline}>{content.tagline}</Text>
    </View>
    
    {/* Corner decorations - simple solid triangles */}
    <View style={{ position: 'absolute', top: 0, left: 0, width: 120, height: 120 }}>
      <Svg width="120" height="120" viewBox="0 0 120 120">
        <Path d="M0 0 L120 0 L0 120 Z" fill="rgba(139, 195, 74, 0.1)" />
      </Svg>
    </View>
    <CornerDecor />
  </Page>
);

// About Slide
export const AboutSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['about']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.description}>{content.description}</Text>
    
    <View style={[styles.grid3, { marginBottom: 32 }]}>
      {content.stats.map((stat, idx) => (
        <View key={idx} style={styles.statCard}>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
    
    <View style={styles.credentialsGrid}>
      {content.credentials.map((cred, idx) => (
        <View key={idx} style={styles.credentialItem}>
          <CheckIcon size={18} />
          <Text style={[styles.checkText, { marginLeft: 8 }]}>{cred}</Text>
        </View>
      ))}
    </View>
    
    <CornerDecor />
  </Page>
);

// Problem Slide
export const ProblemSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['problem']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={[styles.description, { marginBottom: 20 }]}>{content.headline}</Text>
    
    <View style={[styles.grid2, { marginBottom: 20, flexWrap: 'wrap', gap: 12 }]}>
      {content.points.map((point, idx) => (
        <View key={idx} style={[styles.problemCard, { width: '48%' }]}>
          <View style={{ marginRight: 12 }}>
            <XIcon size={18} />
          </View>
          <Text style={{ fontSize: 16, color: colors.gray, flex: 1 }}>{point}</Text>
        </View>
      ))}
    </View>
    
    <View style={styles.insightBox}>
      <View style={{ marginRight: 16 }}>
        <AlertIcon size={28} />
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#b91c1c', flex: 1 }}>{content.insight}</Text>
    </View>
    
    <View style={styles.principleBox}>
      <Text style={styles.principleText}>{content.principle}</Text>
      <Text style={styles.principleNote}>{content.principleNote}</Text>
    </View>
  </Page>
);

// Solution Slide
export const SolutionSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['solution']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    <Text style={[styles.description, { fontSize: 18, marginBottom: 20 }]}>{content.intro}</Text>
    
    <View style={[styles.grid3, { gap: 16 }]}>
      {content.items.map((item, idx) => (
        <View key={idx} style={[styles.card, { width: '31%', flexDirection: 'row' }]}>
          <View style={styles.iconBoxRect}>
            <CheckIcon size={18} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
    
    <CornerDecor />
  </Page>
);

// Methodology Slide
export const MethodologySlidePDF = ({ 
  title, 
  phase, 
  items, 
  phaseNumber, 
  logoBase64 
}: { 
  title?: string; 
  phase: string; 
  items: Array<{ title: string; description: string }>; 
  phaseNumber: number;
  logoBase64: string;
}) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    {title && <Text style={styles.title}>{title}</Text>}
    
    <View style={styles.phaseBox}>
      <View style={styles.phaseNumber}>
        <Text style={styles.phaseNumberText}>{phaseNumber}</Text>
      </View>
      <Text style={styles.phaseTitle}>{phase}</Text>
    </View>
    
    <View style={{ gap: 12 }}>
      {items.map((item, idx) => (
        <View key={idx} style={[styles.card, { flexDirection: 'row', padding: 16 }]}>
          <View style={styles.letterBox}>
            <Text style={styles.letterText}>{String.fromCharCode(65 + idx)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { fontSize: 18 }]}>{item.title}</Text>
            <Text style={[styles.cardDescription, { fontSize: 15 }]}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
    
    <View style={styles.progressDots}>
      {[1, 2, 3, 4].map((num) => (
        <View 
          key={num} 
          style={[
            styles.progressDot, 
            { backgroundColor: num === phaseNumber ? colors.limeGreen : 'rgba(139, 195, 74, 0.2)' }
          ]} 
        />
      ))}
    </View>
  </Page>
);

// Tech Stack Slide
export const TechStackSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['techStack']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    
    <View style={[styles.grid3, { gap: 16 }]}>
      {content.categories.map((cat, idx) => (
        <View key={idx} style={[styles.techCategory, { width: '31%' }]}>
          <View style={styles.techHeader}>
            <View style={styles.iconBoxSmall}>
              <ServerIcon size={16} />
            </View>
            <Text style={[styles.techName, { marginLeft: 10 }]}>{cat.name}</Text>
          </View>
          <View style={styles.techTools}>
            {cat.tools.map((tool, tidx) => (
              <View key={tidx} style={styles.techTool}>
                <Text style={styles.techToolText}>{tool}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  </Page>
);

// Reporting Slide
export const ReportingSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['reporting']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    
    <View style={[styles.grid3, { gap: 12, marginBottom: 16 }]}>
      {content.metrics.map((metric, idx) => (
        <View key={idx} style={[styles.metricCard, { width: '31%' }]}>
          <View style={styles.metricHeader}>
            <BarChartIcon size={18} />
            <Text style={styles.metricName}>{metric.name}</Text>
          </View>
          <Text style={styles.metricDesc}>{metric.description}</Text>
        </View>
      ))}
    </View>
    
    <View style={styles.deliverables}>
      <Text style={styles.deliverableTitle}>Deliverables</Text>
      <View style={styles.deliverableGrid}>
        {content.deliverables.map((item, idx) => (
          <View key={idx} style={styles.deliverableItem}>
            <CheckIcon size={18} color={colors.limeGreen} />
            <Text style={styles.deliverableText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  </Page>
);

// Pricing Slide
export const PricingSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['pricing']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    
    <View style={[styles.grid2, { gap: 32 }]}>
      <View style={styles.pricingCard}>
        <Text style={styles.priceTitle}>{content.setup.title}</Text>
        <Text style={styles.priceValue}>{content.setup.price}</Text>
        {content.setup.includes.map((item, idx) => (
          <View key={idx} style={styles.priceItem}>
            <CheckIcon size={18} />
            <Text style={styles.priceItemText}>{item}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.pricingCardDark}>
        <Text style={styles.priceTitleLight}>{content.monthly.title}</Text>
        <Text style={styles.priceValue}>{content.monthly.price}</Text>
        {content.monthly.includes.map((item, idx) => (
          <View key={idx} style={styles.priceItem}>
            <CheckIcon size={18} />
            <Text style={styles.priceItemTextLight}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
    
    <View style={styles.noteBox}>
      <Text style={styles.noteText}>{content.note}</Text>
    </View>
  </Page>
);

// Addons Slide
export const AddonsSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['addons']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    
    <View style={[styles.grid3, { gap: 16, marginTop: 20 }]}>
      {content.items.map((item, idx) => (
        <View key={idx} style={[styles.addonCard, { width: '31%' }]}>
          <View style={styles.addonHeader}>
            <View style={styles.addonIconBox}>
              <PlusIcon size={18} />
            </View>
            <Text style={styles.addonPrice}>{item.price}</Text>
          </View>
          <Text style={styles.addonTitle}>{item.title}</Text>
          <Text style={styles.addonDesc}>{item.description}</Text>
        </View>
      ))}
    </View>
  </Page>
);

// Other Services Slide
export const OtherServicesSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['otherServices']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    
    <View style={[styles.grid3, { gap: 16 }]}>
      {content.services.map((service, idx) => (
        <View key={idx} style={[styles.serviceCard, { width: '31%' }]}>
          <View style={styles.iconBoxRect}>
            <ArrowIcon size={18} />
          </View>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceDesc}>{service.description}</Text>
          </View>
        </View>
      ))}
    </View>
  </Page>
);

// Contact Slide
export const ContactSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['contact']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.contactPage}>
    <View style={styles.contactLeft}>
      {/* Corner decoration */}
      <View style={{ position: 'absolute', top: 0, left: 0, width: 160, height: 160 }}>
        <Svg width="160" height="160" viewBox="0 0 160 160">
          <Path d="M0 0 L160 0 L0 160 Z" fill="rgba(139, 195, 74, 0.1)" />
        </Svg>
      </View>
      
      <Text style={styles.contactTitle}>{content.title}</Text>
      <Text style={styles.contactHeadline}>{content.headline}</Text>
      <Text style={styles.contactDesc}>{content.description}</Text>
      
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}>
          <MailIcon size={22} />
        </View>
        <View>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>{content.email}</Text>
        </View>
      </View>
      
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}>
          <PhoneIcon size={22} />
        </View>
        <View>
          <Text style={styles.contactLabel}>Phone</Text>
          <Text style={styles.contactValue}>{content.phone}</Text>
        </View>
      </View>
      
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}>
          <MapPinIcon size={22} />
        </View>
        <View>
          <Text style={styles.contactLabel}>Address</Text>
          <Text style={styles.contactValue}>{content.address.replace('\n', ', ')}</Text>
        </View>
      </View>
      
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}>
          <GlobeIcon size={22} />
        </View>
        <View>
          <Text style={styles.contactLabel}>Website</Text>
          <Text style={styles.contactValue}>{content.website}</Text>
        </View>
      </View>
      
      <View style={styles.ctaButton}>
        <Text style={styles.ctaText}>{content.cta}</Text>
      </View>
    </View>
    
    <View style={styles.contactRight}>
      <Image src={logoBase64} style={styles.rightLogo} />
      <View style={styles.rightLine} />
      <Text style={styles.rightTagline}>
        Performance-driven growth systems for businesses ready to scale.
      </Text>
    </View>
  </Page>
);

// Main PDF Document
interface LeadGenPDFDocumentProps {
  content: LeadGenContent;
  logoBase64: string;
  symbolBase64: string;
}

export const LeadGenPDFDocument = ({ content, logoBase64 }: LeadGenPDFDocumentProps) => (
  <Document>
    <CoverSlidePDF content={content.cover} logoBase64={logoBase64} />
    <AboutSlidePDF content={content.about} logoBase64={logoBase64} />
    <ProblemSlidePDF content={content.problem} logoBase64={logoBase64} />
    <SolutionSlidePDF content={content.solution} logoBase64={logoBase64} />
    <MethodologySlidePDF 
      title={content.methodology1.title} 
      phase={content.methodology1.phase} 
      items={content.methodology1.items} 
      phaseNumber={1} 
      logoBase64={logoBase64} 
    />
    <MethodologySlidePDF 
      phase={content.methodology2.phase} 
      items={content.methodology2.items} 
      phaseNumber={2} 
      logoBase64={logoBase64} 
    />
    <MethodologySlidePDF 
      phase={content.methodology3.phase} 
      items={content.methodology3.items} 
      phaseNumber={3} 
      logoBase64={logoBase64} 
    />
    <MethodologySlidePDF 
      phase={content.methodology4.phase} 
      items={content.methodology4.items} 
      phaseNumber={4} 
      logoBase64={logoBase64} 
    />
    <TechStackSlidePDF content={content.techStack} logoBase64={logoBase64} />
    <ReportingSlidePDF content={content.reporting} logoBase64={logoBase64} />
    <PricingSlidePDF content={content.pricing} logoBase64={logoBase64} />
    <AddonsSlidePDF content={content.addons} logoBase64={logoBase64} />
    <OtherServicesSlidePDF content={content.otherServices} logoBase64={logoBase64} />
    <ContactSlidePDF content={content.contact} logoBase64={logoBase64} />
  </Document>
);

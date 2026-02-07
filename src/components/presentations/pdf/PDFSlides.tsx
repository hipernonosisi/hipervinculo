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
  // Common page styles - larger padding and flex to fill space
  page: {
    width: 1920,
    height: 1080,
    backgroundColor: colors.background,
    padding: 100,
    fontFamily: 'Helvetica',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    height: 80,
    objectFit: 'contain',
  },
  accentBar: {
    width: 120,
    height: 10,
    backgroundColor: colors.limeGreen,
    borderRadius: 5,
  },
  // Typography - much larger for 1920x1080 to match web proportions
  title: {
    fontSize: 96,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 24,
  },
  headline: {
    fontSize: 52,
    fontWeight: 'bold',
    color: colors.limeGreen,
    marginBottom: 40,
  },
  description: {
    fontSize: 42,
    color: colors.gray,
    lineHeight: 1.5,
    marginBottom: 48,
  },
  // Cards - larger padding and text
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 40,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 14,
  },
  cardDescription: {
    fontSize: 28,
    color: colors.gray,
    lineHeight: 1.4,
  },
  // Grid layouts - more gap
  grid3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 36,
  },
  grid2: {
    flexDirection: 'row',
    gap: 48,
  },
  gridItem3: {
    width: '31%',
  },
  gridItem2: {
    width: '48%',
  },
  // Icon boxes - larger
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.limeGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconBoxSmall: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.limeGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxRect: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: colors.limeGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },
  // Stats - much larger
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 56,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
  },
  statValue: {
    fontSize: 100,
    fontWeight: 'bold',
    color: colors.limeGreen,
  },
  statLabel: {
    fontSize: 32,
    color: colors.darkGreen,
    textAlign: 'center',
    marginTop: 16,
  },
  // Check items - larger
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkText: {
    fontSize: 34,
    color: colors.gray,
    marginLeft: 18,
  },
  // Cover specific - larger
  coverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverLogo: {
    height: 160,
    marginBottom: 64,
    objectFit: 'contain',
  },
  coverLine: {
    width: 160,
    height: 10,
    backgroundColor: colors.limeGreen,
    marginBottom: 48,
    borderRadius: 5,
  },
  coverTitle: {
    fontSize: 130,
    fontWeight: 'bold',
    color: colors.darkGreen,
    textAlign: 'center',
    marginBottom: 32,
  },
  coverSubtitle: {
    fontSize: 56,
    color: colors.darkGreen,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 48,
  },
  coverTagline: {
    fontSize: 38,
    color: colors.limeGreen,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 3,
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
    width: 200,
    height: 200,
  },
  // Methodology - larger
  phaseBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 48,
  },
  phaseNumber: {
    width: 80,
    height: 80,
    borderRadius: 18,
    backgroundColor: colors.limeGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 28,
  },
  phaseNumberText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: colors.white,
  },
  phaseTitle: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  letterBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(45, 74, 45, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 22,
  },
  letterText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  // Problem slide - larger
  problemCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 36,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  insightBox: {
    backgroundColor: colors.redLight,
    borderRadius: 20,
    padding: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  principleBox: {
    backgroundColor: colors.darkGreen,
    borderRadius: 20,
    padding: 48,
  },
  principleText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
  },
  principleNote: {
    fontSize: 34,
    color: 'rgba(255,255,255,0.8)',
  },
  // Tech stack - larger
  techCategory: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 36,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  techHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  techName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  techTools: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  techTool: {
    backgroundColor: 'rgba(45, 74, 45, 0.08)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  techToolText: {
    fontSize: 26,
    color: colors.darkGreen,
  },
  // Reporting - larger
  metricCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 36,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginLeft: 16,
  },
  metricDesc: {
    fontSize: 26,
    color: colors.gray,
    lineHeight: 1.4,
  },
  deliverables: {
    backgroundColor: colors.darkGreen,
    borderRadius: 24,
    padding: 48,
    marginTop: 40,
  },
  deliverableTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 28,
  },
  deliverableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deliverableItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  deliverableText: {
    fontSize: 30,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 18,
  },
  // Pricing - larger
  pricingCard: {
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 56,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
  },
  pricingCardDark: {
    backgroundColor: colors.darkGreen,
    borderRadius: 28,
    padding: 56,
    flex: 1,
  },
  priceTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 18,
  },
  priceTitleLight: {
    fontSize: 44,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 18,
  },
  priceValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.limeGreen,
    marginBottom: 40,
  },
  priceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  priceItemText: {
    fontSize: 30,
    color: colors.gray,
    marginLeft: 18,
    flex: 1,
  },
  priceItemTextLight: {
    fontSize: 30,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 18,
    flex: 1,
  },
  noteBox: {
    backgroundColor: colors.limeGreenLight,
    borderRadius: 20,
    padding: 36,
    marginTop: 48,
    alignItems: 'center',
  },
  noteText: {
    fontSize: 32,
    fontWeight: 'medium',
    color: colors.darkGreen,
    textAlign: 'center',
  },
  // Addons - larger
  addonCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 36,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  addonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addonIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.limeGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  addonPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.limeGreen,
  },
  addonTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 14,
  },
  addonDesc: {
    fontSize: 26,
    color: colors.gray,
    lineHeight: 1.4,
  },
  // Services - larger
  serviceCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 36,
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
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 14,
  },
  serviceDesc: {
    fontSize: 26,
    color: colors.gray,
    lineHeight: 1.4,
  },
  // Contact - larger
  contactPage: {
    width: 1920,
    height: 1080,
    flexDirection: 'row',
    fontFamily: 'Helvetica',
  },
  contactLeft: {
    width: '60%',
    backgroundColor: colors.darkGreen,
    padding: 100,
    justifyContent: 'center',
    position: 'relative',
  },
  contactRight: {
    width: '40%',
    backgroundColor: colors.white,
    padding: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  contactTitle: {
    fontSize: 96,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 24,
  },
  contactHeadline: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.limeGreen,
    marginBottom: 36,
  },
  contactDesc: {
    fontSize: 36,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 56,
    lineHeight: 1.5,
    maxWidth: 700,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
  },
  contactIconBox: {
    width: 80,
    height: 80,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 195, 74, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 28,
  },
  contactLabel: {
    fontSize: 26,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 6,
  },
  contactValue: {
    fontSize: 34,
    fontWeight: 'medium',
    color: colors.white,
  },
  ctaButton: {
    backgroundColor: colors.limeGreen,
    paddingHorizontal: 72,
    paddingVertical: 32,
    borderRadius: 50,
    marginTop: 48,
  },
  ctaText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  rightLogo: {
    height: 140,
    marginBottom: 48,
    objectFit: 'contain',
  },
  rightLine: {
    width: 140,
    height: 8,
    backgroundColor: colors.limeGreen,
    marginBottom: 48,
    borderRadius: 4,
  },
  rightTagline: {
    fontSize: 32,
    color: colors.darkGreen,
    textAlign: 'center',
    maxWidth: 450,
  },
  // Progress dots - larger
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
    gap: 18,
  },
  progressDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  // Credentials grid
  credentialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 48,
  },
  credentialItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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

// Corner decoration - removed SVG due to PDF rendering issues
const CornerDecor = () => null;

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
          <CheckIcon size={36} />
          <Text style={[styles.checkText, { marginLeft: 16 }]}>{cred}</Text>
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
    <Text style={[styles.description, { marginBottom: 32 }]}>{content.headline}</Text>
    
    <View style={[styles.grid2, { marginBottom: 36, flexWrap: 'wrap', gap: 28 }]}>
      {content.points.map((point, idx) => (
        <View key={idx} style={[styles.problemCard, { width: '48%' }]}>
          <View style={{ marginRight: 20 }}>
            <XIcon size={36} />
          </View>
          <Text style={{ fontSize: 34, color: colors.gray, flex: 1 }}>{point}</Text>
        </View>
      ))}
    </View>
    
    <View style={styles.insightBox}>
      <View style={{ marginRight: 24 }}>
        <AlertIcon size={52} />
      </View>
      <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#b91c1c', flex: 1 }}>{content.insight}</Text>
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
    <Text style={[styles.description, { fontSize: 36, marginBottom: 36 }]}>{content.intro}</Text>
    
    <View style={[styles.grid3, { gap: 32 }]}>
      {content.items.map((item, idx) => (
        <View key={idx} style={[styles.card, { width: '31%', flexDirection: 'row' }]}>
          <View style={styles.iconBoxRect}>
            <CheckIcon size={32} />
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
    
    <View style={{ gap: 24, flex: 1 }}>
      {items.map((item, idx) => (
        <View key={idx} style={[styles.card, { flexDirection: 'row', padding: 32 }]}>
          <View style={styles.letterBox}>
            <Text style={styles.letterText}>{String.fromCharCode(65 + idx)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { fontSize: 34 }]}>{item.title}</Text>
            <Text style={[styles.cardDescription, { fontSize: 28 }]}>{item.description}</Text>
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
    
    <View style={[styles.grid3, { gap: 32, flex: 1 }]}>
      {content.categories.map((cat, idx) => (
        <View key={idx} style={[styles.techCategory, { width: '31%' }]}>
          <View style={styles.techHeader}>
            <View style={styles.iconBoxSmall}>
              <ServerIcon size={32} />
            </View>
            <Text style={[styles.techName, { marginLeft: 18 }]}>{cat.name}</Text>
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
    
    <View style={[styles.grid3, { gap: 28, marginBottom: 36 }]}>
      {content.metrics.map((metric, idx) => (
        <View key={idx} style={[styles.metricCard, { width: '31%' }]}>
          <View style={styles.metricHeader}>
            <BarChartIcon size={36} />
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
            <CheckIcon size={34} color={colors.limeGreen} />
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
    
    <View style={[styles.grid2, { gap: 64, flex: 1 }]}>
      <View style={styles.pricingCard}>
        <Text style={styles.priceTitle}>{content.setup.title}</Text>
        <Text style={styles.priceValue}>{content.setup.price}</Text>
        {content.setup.includes.map((item, idx) => (
          <View key={idx} style={styles.priceItem}>
            <CheckIcon size={34} />
            <Text style={styles.priceItemText}>{item}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.pricingCardDark}>
        <Text style={styles.priceTitleLight}>{content.monthly.title}</Text>
        <Text style={styles.priceValue}>{content.monthly.price}</Text>
        {content.monthly.includes.map((item, idx) => (
          <View key={idx} style={styles.priceItem}>
            <CheckIcon size={34} />
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
    
    <View style={[styles.grid3, { gap: 32, marginTop: 36, flex: 1 }]}>
      {content.items.map((item, idx) => (
        <View key={idx} style={[styles.addonCard, { width: '31%' }]}>
          <View style={styles.addonHeader}>
            <View style={styles.addonIconBox}>
              <PlusIcon size={34} />
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
    
    <View style={[styles.grid3, { gap: 32, flex: 1 }]}>
      {content.services.map((service, idx) => (
        <View key={idx} style={[styles.serviceCard, { width: '31%' }]}>
          <View style={styles.iconBoxRect}>
            <ArrowIcon size={34} />
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
      <Text style={styles.contactTitle}>{content.title}</Text>
      <Text style={styles.contactHeadline}>{content.headline}</Text>
      <Text style={styles.contactDesc}>{content.description}</Text>
      
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}>
          <MailIcon size={44} />
        </View>
        <View>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>{content.email}</Text>
        </View>
      </View>
      
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}>
          <PhoneIcon size={44} />
        </View>
        <View>
          <Text style={styles.contactLabel}>Phone</Text>
          <Text style={styles.contactValue}>{content.phone}</Text>
        </View>
      </View>
      
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}>
          <MapPinIcon size={44} />
        </View>
        <View>
          <Text style={styles.contactLabel}>Address</Text>
          <Text style={styles.contactValue}>{content.address.replace('\n', ', ')}</Text>
        </View>
      </View>
      
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}>
          <GlobeIcon size={44} />
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

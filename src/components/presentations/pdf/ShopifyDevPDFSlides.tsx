import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Circle } from '@react-pdf/renderer';
import { ShopifyDevContent } from '../data/shopifyDevPresentationContent';

const colors = {
  darkGreen: '#2d4a2d',
  limeGreen: '#8BC34A',
  limeGreenLight: '#e8f5e0',
  background: '#f8f9f5',
  white: '#ffffff',
  gray: '#6b7280',
  red: '#ef4444',
  redLight: '#fef2f2',
  redDark: '#991b1b',
};

const styles = StyleSheet.create({
  page: { width: 1920, height: 1080, backgroundColor: colors.background, padding: 80, fontFamily: 'Helvetica', position: 'relative', display: 'flex', flexDirection: 'column' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  logo: { height: 64, objectFit: 'contain' },
  accentBar: { width: 96, height: 8, backgroundColor: colors.limeGreen, borderRadius: 4 },
  title: { fontSize: 72, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 16 },
  headline: { fontSize: 40, fontWeight: 'bold', color: colors.limeGreen, marginBottom: 32 },
  description: { fontSize: 32, color: colors.gray, lineHeight: 1.5, marginBottom: 32 },
  // Cover
  coverContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  coverLogo: { height: 120, marginBottom: 48, objectFit: 'contain' },
  coverLine: { width: 120, height: 8, backgroundColor: colors.limeGreen, marginBottom: 32, borderRadius: 4 },
  coverTitle: { fontSize: 96, fontWeight: 'bold', color: colors.darkGreen, textAlign: 'center', marginBottom: 24 },
  coverSubtitle: { fontSize: 40, color: colors.darkGreen, opacity: 0.8, textAlign: 'center', marginBottom: 32 },
  coverTagline: { fontSize: 28, color: colors.limeGreen, fontWeight: 'bold', textAlign: 'center', letterSpacing: 2, textTransform: 'uppercase' },
  // Stats
  statCard: { backgroundColor: colors.white, borderRadius: 20, padding: 40, alignItems: 'center', justifyContent: 'center', flex: 1 },
  statValue: { fontSize: 72, fontWeight: 'bold', color: colors.limeGreen },
  statLabel: { fontSize: 24, color: colors.darkGreen, textAlign: 'center', marginTop: 12 },
  credentialsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 32 },
  credentialItem: { width: '50%', flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkText: { fontSize: 28, color: colors.gray, marginLeft: 14 },
  // Problem
  problemCard: { backgroundColor: colors.white, borderRadius: 16, padding: 24, flexDirection: 'row', alignItems: 'flex-start', width: '48%' },
  insightBox: { backgroundColor: colors.redLight, borderRadius: 16, padding: 28, flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  principleBox: { backgroundColor: colors.darkGreen, borderRadius: 16, padding: 32 },
  principleText: { fontSize: 36, fontWeight: 'bold', color: colors.white, marginBottom: 12 },
  principleNote: { fontSize: 26, color: 'rgba(255,255,255,0.8)' },
  // Solution
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 28 },
  cardTitle: { fontSize: 28, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 10 },
  cardDescription: { fontSize: 22, color: colors.gray, lineHeight: 1.4 },
  iconBoxRect: { width: 48, height: 48, borderRadius: 10, backgroundColor: colors.limeGreenLight, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  // Process
  processCard: { backgroundColor: colors.white, borderRadius: 16, padding: 32, width: '48%' },
  processNumber: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.limeGreen, alignItems: 'center', justifyContent: 'center', marginRight: 20 },
  processNumberText: { fontSize: 32, fontWeight: 'bold', color: colors.white },
  processTitle: { fontSize: 32, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 12 },
  processDesc: { fontSize: 24, color: colors.gray, lineHeight: 1.4 },
  // Pricing
  pricingCard: { backgroundColor: colors.white, borderRadius: 20, padding: 36, flex: 1 },
  pricingCardHighlight: { backgroundColor: colors.darkGreen, borderRadius: 20, padding: 36, flex: 1, borderWidth: 3, borderColor: colors.limeGreen },
  priceTitle: { fontSize: 32, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 8 },
  priceTitleLight: { fontSize: 32, fontWeight: 'bold', color: colors.white, marginBottom: 8 },
  priceValue: { fontSize: 48, fontWeight: 'bold', color: colors.limeGreen, marginBottom: 8 },
  priceRevisions: { fontSize: 22, color: colors.gray, marginBottom: 20 },
  priceRevisionsLight: { fontSize: 22, color: 'rgba(255,255,255,0.6)', marginBottom: 20 },
  priceItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  priceItemText: { fontSize: 20, color: colors.gray, marginLeft: 12, flex: 1 },
  priceItemTextLight: { fontSize: 20, color: 'rgba(255,255,255,0.9)', marginLeft: 12, flex: 1 },
  noteBox: { backgroundColor: colors.limeGreenLight, borderRadius: 16, padding: 28, marginTop: 32, alignItems: 'center' },
  noteText: { fontSize: 26, fontWeight: 'medium', color: colors.darkGreen, textAlign: 'center' },
  // Services
  serviceCard: { backgroundColor: colors.white, borderRadius: 16, padding: 28, flexDirection: 'row', alignItems: 'flex-start' },
  serviceContent: { flex: 1 },
  serviceTitle: { fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 10 },
  serviceDesc: { fontSize: 22, color: colors.gray, lineHeight: 1.4 },
  // Contact
  contactPage: { width: 1920, height: 1080, flexDirection: 'row', fontFamily: 'Helvetica' },
  contactLeft: { width: '60%', backgroundColor: colors.darkGreen, padding: 80, justifyContent: 'center', position: 'relative' },
  contactRight: { width: '40%', backgroundColor: colors.white, padding: 80, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  contactTitle: { fontSize: 72, fontWeight: 'bold', color: colors.white, marginBottom: 16 },
  contactHeadline: { fontSize: 36, fontWeight: 'bold', color: colors.limeGreen, marginBottom: 28 },
  contactDesc: { fontSize: 28, color: 'rgba(255,255,255,0.8)', marginBottom: 40, lineHeight: 1.5, maxWidth: 600 },
  contactInfoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  contactIconBox: { width: 56, height: 56, borderRadius: 12, backgroundColor: 'rgba(139, 195, 74, 0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 20 },
  contactLabel: { fontSize: 20, color: 'rgba(255,255,255,0.6)', marginBottom: 4 },
  contactValue: { fontSize: 26, fontWeight: 'medium', color: colors.white },
  ctaButton: { backgroundColor: colors.limeGreen, paddingHorizontal: 48, paddingVertical: 24, borderRadius: 40, marginTop: 32 },
  ctaText: { fontSize: 26, fontWeight: 'bold', color: colors.darkGreen },
  rightLogo: { height: 100, marginBottom: 32, objectFit: 'contain' },
  rightLine: { width: 100, height: 6, backgroundColor: colors.limeGreen, marginBottom: 32, borderRadius: 3 },
  rightTagline: { fontSize: 24, color: colors.darkGreen, textAlign: 'center', maxWidth: 360 },
  // Scope
  scopeColumn: { flex: 1 },
  scopeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottomWidth: 2 },
  scopeHeaderTitle: { fontSize: 32, fontWeight: 'bold', color: colors.darkGreen, marginLeft: 12 },
  scopeItemTitle: { fontSize: 26, fontWeight: 'bold', color: colors.darkGreen, marginBottom: 6 },
  scopeItemDesc: { fontSize: 22, color: colors.gray, lineHeight: 1.4, marginBottom: 20 },
  addonCard: { backgroundColor: colors.limeGreenLight, borderRadius: 12, padding: 20, marginBottom: 16 },
  addonPrice: { fontSize: 28, fontWeight: 'bold', color: colors.limeGreen },
  warningBox: { backgroundColor: 'rgba(220, 38, 38, 0.05)', borderRadius: 16, padding: 28, marginTop: 24, borderWidth: 1, borderColor: 'rgba(220, 38, 38, 0.15)' },
  warningText: { fontSize: 26, fontWeight: 'bold', color: colors.redDark, textAlign: 'center' },
});

// SVG Icons
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

const PlusIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={colors.limeGreen} strokeWidth="2" />
    <Path d="M12 8v8M8 12h8" fill="none" stroke={colors.limeGreen} strokeWidth="2" strokeLinecap="round" />
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

const SlideHeader = ({ logoBase64 }: { logoBase64: string }) => (
  <View style={styles.header}>
    <Image src={logoBase64} style={styles.logo} />
    <View style={styles.accentBar} />
  </View>
);

// Cover
const CoverSlidePDF = ({ content, logoBase64 }: { content: ShopifyDevContent['cover']; logoBase64: string }) => (
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

// About
const AboutSlidePDF = ({ content, logoBase64 }: { content: ShopifyDevContent['about']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.description}>{content.description}</Text>
    <View style={{ flexDirection: 'row', gap: 32, marginBottom: 32 }}>
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
          <CheckIcon size={28} />
          <Text style={[styles.checkText, { marginLeft: 12 }]}>{cred}</Text>
        </View>
      ))}
    </View>
  </Page>
);

// Problem
const ProblemSlidePDF = ({ content, logoBase64 }: { content: ShopifyDevContent['problem']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={[styles.description, { marginBottom: 24 }]}>{content.headline}</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, marginBottom: 24 }}>
      {content.points.map((point, idx) => (
        <View key={idx} style={styles.problemCard}>
          <View style={{ marginRight: 14 }}><XIcon size={28} /></View>
          <Text style={{ fontSize: 26, color: colors.gray, flex: 1 }}>{point}</Text>
        </View>
      ))}
    </View>
    <View style={styles.insightBox}>
      <View style={{ marginRight: 16 }}><AlertIcon size={40} /></View>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#b91c1c', flex: 1 }}>{content.insight}</Text>
    </View>
    <View style={styles.principleBox}>
      <Text style={styles.principleText}>{content.principle}</Text>
      <Text style={styles.principleNote}>{content.principleNote}</Text>
    </View>
  </Page>
);

// Solution
const SolutionSlidePDF = ({ content, logoBase64 }: { content: ShopifyDevContent['solution']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    <Text style={[styles.description, { fontSize: 28, marginBottom: 28 }]}>{content.intro}</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24 }}>
      {content.items.map((item, idx) => (
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
);

// Scope
const ScopeSlidePDF = ({ content, logoBase64 }: { content: ShopifyDevContent['scope']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    <View style={{ flexDirection: 'row', gap: 40, flex: 1 }}>
      {/* Included */}
      <View style={styles.scopeColumn}>
        <View style={[styles.scopeHeader, { borderBottomColor: colors.limeGreen }]}>
          <CheckIcon size={32} />
          <Text style={styles.scopeHeaderTitle}>{content.title.includes('Alcance') ? 'Incluido' : 'Included'}</Text>
        </View>
        {content.included.map((item, i) => (
          <View key={i}>
            <Text style={styles.scopeItemTitle}>{item.title}</Text>
            <Text style={styles.scopeItemDesc}>{item.description}</Text>
          </View>
        ))}
      </View>
      {/* Not Included */}
      <View style={styles.scopeColumn}>
        <View style={[styles.scopeHeader, { borderBottomColor: colors.red }]}>
          <XIcon size={32} />
          <Text style={styles.scopeHeaderTitle}>{content.title.includes('Alcance') ? 'No Incluido' : 'Not Included'}</Text>
        </View>
        {content.notIncluded.map((item, i) => (
          <View key={i}>
            <Text style={styles.scopeItemTitle}>{item.title}</Text>
            <Text style={styles.scopeItemDesc}>{item.description}</Text>
          </View>
        ))}
      </View>
      {/* Add-ons */}
      {content.addons && (
        <View style={styles.scopeColumn}>
          <View style={[styles.scopeHeader, { borderBottomColor: colors.limeGreen }]}>
            <PlusIcon size={32} />
            <Text style={styles.scopeHeaderTitle}>Add-ons</Text>
          </View>
          {content.addons.map((item, i) => (
            <View key={i} style={styles.addonCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <Text style={[styles.scopeItemTitle, { flex: 1, marginBottom: 0 }]}>{item.title}</Text>
                <Text style={styles.addonPrice}>{item.price}</Text>
              </View>
              <Text style={{ fontSize: 22, color: colors.gray, lineHeight: 1.4 }}>{item.description}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
    <View style={styles.warningBox}>
      <Text style={styles.warningText}>
        {content.title.includes('Alcance')
          ? 'No abrimos cuentas de Shopify. El cliente debe proveer su propia cuenta y suscripcion activa.'
          : 'We do not create Shopify accounts. The client must provide their own active Shopify account and subscription.'}
      </Text>
    </View>
  </Page>
);

// Process
const ProcessSlidePDF = ({ content, logoBase64 }: { content: ShopifyDevContent['process']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 28, flex: 1 }}>
      {content.steps.map((step, idx) => (
        <View key={idx} style={styles.processCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={styles.processNumber}>
              <Text style={styles.processNumberText}>{idx + 1}</Text>
            </View>
            <Text style={styles.processTitle}>{step.title}</Text>
          </View>
          <Text style={styles.processDesc}>{step.description}</Text>
        </View>
      ))}
    </View>
  </Page>
);

// Pricing
const PricingSlidePDF = ({ content, logoBase64 }: { content: ShopifyDevContent['pricing']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    <View style={{ flexDirection: 'row', gap: 28, flex: 1 }}>
      {content.packages.map((pkg, idx) => (
        <View key={idx} style={pkg.highlight ? styles.pricingCardHighlight : styles.pricingCard}>
          <Text style={pkg.highlight ? styles.priceTitleLight : styles.priceTitle}>{pkg.name}</Text>
          <Text style={styles.priceValue}>{pkg.price}</Text>
          <Text style={pkg.highlight ? styles.priceRevisionsLight : styles.priceRevisions}>{pkg.revisions}</Text>
          {pkg.includes.map((item, i) => (
            <View key={i} style={styles.priceItem}>
              <CheckIcon size={20} />
              <Text style={pkg.highlight ? styles.priceItemTextLight : styles.priceItemText}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
    <View style={styles.noteBox}>
      <Text style={styles.noteText}>{content.note}</Text>
    </View>
  </Page>
);

// Other Services
const OtherServicesSlidePDF = ({ content, logoBase64 }: { content: ShopifyDevContent['otherServices']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24, flex: 1 }}>
      {content.services.map((service, idx) => (
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
);

// Contact
const ContactSlidePDF = ({ content, logoBase64 }: { content: ShopifyDevContent['contact']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.contactPage}>
    <View style={styles.contactLeft}>
      <Text style={styles.contactTitle}>{content.title}</Text>
      <Text style={styles.contactHeadline}>{content.headline}</Text>
      <Text style={styles.contactDesc}>{content.description}</Text>
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}><MailIcon size={32} /></View>
        <View>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>{content.email}</Text>
        </View>
      </View>
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}><PhoneIcon size={32} /></View>
        <View>
          <Text style={styles.contactLabel}>Phone</Text>
          <Text style={styles.contactValue}>{content.phone}</Text>
        </View>
      </View>
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}><MapPinIcon size={32} /></View>
        <View>
          <Text style={styles.contactLabel}>Address</Text>
          <Text style={styles.contactValue}>{content.address.replace('\n', ', ')}</Text>
        </View>
      </View>
      <View style={styles.contactInfoItem}>
        <View style={styles.contactIconBox}><GlobeIcon size={32} /></View>
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
      <Text style={styles.rightTagline}>Performance-driven growth systems for businesses ready to scale.</Text>
    </View>
  </Page>
);

// Main Document
interface ShopifyDevPDFDocumentProps {
  content: ShopifyDevContent;
  logoBase64: string;
  symbolBase64: string;
}

export const ShopifyDevPDFDocument = ({ content, logoBase64 }: ShopifyDevPDFDocumentProps) => (
  <Document>
    <CoverSlidePDF content={content.cover} logoBase64={logoBase64} />
    <AboutSlidePDF content={content.about} logoBase64={logoBase64} />
    <ProblemSlidePDF content={content.problem} logoBase64={logoBase64} />
    <SolutionSlidePDF content={content.solution} logoBase64={logoBase64} />
    <ScopeSlidePDF content={content.scope} logoBase64={logoBase64} />
    <ProcessSlidePDF content={content.process} logoBase64={logoBase64} />
    <PricingSlidePDF content={content.pricing} logoBase64={logoBase64} />
    <OtherServicesSlidePDF content={content.otherServices} logoBase64={logoBase64} />
    <ContactSlidePDF content={content.contact} logoBase64={logoBase64} />
  </Document>
);

import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { LeadGenContent } from '../data/leadGenPresentationContent';
import { colors } from './PDFSlideStyles';

// Import logo as base64 or URL - we'll use the public path
const logoUrl = '/logo-hipervinculo.png';
const symbolUrl = '/symbol-hipervinculo.png';

// Create styles specific to PDF rendering
const styles = StyleSheet.create({
  page: {
    width: 1920,
    height: 1080,
    backgroundColor: colors.background,
    padding: 64,
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  pageWhite: {
    width: 1920,
    height: 1080,
    backgroundColor: colors.white,
    padding: 64,
    fontFamily: 'Helvetica',
    position: 'relative',
  },
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
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  titleSmall: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.limeGreen,
    marginBottom: 24,
  },
  description: {
    fontSize: 24,
    color: colors.gray,
    lineHeight: 1.5,
    marginBottom: 24,
  },
  grid3: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '31%',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 18,
    color: colors.gray,
    lineHeight: 1.4,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(139, 195, 74, 0.15)',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
    color: colors.limeGreen,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: '31%',
  },
  statValue: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.limeGreen,
  },
  statLabel: {
    fontSize: 20,
    color: colors.darkGreen,
    textAlign: 'center',
    marginTop: 8,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkIcon: {
    fontSize: 20,
    color: colors.limeGreen,
    marginRight: 12,
  },
  checkText: {
    fontSize: 22,
    color: colors.gray,
  },
  phaseTag: {
    backgroundColor: colors.limeGreen,
    color: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 24,
  },
  column: {
    flex: 1,
  },
  // Cover slide specific
  coverCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.darkGreen,
    textAlign: 'center',
    marginBottom: 16,
  },
  coverSubtitle: {
    fontSize: 36,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 32,
  },
  coverTagline: {
    fontSize: 24,
    color: colors.limeGreen,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  coverLogo: {
    height: 64,
    marginBottom: 48,
    objectFit: 'contain',
  },
  // Pricing specific
  pricingCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    flex: 1,
  },
  priceValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.limeGreen,
    marginBottom: 16,
  },
  priceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 24,
  },
  // Contact specific
  contactSplit: {
    flexDirection: 'row',
    flex: 1,
  },
  contactLeft: {
    width: '50%',
    backgroundColor: colors.darkGreen,
    padding: 64,
    justifyContent: 'center',
  },
  contactRight: {
    width: '50%',
    backgroundColor: colors.white,
    padding: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
  },
  contactHeadline: {
    fontSize: 32,
    color: colors.limeGreen,
    marginBottom: 24,
  },
  contactDescription: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 48,
    lineHeight: 1.5,
  },
  contactInfo: {
    marginBottom: 16,
  },
  contactLabel: {
    fontSize: 16,
    color: colors.limeGreen,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 22,
    color: colors.white,
  },
  contactSymbol: {
    width: 200,
    height: 200,
    opacity: 0.15,
  },
  // Tech stack
  techCategory: {
    marginBottom: 24,
  },
  techCategoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  techTools: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techTool: {
    backgroundColor: 'rgba(139, 195, 74, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  techToolText: {
    fontSize: 16,
    color: colors.darkGreen,
  },
  // Metrics grid
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  metricCard: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
  },
  metricName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  metricDescription: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 1.4,
  },
  // Deliverables
  deliverablesList: {
    marginTop: 24,
  },
  deliverableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliverableBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.limeGreen,
    marginRight: 12,
  },
  deliverableText: {
    fontSize: 20,
    color: colors.gray,
  },
  // Problem slide
  problemPoint: {
    fontSize: 26,
    color: colors.gray,
    marginBottom: 16,
    paddingLeft: 24,
  },
  problemInsight: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginTop: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  problemPrinciple: {
    backgroundColor: 'rgba(139, 195, 74, 0.15)',
    padding: 24,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.limeGreen,
  },
  problemPrincipleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  problemPrincipleNote: {
    fontSize: 20,
    color: colors.gray,
  },
  // Addons
  addonCard: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
  },
  addonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addonIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 195, 74, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addonPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.limeGreen,
  },
  addonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  addonDescription: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 1.4,
  },
  // Services
  serviceCard: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  serviceIconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(139, 195, 74, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 1.4,
  },
  // Content area
  contentArea: {
    flex: 1,
  },
  credentialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 24,
  },
  credentialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  noteText: {
    fontSize: 18,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 24,
  },
});

// Header component used in most slides
const SlideHeader = ({ logoBase64 }: { logoBase64: string }) => (
  <View style={styles.header}>
    <Image src={logoBase64} style={styles.logo} />
    <View style={styles.accentBar} />
  </View>
);

// Cover Slide
export const CoverSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['cover']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <View style={styles.coverCenter}>
      <Image src={logoBase64} style={styles.coverLogo} />
      <Text style={styles.coverTitle}>{content.title}</Text>
      <Text style={styles.coverSubtitle}>{content.subtitle}</Text>
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
    
    <View style={styles.grid3}>
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
          <Text style={styles.checkIcon}>✓</Text>
          <Text style={styles.checkText}>{cred}</Text>
        </View>
      ))}
    </View>
  </Page>
);

// Problem Slide
export const ProblemSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['problem']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    
    <View style={styles.contentArea}>
      {content.points.map((point, idx) => (
        <Text key={idx} style={styles.problemPoint}>• {point}</Text>
      ))}
      
      <Text style={styles.problemInsight}>{content.insight}</Text>
      
      <View style={styles.problemPrinciple}>
        <Text style={styles.problemPrincipleText}>{content.principle}</Text>
        <Text style={styles.problemPrincipleNote}>{content.principleNote}</Text>
      </View>
    </View>
  </Page>
);

// Solution Slide
export const SolutionSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['solution']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    <Text style={styles.description}>{content.intro}</Text>
    
    <View style={styles.grid3}>
      {content.items.map((item, idx) => (
        <View key={idx} style={styles.gridItem}>
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>→</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
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
    {title && <Text style={styles.titleSmall}>{title}</Text>}
    <Text style={styles.phaseTag}>{phase}</Text>
    
    <View style={styles.grid3}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.gridItem}>
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>{phaseNumber}.{idx + 1}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </View>
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
    
    <View style={styles.contentArea}>
      {content.categories.map((cat, idx) => (
        <View key={idx} style={styles.techCategory}>
          <Text style={styles.techCategoryName}>{cat.name}</Text>
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
    
    <View style={styles.metricsGrid}>
      {content.metrics.map((metric, idx) => (
        <View key={idx} style={styles.metricCard}>
          <Text style={styles.metricName}>{metric.name}</Text>
          <Text style={styles.metricDescription}>{metric.description}</Text>
        </View>
      ))}
    </View>
    
    <View style={styles.deliverablesList}>
      {content.deliverables.map((item, idx) => (
        <View key={idx} style={styles.deliverableItem}>
          <View style={styles.deliverableBullet} />
          <Text style={styles.deliverableText}>{item}</Text>
        </View>
      ))}
    </View>
  </Page>
);

// Pricing Slide
export const PricingSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['pricing']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    <Text style={styles.headline}>{content.headline}</Text>
    
    <View style={styles.row}>
      <View style={styles.pricingCard}>
        <Text style={styles.priceTitle}>{content.setup.title}</Text>
        <Text style={styles.priceValue}>{content.setup.price}</Text>
        {content.setup.includes.map((item, idx) => (
          <View key={idx} style={styles.checkRow}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkText}>{item}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.pricingCard}>
        <Text style={styles.priceTitle}>{content.monthly.title}</Text>
        <Text style={styles.priceValue}>{content.monthly.price}</Text>
        {content.monthly.includes.map((item, idx) => (
          <View key={idx} style={styles.checkRow}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
    
    <Text style={styles.noteText}>{content.note}</Text>
  </Page>
);

// Addons Slide
export const AddonsSlidePDF = ({ content, logoBase64 }: { content: LeadGenContent['addons']; logoBase64: string }) => (
  <Page size={[1920, 1080]} style={styles.page}>
    <SlideHeader logoBase64={logoBase64} />
    <Text style={styles.title}>{content.title}</Text>
    
    <View style={styles.grid3}>
      {content.items.map((item, idx) => (
        <View key={idx} style={styles.addonCard}>
          <View style={styles.addonHeader}>
            <View style={styles.addonIconBox}>
              <Text style={styles.iconText}>+</Text>
            </View>
            <Text style={styles.addonPrice}>{item.price}</Text>
          </View>
          <Text style={styles.addonTitle}>{item.title}</Text>
          <Text style={styles.addonDescription}>{item.description}</Text>
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
    
    <View style={styles.grid3}>
      {content.services.map((service, idx) => (
        <View key={idx} style={styles.serviceCard}>
          <View style={styles.serviceIconBox}>
            <Text style={styles.iconText}>→</Text>
          </View>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>
        </View>
      ))}
    </View>
  </Page>
);

// Contact Slide - Split layout
export const ContactSlidePDF = ({ content, symbolBase64 }: { content: LeadGenContent['contact']; symbolBase64: string }) => (
  <Page size={[1920, 1080]} style={{ backgroundColor: colors.white, fontFamily: 'Helvetica' }}>
    <View style={styles.contactSplit}>
      <View style={styles.contactLeft}>
        <Text style={styles.contactTitle}>{content.title}</Text>
        <Text style={styles.contactHeadline}>{content.headline}</Text>
        <Text style={styles.contactDescription}>{content.description}</Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>{content.email}</Text>
        </View>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Phone</Text>
          <Text style={styles.contactValue}>{content.phone}</Text>
        </View>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Address</Text>
          <Text style={styles.contactValue}>{content.address}</Text>
        </View>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Website</Text>
          <Text style={styles.contactValue}>{content.website}</Text>
        </View>
      </View>
      
      <View style={styles.contactRight}>
        <Image src={symbolBase64} style={styles.contactSymbol} />
      </View>
    </View>
  </Page>
);

// Main PDF Document component
interface LeadGenPDFDocumentProps {
  content: LeadGenContent;
  logoBase64: string;
  symbolBase64: string;
}

export const LeadGenPDFDocument = ({ content, logoBase64, symbolBase64 }: LeadGenPDFDocumentProps) => (
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
    <ContactSlidePDF content={content.contact} symbolBase64={symbolBase64} />
  </Document>
);

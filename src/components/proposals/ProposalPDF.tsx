import { Document, Page, Text, View, StyleSheet, Image, Font, pdf } from '@react-pdf/renderer';
import type { ProposalService } from './ProposalForm';

// Register font (using Helvetica as fallback - Inter not available in PDF)
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#8BC34A',
  },
  logo: {
    width: 180,
    height: 50,
    objectFit: 'contain',
  },
  proposalInfo: {
    textAlign: 'right',
  },
  proposalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d4a2d',
    marginBottom: 4,
  },
  proposalNumber: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  proposalDate: {
    fontSize: 11,
    color: '#666666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d4a2d',
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  clientInfo: {
    backgroundColor: '#f8f9f5',
    padding: 16,
    borderRadius: 8,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d4a2d',
    marginBottom: 4,
  },
  clientCompany: {
    fontSize: 14,
    color: '#2d4a2d',
    marginBottom: 8,
  },
  clientDetail: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2d4a2d',
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tableHeaderText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableRowAlt: {
    backgroundColor: '#fafafa',
  },
  colService: {
    flex: 3,
  },
  colType: {
    flex: 1,
    textAlign: 'center',
  },
  colPrice: {
    flex: 1,
    textAlign: 'right',
  },
  serviceTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2d4a2d',
    marginBottom: 2,
  },
  serviceDescription: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.4,
  },
  typeText: {
    fontSize: 9,
    color: '#666666',
    textAlign: 'center',
  },
  priceText: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  totalsSection: {
    marginTop: 20,
    marginLeft: 'auto',
    width: '50%',
    backgroundColor: '#f8f9f5',
    padding: 16,
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 11,
    color: '#666666',
  },
  totalValue: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    marginTop: 6,
    borderTopWidth: 2,
    borderTopColor: '#8BC34A',
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d4a2d',
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8BC34A',
  },
  termsSection: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#f8f9f5',
    borderRadius: 8,
  },
  termsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2d4a2d',
    marginBottom: 8,
  },
  termsText: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
  },
  notesSection: {
    marginTop: 20,
  },
  notesText: {
    fontSize: 10,
    color: '#666666',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerContact: {
    fontSize: 9,
    color: '#666666',
  },
  footerWebsite: {
    fontSize: 9,
    color: '#8BC34A',
    fontWeight: 'bold',
  },
  validUntil: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#fff8e1',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#ffc107',
  },
  validUntilText: {
    fontSize: 10,
    color: '#666666',
  },
  validUntilDate: {
    fontWeight: 'bold',
    color: '#2d4a2d',
  },
});

export interface ProposalPDFData {
  client_name: string;
  client_company: string;
  client_email?: string;
  client_phone?: string;
  proposal_number: string;
  proposal_date: string;
  valid_until?: string;
  services: ProposalService[];
  subtotal: number;
  discount_percentage: number;
  discount_amount: number;
  total: number;
  currency: string;
  payment_terms?: string;
  notes?: string;
}

interface ProposalPDFDocumentProps {
  data: ProposalPDFData;
  logoUrl?: string;
}

const formatCurrency = (amount: number, currency: string) => {
  const symbol = currency === 'USD' ? '$' : '€';
  return `${symbol}${amount.toFixed(2)}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export function ProposalPDFDocument({ data, logoUrl }: ProposalPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            {logoUrl && (
              <Image src={logoUrl} style={styles.logo} />
            )}
          </View>
          <View style={styles.proposalInfo}>
            <Text style={styles.proposalTitle}>SERVICE PROPOSAL</Text>
            <Text style={styles.proposalNumber}>{data.proposal_number}</Text>
            <Text style={styles.proposalDate}>{formatDate(data.proposal_date)}</Text>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREPARED FOR</Text>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{data.client_name}</Text>
            <Text style={styles.clientCompany}>{data.client_company}</Text>
            {data.client_email && (
              <Text style={styles.clientDetail}>{data.client_email}</Text>
            )}
            {data.client_phone && (
              <Text style={styles.clientDetail}>{data.client_phone}</Text>
            )}
          </View>
        </View>

        {/* Services Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SERVICES</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.colService}>
                <Text style={styles.tableHeaderText}>Service</Text>
              </View>
              <View style={styles.colType}>
                <Text style={styles.tableHeaderText}>Type</Text>
              </View>
              <View style={styles.colPrice}>
                <Text style={styles.tableHeaderText}>Price</Text>
              </View>
            </View>
            
            {/* Table Rows */}
            {data.services.map((service, index) => (
              <View 
                key={service.id} 
                style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}
              >
                <View style={styles.colService}>
                  <Text style={styles.serviceTitle}>{service.name}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                </View>
                <View style={styles.colType}>
                  <Text style={styles.typeText}>
                    {service.type === 'monthly' ? 'Monthly' : 'One-time'}
                  </Text>
                </View>
                <View style={styles.colPrice}>
                  <Text style={styles.priceText}>
                    {formatCurrency(service.price, data.currency)}
                    {service.type === 'monthly' && '/mo'}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Totals */}
          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{formatCurrency(data.subtotal, data.currency)}</Text>
            </View>
            {data.discount_percentage > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Discount ({data.discount_percentage}%)</Text>
                <Text style={styles.totalValue}>-{formatCurrency(data.discount_amount, data.currency)}</Text>
              </View>
            )}
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>{formatCurrency(data.total, data.currency)}</Text>
            </View>
          </View>
        </View>

        {/* Valid Until */}
        {data.valid_until && (
          <View style={styles.validUntil}>
            <Text style={styles.validUntilText}>
              This proposal is valid until <Text style={styles.validUntilDate}>{formatDate(data.valid_until)}</Text>
            </Text>
          </View>
        )}

        {/* Payment Terms */}
        {data.payment_terms && (
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>TERMS & CONDITIONS</Text>
            <Text style={styles.termsText}>{data.payment_terms}</Text>
          </View>
        )}

        {/* Notes */}
        {data.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.sectionTitle}>ADDITIONAL NOTES</Text>
            <Text style={styles.notesText}>{data.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerContact}>info@hipervinculo.net | +1 (786) 529-0679</Text>
            <Text style={styles.footerContact}>2645 Executive Park Dr, Suite 146, Weston, FL 33331</Text>
          </View>
          <Text style={styles.footerWebsite}>hipervinculo.net</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generateProposalPDF(data: ProposalPDFData): Promise<Blob> {
  // Use the company logo from assets
  const logoUrl = `${window.location.origin}/og-image.png`;
  
  const doc = <ProposalPDFDocument data={data} logoUrl={logoUrl} />;
  const blob = await pdf(doc).toBlob();
  return blob;
}

export function downloadProposalPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

import { HesacoreReport } from '@/components/reports/HesacoreReport';
import { SEO } from '@/components/SEO';

export default function ReportHesacore() {
  return (
    <>
      <SEO
        title="Reporte Meta Ads 2025 - Hesacore USA | Hipervinculo"
        description="Reporte de rendimiento de Meta Ads para Hesacore USA - Enero a Diciembre 2025"
        noIndex
      />
      <HesacoreReport isPublic />
    </>
  );
}

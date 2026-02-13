import { LalenasFoodReport } from '@/components/reports/LalenasFoodReport';
import { SEO } from '@/components/SEO';

export default function ReportLalenasFood() {
  return (
    <>
      <SEO
        title="Reporte Meta Ads 2025 - Lalenas Food | Hipervinculo"
        description="Reporte de rendimiento de Meta Ads para Lalenas Food - Enero a Diciembre 2025"
        noIndex
      />
      <LalenasFoodReport isPublic />
    </>
  );
}

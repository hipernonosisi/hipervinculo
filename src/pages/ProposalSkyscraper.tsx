import { SkyscraperProposal } from '@/components/proposals/SkyscraperProposal';
import { SEO } from '@/components/SEO';

export default function ProposalSkyscraper() {
  return (
    <div className="h-screen flex flex-col">
      <SEO
        title="Service Proposal - Skyscraper Construction | Hipervinculo"
        description="Web Development & Lead Generation proposal for Skyscraper Construction"
        noIndex
      />
      <SkyscraperProposal />
    </div>
  );
}

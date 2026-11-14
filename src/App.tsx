import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import { RouteNormalizer } from "@/components/RouteNormalizer";
import { ScrollToTop } from "@/components/ScrollToTop";

// Eager: home + main paid-traffic landing (fastest possible FCP for ads)
import Index from "./pages/Index";
const AmazonFbaEbook = lazy(() => import("./pages/AmazonFbaEbook"));
const AmazonPpcEbook = lazy(() => import("./pages/AmazonPpcEbook"));
import NotFound from "./pages/NotFound";

// Lazy: everything else (massive bundle size reduction)
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ShopifyAgency = lazy(() => import("./pages/ShopifyAgency"));
const ShopifyStoreDesign = lazy(() => import("./pages/ShopifyStoreDesign"));
const Pricing = lazy(() => import("./pages/Pricing"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Contact = lazy(() => import("./pages/Contact"));
const Audit = lazy(() => import("./pages/Audit"));
const Admin = lazy(() => import("./pages/Admin"));
const Auth = lazy(() => import("./pages/Auth"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const ReportLalenasFood = lazy(() => import("./pages/ReportLalenasFood"));
const ReportHesacore = lazy(() => import("./pages/ReportHesacore"));
const ThankYouContact = lazy(() => import("./pages/ThankYouContact"));
const ThankYouAudit = lazy(() => import("./pages/ThankYouAudit"));
const Preview = lazy(() => import("./pages/Preview"));
const ThankYouPreview = lazy(() => import("./pages/ThankYouPreview"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Book = lazy(() => import("./pages/Book"));
const AmazonCallback = lazy(() => import("./pages/AmazonCallback"));
const HipervinculoAds = lazy(() => import("./pages/HipervinculoAds"));
const HiperInfluencers = lazy(() => import("./pages/HiperInfluencers"));
const AmazonFbaEbookSuccess = lazy(() => import("./pages/AmazonFbaEbookSuccess"));
const AmazonFbaEbookOferta = lazy(() => import("./pages/AmazonFbaEbookOferta"));
const AmazonPpcEbookSuccess = lazy(() => import("./pages/AmazonPpcEbookSuccess"));
const EbookAnalytics = lazy(() => import("./pages/EbookAnalytics"));
const PersonajesStatus = lazy(() => import("./pages/PersonajesStatus"));
const Terms = lazy(() => import("./pages/Terms"));
const IndustrialAdvisorsProposal = lazy(() => import("./components/proposals/IndustrialAdvisorsProposal"));
const SupremeHerbalsProposal = lazy(() => import("./components/proposals/SupremeHerbalsProposal"));
const SupremeHerbalsShopifyProposal = lazy(() => import("./components/proposals/SupremeHerbalsShopifyProposal"));
const LalenasFoodProposal = lazy(() => import("./components/proposals/LalenasFoodProposal"));
const BesamimProposal = lazy(() => import("./components/proposals/BesamimProposal"));
const BokanovaProposal = lazy(() => import("./components/proposals/BokanovaProposal"));
const SofibellaProposal = lazy(() => import("./components/proposals/SofibellaProposal"));

const queryClient = new QueryClient();

const pageRoutes = (nested = false) => (<>
              <Route {...(nested ? { index: true } : { path: "/" })} element={<Index />} />
              <Route path={nested ? "about" : "/about"} element={<About />} />
              <Route path={nested ? "services" : "/services"} element={<Services />} />
              <Route path={nested ? "shopify-agency" : "/shopify-agency"} element={<ShopifyAgency />} />
              <Route path={nested ? "shopify-agency/store-design" : "/shopify-agency/store-design"} element={<ShopifyStoreDesign />} />
              <Route path={nested ? "pricing" : "/pricing"} element={<Pricing />} />
              <Route path={nested ? "faqs" : "/faqs"} element={<FAQs />} />
              <Route path={nested ? "contact" : "/contact"} element={<Contact />} />
              <Route path={nested ? "audit" : "/audit"} element={<Audit />} />
              <Route path={nested ? "admin" : "/admin"} element={<Admin />} />
              <Route path={nested ? "auth" : "/auth"} element={<Auth />} />
              <Route path={nested ? "privacy" : "/privacy"} element={<Privacy />} />
              <Route path={nested ? "services/:slug" : "/services/:slug"} element={<ServiceDetail />} />
              <Route path={nested ? "report/lalenas-food" : "/report/lalenas-food"} element={<ReportLalenasFood />} />
              <Route path={nested ? "report/hesacore" : "/report/hesacore"} element={<ReportHesacore />} />
              <Route path={nested ? "thank-you/contact" : "/thank-you/contact"} element={<ThankYouContact />} />
              <Route path={nested ? "thank-you/audit" : "/thank-you/audit"} element={<ThankYouAudit />} />
              <Route path={nested ? "preview" : "/preview"} element={<Preview />} />
              <Route path={nested ? "thank-you/preview" : "/thank-you/preview"} element={<ThankYouPreview />} />
              <Route path={nested ? "portfolio" : "/portfolio"} element={<Portfolio />} />
              <Route path={nested ? "portfolio/:slug" : "/portfolio/:slug"} element={<CaseStudy />} />
              <Route path={nested ? "book" : "/book"} element={<Book />} />
              <Route path={nested ? "amazon/callback" : "/amazon/callback"} element={<AmazonCallback />} />
              <Route path={nested ? "amazon-ads" : "/amazon-ads"} element={<HipervinculoAds />} />
              <Route path={nested ? "hiper-influencers" : "/hiper-influencers"} element={<HiperInfluencers />} />
              <Route path={nested ? "amazon-fba-ebook" : "/amazon-fba-ebook"} element={<AmazonFbaEbook />} />
              <Route path={nested ? "amazon-fba-ebook/oferta" : "/amazon-fba-ebook/oferta"} element={<AmazonFbaEbookOferta />} />
              <Route path={nested ? "amazon-fba-ebook/gracias" : "/amazon-fba-ebook/gracias"} element={<AmazonFbaEbookSuccess />} />
              <Route path={nested ? "amazon-fba-ebook/analytics" : "/amazon-fba-ebook/analytics"} element={<EbookAnalytics />} />
              <Route path={nested ? "publicidad-en-amazon" : "/publicidad-en-amazon"} element={<AmazonPpcEbook />} />
              <Route path={nested ? "publicidad-en-amazon/gracias" : "/publicidad-en-amazon/gracias"} element={<AmazonPpcEbookSuccess />} />
              <Route path={nested ? "personajes-status" : "/personajes-status"} element={<PersonajesStatus />} />
              <Route path={nested ? "terms" : "/terms"} element={<Terms />} />
              <Route path={nested ? "proposal/industrial-advisors" : "/proposal/industrial-advisors"} element={<IndustrialAdvisorsProposal />} />
              <Route path={nested ? "proposal/supreme-herbals" : "/proposal/supreme-herbals"} element={<SupremeHerbalsProposal />} />
              <Route path={nested ? "proposal/supreme-herbals-shopify" : "/proposal/supreme-herbals-shopify"} element={<SupremeHerbalsShopifyProposal />} />
              <Route path={nested ? "proposal/lalenas-food" : "/proposal/lalenas-food"} element={<LalenasFoodProposal />} />
              <Route path={nested ? "proposal/besamim-perfumes" : "/proposal/besamim-perfumes"} element={<BesamimProposal />} />
              <Route path={nested ? "proposal/bokanova" : "/proposal/bokanova"} element={<BokanovaProposal />} />
              <Route path={nested ? "proposal/sofibella" : "/proposal/sofibella"} element={<SofibellaProposal />} />
              <Route path="*" element={<NotFound />} />

</>);

const App = ({ ssrUrl, helmetContext }: { ssrUrl?: string; helmetContext?: object }) => {
  const Router = ssrUrl ? MemoryRouter : BrowserRouter;
  return (
  <HelmetProvider context={helmetContext}>
  <QueryClientProvider client={queryClient}>
    <Router {...(ssrUrl ? { initialEntries: [ssrUrl] } : {})}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <RouteNormalizer />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            {pageRoutes()}
            <Route path="/es">{pageRoutes(true)}</Route>
          </Routes>
        </Suspense>
      </TooltipProvider>
    </LanguageProvider>
    </Router>
  </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;

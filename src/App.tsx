import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";

// Eager: home + main paid-traffic landing (fastest possible FCP for ads)
import Index from "./pages/Index";
import AmazonFbaEbook from "./pages/AmazonFbaEbook";
import NotFound from "./pages/NotFound";

// Lazy: everything else (massive bundle size reduction)
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
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
const EbookAnalytics = lazy(() => import("./pages/EbookAnalytics"));
const PersonajesStatus = lazy(() => import("./pages/PersonajesStatus"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/audit" element={<Audit />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/report/lalenas-food" element={<ReportLalenasFood />} />
              <Route path="/report/hesacore" element={<ReportHesacore />} />
              <Route path="/thank-you/contact" element={<ThankYouContact />} />
              <Route path="/thank-you/audit" element={<ThankYouAudit />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/thank-you/preview" element={<ThankYouPreview />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<CaseStudy />} />
              <Route path="/book" element={<Book />} />
              <Route path="/amazon/callback" element={<AmazonCallback />} />
              <Route path="/amazon-ads" element={<HipervinculoAds />} />
              <Route path="/hiper-influencers" element={<HiperInfluencers />} />
              <Route path="/amazon-fba-ebook" element={<AmazonFbaEbook />} />
              <Route path="/amazon-fba-ebook/gracias" element={<AmazonFbaEbookSuccess />} />
              <Route path="/amazon-fba-ebook/analytics" element={<EbookAnalytics />} />
              <Route path="/personajes-status" element={<PersonajesStatus />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

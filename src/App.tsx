import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import Audit from "./pages/Audit";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Privacy from "./pages/Privacy";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import ReportLalenasFood from "./pages/ReportLalenasFood";
import ReportHesacore from "./pages/ReportHesacore";
import ThankYouContact from "./pages/ThankYouContact";
import ThankYouAudit from "./pages/ThankYouAudit";
import Preview from "./pages/Preview";
import ThankYouPreview from "./pages/ThankYouPreview";
import Portfolio from "./pages/Portfolio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

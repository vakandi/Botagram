import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
const Bots = lazy(() => import("./pages/Bots"));
const Docs = lazy(() => import("./pages/Docs"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Discord = lazy(() => import("./pages/Discord"));
const BotDetail = lazy(() => import("./pages/BotDetail"));
import TermsOfService from "./pages/TermsOfService";
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const GDPRCompliance = lazy(() => import("./pages/GDPRCompliance"));
const PlatformCompliance = lazy(() => import("./pages/PlatformCompliance"));
const About = lazy(() => import("./pages/About"));
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  const handleCookieAccept = (preferences: any) => {
    setCookiePreferences(preferences);
    // Here you would typically initialize analytics or other tracking based on preferences
    console.log('Cookie preferences accepted:', preferences);
  };

  const handleCookieReject = () => {
    setCookiePreferences({
      essential: true,
      analytics: false,
      marketing: false,
    });
    console.log('All non-essential cookies rejected');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<div />}> 
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/bots" element={<Bots />} />
              <Route path="/bots/:slug" element={<BotDetail />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/discord" element={<Discord />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/gdpr" element={<GDPRCompliance />} />
              <Route path="/compliance" element={<PlatformCompliance />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieConsent 
            onAccept={handleCookieAccept}
            onReject={handleCookieReject}
          />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

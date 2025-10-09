import Hero from "@/components/Hero";
import { Helmet, HelmetProvider } from "react-helmet-async";
import BotCatalog from "@/components/BotCatalog";
import CustomBots from "@/components/CustomBots";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HelmetProvider>
        <Helmet>
          <title>BOTAGRAM — Bots & Automatisation</title>
          <meta name="description" content="Armada de bots et développement sur mesure. Spline 3D, pagination, accessibilité." />
          <link rel="canonical" href="/" />
        </Helmet>
      </HelmetProvider>
      <Header />
      <div className="pt-16">
        <Hero />
        <BotCatalog />
        <CustomBots />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
};

export default Index;

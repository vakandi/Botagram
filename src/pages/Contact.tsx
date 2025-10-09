import Spline from "@splinetool/react-spline";
import splineScenes from "@/data/spline-scenes.json";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Contact = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <HelmetProvider>
        <Helmet>
          <title>Contact | BOTAGRAM</title>
          <meta name="description" content="Parlez à un expert BOTAGRAM pour votre projet d'automatisation." />
          <link rel="canonical" href="/contact" />
        </Helmet>
      </HelmetProvider>
      <section className="pt-24 pb-24 px-6">
        <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              <span className="text-foreground">Contactez</span>{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">notre équipe</span>
            </h1>
            <p className="text-muted-foreground">
              Dites‑nous en plus sur votre projet d’automatisation. Nous revenons vers vous sous 24h.
            </p>

            <form className="grid grid-cols-1 gap-4">
              <input className="rounded-md bg-card/80 border border-border/40 px-4 py-3" placeholder="Nom" />
              <input className="rounded-md bg-card/80 border border-border/40 px-4 py-3" placeholder="Email" />
              <textarea className="rounded-md bg-card/80 border border-border/40 px-4 py-3 min-h-32" placeholder="Votre message" />
              <button type="submit" className="h-11 rounded-md bg-gradient-primary text-white font-medium">Envoyer</button>
            </form>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-elevated">
            <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
              <Spline scene={splineScenes.contact} className="w-full h-full" />
            </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/15 to-transparent" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;



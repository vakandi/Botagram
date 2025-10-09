import Spline from "@splinetool/react-spline";
import splineScenes from "@/data/spline-scenes.json";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    consent: false,
    newsletter: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <HelmetProvider>
        <Helmet>
          <title>Contact | BOTAGRAM</title>
          <meta name="description" content="Parlez à un expert BOTAGRAM pour votre projet d'automatisation." />
          <link rel="canonical" href="/contact" />
        </Helmet>
      </HelmetProvider>
      <Header />
      
      <div className="pt-16">
        <section className="pt-24 pb-24 px-6">
          <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                  Contact
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold">
                  <span className="text-foreground">Contactez</span>{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">notre équipe</span>
                </h1>
                <p className="text-muted-foreground">
                  Dites‑nous en plus sur votre projet d'automatisation. Nous revenons vers vous sous 24h.
                </p>
              </div>

              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Informations de contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Email : contact@botagram.fr</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Téléphone : +33 1 23 45 67 89</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Horaires : Lun-Ven 9h-18h CET</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">RGPD : contact@botagram.fr</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Formulaire de contact</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Entreprise</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Décrivez votre projet d'automatisation..."
                      className="min-h-32"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
                        required
                      />
                      <Label htmlFor="consent" className="text-sm leading-relaxed">
                        J'accepte que mes données soient traitées conformément à la{" "}
                        <a href="/privacy" className="text-primary hover:underline">Politique de confidentialité</a>{" "}
                        et aux{" "}
                        <a href="/terms" className="text-primary hover:underline">Conditions d'utilisation</a>. *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                      />
                      <Label htmlFor="newsletter" className="text-sm leading-relaxed">
                        Je souhaite recevoir la newsletter BOTAGRAM avec les dernières actualités et conseils d'automatisation.
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 bg-gradient-primary text-white font-medium">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 px-6 bg-gradient-to-b from-muted/10 to-background">
          <div className="container max-w-6xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-elevated">
              <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
                <Spline scene={splineScenes.contact} className="w-full h-full" />
              </div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/15 to-transparent" />
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </main>
  );
};

export default Contact;



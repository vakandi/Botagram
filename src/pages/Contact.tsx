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
    features: "",
    budget: "",
    timeline: "",
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
          <meta name="description" content="Contactez Botagram pour vos logiciels d'automatisation digitale. Développé par COBOU AGENCY LLC." />
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
                  Contactez COBOU AGENCY LLC (Botagram) pour vos logiciels d'automatisation digitale. Nous revenons vers vous sous 24h avec un devis personnalisé et un lien de paiement sécurisé pour les logiciels dont vous avez besoin.
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
                      <span className="text-muted-foreground">Société : COBOU AGENCY LLC</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Support : 24/7 disponible</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Processus de paiement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Après analyse de votre demande, nous vous fournissons :
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div>
                        <span className="font-medium text-foreground">Devis personnalisé</span>
                        <p className="text-muted-foreground">Prix détaillé selon vos besoins spécifiques</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div>
                        <span className="font-medium text-foreground">Lien de paiement sécurisé</span>
                        <p className="text-muted-foreground">Paiement en ligne via notre plateforme sécurisée</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div>
                        <span className="font-medium text-foreground">Accès immédiat</span>
                        <p className="text-muted-foreground">Déploiement des fonctionnalités après paiement</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Paiements acceptés :</strong> Cartes bancaires, PayPal, Virement SEPA<br />
                      <strong>Sécurité :</strong> Transactions chiffrées et conformes PCI DSS<br />
                      <strong>Facturation :</strong> Factures automatiques et reçus disponibles
                    </p>
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

                  <div className="space-y-2">
                    <Label htmlFor="features">Fonctionnalités souhaitées</Label>
                    <Textarea
                      id="features"
                      value={formData.features}
                      onChange={(e) => handleInputChange("features", e.target.value)}
                      placeholder="Ex: Bot Instagram pour posts automatiques, API Twitter pour analytics, développement sur mesure..."
                      className="min-h-20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget approximatif</Label>
                      <Input
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        placeholder="Ex: 500€/mois, 2000€ projet"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Délai souhaité</Label>
                      <Input
                        id="timeline"
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        placeholder="Ex: 2 semaines, 1 mois"
                      />
                    </div>
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
                    Demander un devis et lien de paiement
                  </Button>
            </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 px-6 bg-gradient-to-b from-muted/10 to-background">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                Processus de paiement
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                <span className="text-foreground">Paiements sécurisés</span>{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">via notre plateforme</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tous les paiements sont traités de manière sécurisée via notre plateforme de paiement intégrée, 
                conformément aux standards de sécurité les plus élevés.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="font-semibold text-foreground">1. Devis personnalisé</h3>
                  <p className="text-muted-foreground text-sm">
                    Analyse de vos besoins et création d'un devis détaillé avec prix transparents
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="text-2xl">💳</span>
                  </div>
                  <h3 className="font-semibold text-foreground">2. Lien de paiement</h3>
                  <p className="text-muted-foreground text-sm">
                    Réception d'un lien de paiement sécurisé pour effectuer votre transaction en ligne
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold text-foreground">3. Déploiement</h3>
                  <p className="text-muted-foreground text-sm">
                    Accès immédiat aux fonctionnalités et début de la configuration de vos bots
                  </p>
                </CardContent>
              </Card>
          </div>

            <div className="mt-12 relative rounded-3xl overflow-hidden border border-primary/20 shadow-elevated">
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



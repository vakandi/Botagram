import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/glow-button";
import { Link } from "react-router-dom";
import { 
  Download, 
  Code, 
  Zap, 
  Shield, 
  Bot, 
  ArrowRight, 
  CheckCircle, 
  Package,
  Settings,
  FileText,
  Terminal,
  Database
} from "lucide-react";

const Docs = () => {
  return (
    <main className="min-h-screen bg-background">
      <HelmetProvider>
        <Helmet>
          <title>Documentation | BOTAGRAM - Logiciels d'Automatisation Digitale</title>
          <meta name="description" content="Documentation complète pour nos logiciels d'automatisation digitale. Guides d'installation, API et intégrations pour bots sociaux." />
          <link rel="canonical" href="/docs" />
        </Helmet>
      </HelmetProvider>
      <Header />
      
      <div className="pt-16">
        <section className="py-16 px-6">
          <div className="container max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-6 mb-16">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                <Download className="w-4 h-4 mr-2" />
                Logiciels Digitaux
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold">
                <span className="text-foreground">Documentation</span>{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Logiciels d'Automatisation
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Botagram développe et distribue des <strong>logiciels d'automatisation digitale</strong> pour les réseaux sociaux. 
                Nos produits sont des <strong>outils numériques autonomes</strong> vendus en paiement unique, avec livraison automatique après achat.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary p-4 mx-auto mb-4">
                    <Package className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-xl">Livraison Automatique</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Après paiement, vous recevez automatiquement un lien de téléchargement .zip contenant le logiciel et ses instructions d'installation.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary p-4 mx-auto mb-4">
                    <Code className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-xl">API Officielles</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Nos logiciels utilisent exclusivement les API officielles des plateformes sociales, garantissant conformité et sécurité.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary p-4 mx-auto mb-4">
                    <Shield className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-xl">Autonome & Sécurisé</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Logiciels autonomes fonctionnant sans intervention humaine, avec chiffrement et sécurité intégrés.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Documentation Sections */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-2xl">Installation & Configuration</CardTitle>
                  </div>
                  <CardDescription>
                    Guides complets pour installer et configurer nos logiciels d'automatisation digitale.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Téléchargement automatique après paiement</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Instructions d'installation détaillées</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Configuration des API officielles</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Tests et validation</span>
                    </div>
                  </div>
                  <GlowButton asChild className="w-full">
                    <Link to="/contact">
                      Obtenir un logiciel
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </GlowButton>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-2xl">API & Intégrations</CardTitle>
                  </div>
                  <CardDescription>
                    Documentation technique pour intégrer nos logiciels dans vos systèmes existants.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Endpoints API documentés</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Exemples de code</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Webhooks et événements</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">SDK et bibliothèques</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Voir la documentation API
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Platform-specific Documentation */}
            <div className="mb-16">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Logiciels par Plateforme
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Chaque logiciel est spécialement conçu pour une plateforme sociale spécifique, 
                  utilisant ses API officielles et respectant ses politiques.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Instagram", icon: "📸", desc: "Auto-DM, posts intelligents, réponses automatiques" },
                  { name: "Twitter/X", icon: "🐦", desc: "Publication automatique, engagement, analytics" },
                  { name: "YouTube", icon: "📺", desc: "Upload automatique, gestion des commentaires" },
                  { name: "TikTok", icon: "🎵", desc: "Publication cross-platform, hashtags optimisés" },
                  { name: "LinkedIn", icon: "💼", desc: "Networking automatique, contenu professionnel" },
                  { name: "Discord", icon: "🎮", desc: "Modération automatique, gestion de communauté" }
                ].map((platform) => (
                  <Card key={platform.name} className="bg-card/80 backdrop-blur border-border/50 hover:border-primary/30 transition-colors">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{platform.icon}</div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-sm">
                        {platform.desc}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <Card className="bg-card/80 backdrop-blur border-border/50 mb-16">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
                    <Settings className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-2xl">Spécifications Techniques</CardTitle>
                </div>
                <CardDescription>
                  Détails techniques de nos logiciels d'automatisation digitale.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Livraison & Installation</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Format de livraison : Archive .zip</li>
                      <li>• Installation : Automatique avec script d'installation</li>
                      <li>• Configuration : Interface graphique intuitive</li>
                      <li>• Support : Documentation complète incluse</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Sécurité & Conformité</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• API officielles uniquement</li>
                      <li>• Chiffrement des données sensibles</li>
                      <li>• Respect des limites de taux</li>
                      <li>• Conformité aux politiques des plateformes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Prêt à automatiser vos réseaux sociaux ?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Obtenez votre logiciel d'automatisation digitale dès aujourd'hui. 
                  Livraison automatique après paiement, installation simple et support inclus.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowButton asChild className="group">
                  <Link to="/contact">
                    <Bot className="w-5 h-5 mr-2" />
                    Obtenir un logiciel
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </GlowButton>
                
                <GlowButton asChild subtle>
                  <Link to="/faq">Questions fréquentes</Link>
                </GlowButton>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </main>
  );
};

export default Docs;



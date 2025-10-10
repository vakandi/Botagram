import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/glow-button";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Users, 
  MapPin, 
  Mail, 
  Calendar,
  Code,
  Shield,
  Download,
  Bot,
  ArrowRight,
  CheckCircle,
  Target,
  Zap
} from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <HelmetProvider>
        <Helmet>
          <title>À propos | BOTAGRAM</title>
          <meta name="description" content="Découvrez Botagram - logiciels d'automatisation digitale pour réseaux sociaux." />
          <link rel="canonical" href="/about" />
        </Helmet>
      </HelmetProvider>
      <Header />
      
      <div className="pt-16">
        <section className="py-16 px-6">
          <div className="container max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-6 mb-16">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                <Building2 className="w-4 h-4 mr-2" />
                À propos de nous
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold">
                <span className="text-foreground">COBOU AGENCY LLC</span>{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  développe Botagram
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Société enregistrée dans le Wyoming (USA), nous développons et distribuons des <strong>logiciels d'automatisation digitale</strong> 
                pour les réseaux sociaux. Nos produits sont des <strong>outils numériques autonomes</strong> vendus en paiement unique.
              </p>
            </div>

            {/* Company Details */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <Card className="bg-card/80 backdrop-blur border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-2xl">Informations de l'entreprise</CardTitle>
                  </div>
                  <CardDescription>
                    Détails légaux et administratifs de COBOU AGENCY LLC.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground"><strong>Nom de l'entreprise :</strong> COBOU AGENCY LLC</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground"><strong>Marque :</strong> Botagram</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground"><strong>Forme juridique :</strong> Limited Liability Company (LLC)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground"><strong>Localisation :</strong> Wyoming, États-Unis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground"><strong>Secteur :</strong> Développement de logiciels / SaaS</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Business Overview */}
            <Card className="bg-card/80 backdrop-blur border-border/50 mb-16">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-2xl">Vue d'ensemble de l'entreprise</CardTitle>
                </div>
                <CardDescription>
                  Description de notre activité et de nos produits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Notre activité</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Botagram est une plateforme SaaS développée par COBOU AGENCY LLC. 
                        Nous fournissons des <strong>outils logiciels d'automatisation digitale</strong> 
                        (wrappers) qui permettent aux utilisateurs de se connecter aux 
                        <strong>API officielles des réseaux sociaux</strong> et d'automatiser 
                        des workflows digitaux de manière sécurisée.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Nos produits</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Nous <strong>ne proposons aucun service manuel ou humain</strong>. 
                        Nos produits sont des <strong>packages logiciels (.zip)</strong> 
                        que les utilisateurs peuvent télécharger immédiatement après achat. 
                        Chaque package inclut le logiciel exécutable, la documentation d'installation 
                        et les informations de licence.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Important :</strong> Toutes nos opérations sont 100% digitales, 
                      de la livraison au support client. Nos logiciels fonctionnent de manière 
                      autonome sans intervention humaine.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products & Services */}
            <div className="mb-16">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Produits et services actuels
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Notre gamme de produits d'automatisation digitale pour les réseaux sociaux.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/80 backdrop-blur border-border/50">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
                        <Code className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl">Botagram Social API Wrapper Suite</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Une collection d'outils d'automatisation prêts à l'emploi qui interagissent 
                      avec les API officielles des principales plateformes sociales.
                    </CardDescription>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Instagram, Twitter/X, YouTube, TikTok, LinkedIn</li>
                      <li>• Discord, Telegram, WhatsApp</li>
                      <li>• Simplification des intégrations API complexes</li>
                      <li>• Pour développeurs et marketeurs digitaux</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur border-border/50">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
                        <Download className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl">Botagram Toolkit Installer</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Une application desktop légère qui permet aux utilisateurs de gérer 
                      et mettre à jour leurs modules Botagram installés.
                    </CardDescription>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Gestion centralisée des modules</li>
                      <li>• Mises à jour automatiques</li>
                      <li>• Interface utilisateur intuitive</li>
                      <li>• Configuration simplifiée</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Pricing Model */}
            <Card className="bg-card/80 backdrop-blur border-border/50 mb-16">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-2xl">Modèle de tarification</CardTitle>
                </div>
                <CardDescription>
                  Notre approche de tarification pour les logiciels d'automatisation digitale.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Actuellement, Botagram fonctionne avec des <strong>paiements uniques par licence logicielle</strong> 
                    (pas encore d'abonnements). Chaque achat inclut une licence à vie pour la version achetée.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Livraison des produits</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Produits uniquement digitaux (.zip files)</li>
                        <li>• Hébergés sur infrastructure cloud sécurisée</li>
                        <li>• Téléchargement instantané post-paiement</li>
                        <li>• Système de livraison automatisé en développement</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Traitement des paiements</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Demandes de paiement traitées manuellement</li>
                        <li>• Lien de paiement sécurisé envoyé au client</li>
                        <li>• Intégration de passerelles de paiement en cours</li>
                        <li>• Partenaires : Dodo Payments, Paddle, Wise, Revolut</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Future Plans */}
            <Card className="bg-card/80 backdrop-blur border-border/50 mb-16">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-2xl">Plans futurs (12 prochains mois)</CardTitle>
                </div>
                <CardDescription>
                  Nos objectifs et développements prévus pour l'année à venir.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">Q4 2025</h4>
                      <p className="text-sm text-muted-foreground">
                        Intégration des passerelles de paiement Revolut, Dodo Payments et Paddle.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">Q1 2026</h4>
                      <p className="text-sm text-muted-foreground">
                        Lancement de Botagram Cloud API pour l'automatisation en ligne.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">Q2 2026</h4>
                      <p className="text-sm text-muted-foreground">
                        Introduction d'un programme d'affiliation et de partenariat.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">Q3 2026</h4>
                      <p className="text-sm text-muted-foreground">
                        Transition vers des plans d'abonnement pour services cloud.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">Q4 2026</h4>
                      <p className="text-sm text-muted-foreground">
                        Extension des wrappers API à plus de plateformes sociales et e-commerce.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance */}
            <Card className="bg-card/80 backdrop-blur border-border/50 mb-16">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-2xl">Conformité et gestion des risques</CardTitle>
                </div>
                <CardDescription>
                  Nos engagements en matière de conformité et de sécurité.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Conformité légale</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• COBOU AGENCY LLC est une entité enregistrée au Wyoming (États-Unis)</li>
                        <li>• Toutes les transactions sont digitales</li>
                        <li>• Pas de cash, crypto ou transferts peer-to-peer</li>
                        <li>• Politique de confidentialité et conditions publiques</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Conformité technique</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Tous les logiciels respectent les conditions d'utilisation des API officielles</li>
                        <li>• Conformité avec Meta, X (Twitter), TikTok, LinkedIn</li>
                        <li>• Respect des limites de taux et politiques de contenu</li>
                        <li>• Chiffrement et sécurité intégrés</li>
                      </ul>
                    </div>
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
                  Découvrez nos logiciels d'automatisation digitale développés par COBOU AGENCY LLC. 
                  Livraison automatique après paiement, installation simple et support inclus.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowButton asChild className="group">
                  <Link to="/contact">
                    <Bot className="w-5 h-5 mr-2" />
                    Contactez-nous
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </GlowButton>
                
                <GlowButton asChild subtle>
                  <Link to="/docs">Voir la documentation</Link>
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

export default About;

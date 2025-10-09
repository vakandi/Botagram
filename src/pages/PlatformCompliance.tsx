import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Shield, AlertTriangle, ExternalLink } from "lucide-react";

const PlatformCompliance = () => {
  return (
    <main className="min-h-screen bg-background">
      <HelmetProvider>
        <Helmet>
          <title>Conformité aux plateformes sociales | BOTAGRAM</title>
          <meta name="description" content="BOTAGRAM s'engage à respecter les politiques et conditions d'utilisation de toutes les plateformes sociales que nous supportons." />
          <link rel="canonical" href="/compliance" />
        </Helmet>
      </HelmetProvider>
      <Header />
      
      <div className="pt-16">
        <section className="py-16 px-6">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                Conformité plateformes
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Conformité aux plateformes sociales
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                BOTAGRAM s'engage à respecter intégralement les politiques et conditions d'utilisation de toutes les plateformes sociales
              </p>
            </div>

            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  Notre engagement de conformité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  En tant que fournisseur de services d'automatisation pour les plateformes sociales, BOTAGRAM s'engage à maintenir 
                  la conformité la plus stricte avec toutes les politiques et conditions d'utilisation des plateformes que nous supportons.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-800 dark:text-green-200">API Officielles</h4>
                    </div>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Utilisation exclusive des API officielles de chaque plateforme
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-800 dark:text-green-200">Limites de taux</h4>
                    </div>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Respect strict des quotas et limites de taux
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-800 dark:text-green-200">Politiques de contenu</h4>
                    </div>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Conformité aux politiques de contenu de chaque plateforme
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-800 dark:text-green-200">Surveillance continue</h4>
                    </div>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Mise à jour continue pour maintenir la conformité
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">Plateformes supportées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous supportons les plateformes suivantes en respectant intégralement leurs politiques :
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Plateformes principales</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Instagram - API officielle</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Twitter/X - API officielle</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>YouTube - API officielle</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>TikTok - API officielle</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>LinkedIn - API officielle</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Plateformes de communication</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Discord - API officielle</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Telegram - API officielle</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>WhatsApp Business - API officielle</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Snapchat - API officielle</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  Pratiques interdites
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous nous engageons à ne jamais utiliser ou permettre les pratiques suivantes :
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Manipulation d'engagement</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Achat de followers, likes ou vues</li>
                      <li>• Utilisation de bots pour générer de faux engagements</li>
                      <li>• Manipulation artificielle des métriques</li>
                      <li>• Contournement des algorithmes de détection</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Violation des API</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Contournement des limites de taux</li>
                      <li>• Utilisation d'API non autorisées</li>
                      <li>• Scraping ou extraction de données</li>
                      <li>• Violation des quotas et restrictions</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Contenu inapproprié</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Spam ou contenu malveillant</li>
                      <li>• Contenu illégal ou offensant</li>
                      <li>• Usurpation d'identité</li>
                      <li>• Violation des droits d'auteur</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Pratiques frauduleuses</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Activités frauduleuses</li>
                      <li>• Partage d'identifiants de connexion</li>
                      <li>• Utilisation abusive des services</li>
                      <li>• Non-respect des conditions d'utilisation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">Surveillance et mise à jour</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous maintenons une surveillance active des changements de politiques des plateformes sociales :
                </p>
                
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Surveillance continue</h4>
                    <p className="text-muted-foreground text-sm">
                      Nous surveillons activement les changements de politiques, conditions d'utilisation et restrictions 
                      techniques de toutes les plateformes que nous supportons.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Mise à jour proactive</h4>
                    <p className="text-muted-foreground text-sm">
                      Nos équipes techniques mettent à jour nos services dès que des changements sont détectés 
                      pour maintenir la conformité continue.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Communication transparente</h4>
                    <p className="text-muted-foreground text-sm">
                      Nous informons nos utilisateurs de tout changement significatif qui pourrait affecter 
                      leurs services ou nécessiter des ajustements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">Liens vers les politiques officielles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Consultez les politiques officielles des plateformes que nous supportons :
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Plateformes sociales</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <a href="https://help.instagram.com/581066065581870" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                          Instagram Terms of Use
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <a href="https://twitter.com/en/tos" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                          Twitter Terms of Service
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                          YouTube Terms of Service
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <a href="https://www.tiktok.com/legal/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                          TikTok Terms of Service
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <a href="https://www.linkedin.com/legal/user-agreement" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                          LinkedIn User Agreement
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Plateformes de communication</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                          Discord Terms of Service
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <a href="https://core.telegram.org/api/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                          Telegram API Terms
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <a href="https://www.whatsapp.com/legal/business-api-terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                          WhatsApp Business API Terms
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <a href="https://www.snap.com/en-US/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                          Snapchat Terms of Service
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">Contact et signalement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Si vous avez des questions sur notre conformité ou souhaitez signaler une violation :
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Email :</strong> contact@botagram.fr<br />
                    <strong>Sujet :</strong> Conformité plateformes sociales<br />
                    <strong>Réponse :</strong> Sous 24h ouvrés
                  </p>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Engagement :</strong> BOTAGRAM s'engage à maintenir la conformité la plus stricte avec toutes les plateformes 
                    sociales et à agir rapidement en cas de violation détectée.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <Footer />
      </div>
    </main>
  );
};

export default PlatformCompliance;

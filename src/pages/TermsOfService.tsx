import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-background">
      <HelmetProvider>
        <Helmet>
          <title>Conditions d'utilisation | BOTAGRAM</title>
          <meta name="description" content="Conditions d'utilisation de BOTAGRAM - Plateforme d'automatisation et bots pour réseaux sociaux." />
          <link rel="canonical" href="/terms" />
        </Helmet>
      </HelmetProvider>
      <Header />
      
      <div className="pt-16">
        <section className="py-16 px-6">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                Conditions d'utilisation
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Conditions d'utilisation
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>

            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">1. Acceptation des conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  En accédant et en utilisant les services de BOTAGRAM, vous acceptez d'être lié par ces conditions d'utilisation. 
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                </p>
                <p className="text-muted-foreground">
                  BOTAGRAM se réserve le droit de modifier ces conditions à tout moment. Les modifications prendront effet 
                  immédiatement après leur publication sur cette page.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">2. Description des services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  BOTAGRAM fournit des services d'automatisation pour les réseaux sociaux et plateformes de communication, 
                  incluant mais non limité à :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Bots automatisés pour Instagram, Twitter/X, YouTube, TikTok, LinkedIn, Discord, Telegram, WhatsApp</li>
                  <li>Outils de planification et publication de contenu</li>
                  <li>Systèmes de réponses automatiques</li>
                  <li>Analytics et reporting automatisés</li>
                  <li>Développement de bots personnalisés</li>
                  <li>API et intégrations tierces</li>
                </ul>
                <p className="text-muted-foreground">
                  Nos services utilisent exclusivement les API officielles des plateformes concernées et respectent intégralement leurs conditions d'utilisation, 
                  politiques de communauté et limites de taux. Nous nous engageons à maintenir la conformité avec toutes les plateformes sociales que nous supportons.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">3. Comptes utilisateur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pour utiliser nos services, vous devez créer un compte en fournissant des informations exactes et à jour. 
                  Vous êtes responsable de :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>La sécurité de votre compte et de votre mot de passe</li>
                  <li>Toutes les activités effectuées sous votre compte</li>
                  <li>Maintenir la confidentialité de vos identifiants de connexion</li>
                  <li>Nous notifier immédiatement de toute utilisation non autorisée</li>
                </ul>
                <p className="text-muted-foreground">
                  BOTAGRAM se réserve le droit de suspendre ou de fermer votre compte en cas de violation de ces conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">4. Utilisation acceptable</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Vous vous engagez à utiliser nos services de manière légale et éthique, en respectant strictement les conditions d'utilisation de chaque plateforme sociale. 
                  Il est interdit de :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Violer les conditions d'utilisation des plateformes sociales (Instagram, Twitter/X, YouTube, TikTok, LinkedIn, Discord, Telegram, WhatsApp)</li>
                  <li>Contourner les limites de taux et restrictions techniques des API officielles</li>
                  <li>Envoyer du spam ou du contenu malveillant</li>
                  <li>Usurper l'identité d'autrui</li>
                  <li>Diffuser du contenu illégal, offensant ou inapproprié</li>
                  <li>Tenter de contourner les limitations techniques des plateformes</li>
                  <li>Utiliser nos services pour des activités frauduleuses</li>
                  <li>Partager vos identifiants de connexion avec des tiers</li>
                  <li>Utiliser des bots pour manipuler artificiellement les métriques</li>
                  <li>Engager dans des pratiques de manipulation d'engagement ou de faux followers</li>
                  <li>Violer les politiques de contenu de quelque plateforme que ce soit</li>
                </ul>
                <p className="text-muted-foreground">
                  Le non-respect de ces règles peut entraîner la suspension immédiate de votre compte et des poursuites légales.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">5. Conformité aux plateformes sociales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  BOTAGRAM s'engage à respecter intégralement les politiques et conditions d'utilisation de toutes les plateformes sociales que nous supportons.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Plateformes supportées</h4>
                    <p className="text-muted-foreground text-sm">
                      Instagram, Twitter/X, YouTube, TikTok, LinkedIn, Discord, Telegram, WhatsApp, Snapchat, et autres plateformes conformes.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Nos engagements</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                      <li>Utilisation exclusive des API officielles</li>
                      <li>Respect des limites de taux et quotas</li>
                      <li>Conformité aux politiques de contenu</li>
                      <li>Respect des conditions d'utilisation</li>
                      <li>Mise à jour continue pour maintenir la conformité</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Responsabilités utilisateur</h4>
                    <p className="text-muted-foreground text-sm">
                      Vous êtes responsable de vous assurer que votre utilisation de nos services respecte les conditions d'utilisation 
                      de chaque plateforme et que votre contenu est conforme à leurs politiques. Nous ne sommes pas responsables 
                      des suspensions ou restrictions imposées par les plateformes sociales.
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Important :</strong> En cas de changement des politiques d'une plateforme sociale, nous nous réservons le droit 
                    de suspendre ou modifier nos services pour cette plateforme afin de maintenir la conformité.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">6. Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  BOTAGRAM détient tous les droits de propriété intellectuelle sur :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Le code source de nos bots et applications</li>
                  <li>Les algorithmes et logiques d'automatisation</li>
                  <li>L'interface utilisateur et le design</li>
                  <li>La documentation et les guides</li>
                  <li>Les marques et logos BOTAGRAM</li>
                </ul>
                <p className="text-muted-foreground">
                  Vous conservez la propriété de votre contenu créé via nos services. Vous nous accordez une licence 
                  limitée pour traiter ce contenu dans le cadre de la fourniture de nos services.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">7. Facturation et paiements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nos services sont fournis selon des plans d'abonnement mensuels ou annuels. Les prix sont indiqués 
                  en euros (€) et incluent toutes les taxes applicables.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Les paiements sont prélevés automatiquement selon votre cycle de facturation</li>
                  <li>Vous pouvez modifier ou annuler votre abonnement à tout moment</li>
                  <li>Les modifications prendront effet au prochain cycle de facturation</li>
                  <li>Les remboursements sont soumis à notre politique de remboursement</li>
                  <li>En cas de non-paiement, votre accès peut être suspendu</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">8. Limitation de responsabilité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  BOTAGRAM fournit ses services "en l'état". Nous ne garantissons pas :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>La disponibilité continue de nos services</li>
                  <li>L'absence d'erreurs ou d'interruptions</li>
                  <li>La compatibilité avec tous les systèmes</li>
                  <li>Les résultats spécifiques de l'utilisation de nos bots</li>
                </ul>
                <p className="text-muted-foreground">
                  Dans la mesure permise par la loi, BOTAGRAM ne sera pas responsable des dommages indirects, 
                  consécutifs ou punitifs résultant de l'utilisation de nos services.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">9. Protection des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous nous engageons à protéger vos données personnelles conformément au RGPD. 
                  Consultez notre <a href="/privacy" className="text-primary hover:underline">Politique de confidentialité</a> pour plus de détails.
                </p>
                <p className="text-muted-foreground">
                  Nous utilisons des mesures de sécurité appropriées pour protéger vos informations contre 
                  l'accès non autorisé, la modification, la divulgation ou la destruction.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">10. Résiliation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Vous pouvez résilier votre compte à tout moment via les paramètres de votre compte. 
                  BOTAGRAM peut également résilier votre accès en cas de violation de ces conditions.
                </p>
                <p className="text-muted-foreground">
                  Lors de la résiliation, vos données seront supprimées conformément à notre politique de rétention des données, 
                  sauf obligation légale de conservation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">11. Droit applicable</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Ces conditions sont régies par le droit américain (Wyoming). Tout litige sera soumis à la compétence 
                  exclusive des tribunaux du Wyoming, USA.
                </p>
                <p className="text-muted-foreground">
                  Si une disposition de ces conditions est jugée invalide, les autres dispositions resteront en vigueur.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">12. Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pour toute question concernant ces conditions d'utilisation, contactez-nous :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Email : contact@botagram.fr</li>
                  <li>Société : COBOU AGENCY LLC, Wyoming, USA</li>
                  <li>Via notre <a href="/contact" className="text-primary hover:underline">page de contact</a></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <Footer />
      </div>
    </main>
  );
};

export default TermsOfService;

import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background">
      <HelmetProvider>
        <Helmet>
          <title>Politique de confidentialité | BOTAGRAM</title>
          <meta name="description" content="Politique de confidentialité BOTAGRAM - Protection des données personnelles et conformité RGPD." />
          <link rel="canonical" href="/privacy" />
        </Helmet>
      </HelmetProvider>
      <Header />
      
      <div className="pt-16">
        <section className="py-16 px-6">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                Politique de confidentialité
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Politique de confidentialité
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>

            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">1. Responsable du traitement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  BOTAGRAM, société française, est responsable du traitement de vos données personnelles.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>BOTAGRAM</strong><br />
                    Adresse : Paris, France<br />
                    Email : contact@botagram.fr<br />
                    Délégué à la protection des données : contact@botagram.fr
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">2. Données collectées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous collectons uniquement les données nécessaires au fonctionnement de nos services d'automatisation 
                  conformes aux politiques des plateformes sociales. Nos outils utilisent exclusivement les API officielles 
                  et respectent les limites de taux et conditions d'utilisation de chaque plateforme.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Données d'identification</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Nom et prénom</li>
                      <li>Adresse email</li>
                      <li>Numéro de téléphone (optionnel)</li>
                      <li>Informations de facturation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Données de connexion</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Identifiants de connexion aux plateformes sociales (via API officielles uniquement)</li>
                      <li>Tokens d'authentification (chiffrés)</li>
                      <li>Historique de connexion</li>
                      <li>Respect des limites de taux et quotas</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Conformité plateformes</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Respect des politiques de contenu de chaque plateforme</li>
                      <li>Conformité aux conditions d'utilisation</li>
                      <li>Surveillance des changements de politiques</li>
                      <li>Mise à jour continue pour maintenir la conformité</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Données d'utilisation</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Logs d'activité des bots</li>
                      <li>Métriques de performance</li>
                      <li>Préférences utilisateur</li>
                      <li>Données de navigation (cookies)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">3. Finalités du traitement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous utilisons vos données pour les finalités suivantes :
                </p>
                
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Fourniture des services</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Exécution des automatisations demandées</li>
                      <li>Gestion de votre compte utilisateur</li>
                      <li>Support technique et maintenance</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Facturation et paiements</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Gestion des abonnements</li>
                      <li>Émission de factures</li>
                      <li>Prévention de la fraude</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Amélioration des services</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Analyse des performances</li>
                      <li>Développement de nouvelles fonctionnalités</li>
                      <li>Optimisation de l'expérience utilisateur</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Communication</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Notifications importantes</li>
                      <li>Newsletter (avec consentement)</li>
                      <li>Support client</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">4. Base légale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Le traitement de vos données repose sur les bases légales suivantes :
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-foreground">Exécution du contrat</p>
                      <p className="text-muted-foreground text-sm">Pour la fourniture de nos services d'automatisation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-foreground">Intérêt légitime</p>
                      <p className="text-muted-foreground text-sm">Pour l'amélioration de nos services et la sécurité</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-foreground">Consentement</p>
                      <p className="text-muted-foreground text-sm">Pour les communications marketing et les cookies non essentiels</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-foreground">Obligation légale</p>
                      <p className="text-muted-foreground text-sm">Pour la conservation des données de facturation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">5. Partage des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données avec :
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Prestataires de services</h4>
                    <p className="text-muted-foreground text-sm">
                      Hébergement, paiements, analytics - sous contrat de confidentialité strict
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Plateformes sociales</h4>
                    <p className="text-muted-foreground text-sm">
                      Via leurs API officielles pour l'exécution des automatisations
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Autorités compétentes</h4>
                    <p className="text-muted-foreground text-sm">
                      Uniquement en cas d'obligation légale ou de demande judiciaire
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">6. Transferts internationaux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Certains de nos prestataires peuvent être situés hors de l'Union Européenne. 
                  Dans ce cas, nous nous assurons que des garanties appropriées sont en place :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Décision d'adéquation de la Commission européenne</li>
                  <li>Clauses contractuelles types approuvées par la Commission</li>
                  <li>Certification ou codes de conduite approuvés</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">7. Conservation des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous conservons vos données selon les durées suivantes :
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-foreground">Données de compte</span>
                    <span className="text-sm text-muted-foreground">Durée du compte + 3 ans</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-foreground">Données de facturation</span>
                    <span className="text-sm text-muted-foreground">10 ans (obligation légale)</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-foreground">Logs d'activité</span>
                    <span className="text-sm text-muted-foreground">2 ans</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-foreground">Cookies</span>
                    <span className="text-sm text-muted-foreground">13 mois maximum</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">8. Vos droits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit d'accès</h4>
                    <p className="text-muted-foreground text-sm">Consulter vos données personnelles</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit de rectification</h4>
                    <p className="text-muted-foreground text-sm">Corriger des données inexactes</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit d'effacement</h4>
                    <p className="text-muted-foreground text-sm">Supprimer vos données ("droit à l'oubli")</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit à la portabilité</h4>
                    <p className="text-muted-foreground text-sm">Récupérer vos données dans un format structuré</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit d'opposition</h4>
                    <p className="text-muted-foreground text-sm">Vous opposer au traitement</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit de limitation</h4>
                    <p className="text-muted-foreground text-sm">Limiter le traitement de vos données</p>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Pour exercer vos droits :</strong> Contactez-nous à contact@botagram.fr 
                    ou via votre espace client. Nous répondrons dans un délai d'un mois.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">9. Cookies et technologies similaires</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous utilisons des cookies pour améliorer votre expérience :
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Cookies essentiels</h4>
                    <p className="text-muted-foreground text-sm">
                      Nécessaires au fonctionnement du site (authentification, sécurité)
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Cookies analytiques</h4>
                    <p className="text-muted-foreground text-sm">
                      Mesure d'audience et analyse du comportement (avec consentement)
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Cookies de préférences</h4>
                    <p className="text-muted-foreground text-sm">
                      Sauvegarde de vos préférences et paramètres
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  Vous pouvez gérer vos préférences de cookies via le bandeau de consentement 
                  ou les paramètres de votre navigateur.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">10. Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous mettons en œuvre des mesures de sécurité appropriées :
                </p>
                
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Chiffrement des données sensibles (AES-256)</li>
                  <li>Authentification multi-facteurs</li>
                  <li>Surveillance continue des accès</li>
                  <li>Audits de sécurité réguliers</li>
                  <li>Formation du personnel à la protection des données</li>
                  <li>Sauvegardes sécurisées et chiffrées</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">11. Réclamations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Si vous estimez que vos droits ne sont pas respectés, vous pouvez :
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Nous contacter directement</h4>
                    <p className="text-muted-foreground text-sm">
                      Email : contact@botagram.fr<br />
                      Nous nous engageons à répondre dans les meilleurs délais.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Saisir la CNIL</h4>
                    <p className="text-muted-foreground text-sm">
                      Commission Nationale de l'Informatique et des Libertés<br />
                      Site : www.cnil.fr
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">12. Modifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Cette politique peut être modifiée pour refléter les évolutions de nos services 
                  ou de la réglementation. Les modifications importantes vous seront notifiées 
                  par email ou via une notification sur notre site.
                </p>
                <p className="text-muted-foreground">
                  Nous vous encourageons à consulter régulièrement cette page pour rester 
                  informé de nos pratiques de protection des données.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">13. Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pour toute question concernant cette politique de confidentialité :
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Email :</strong> contact@botagram.fr<br />
                    <strong>Délégué à la protection des données :</strong> contact@botagram.fr<br />
                    <strong>Adresse :</strong> BOTAGRAM, Paris, France<br />
                    <strong>Via notre page de contact :</strong> <a href="/contact" className="text-primary hover:underline">/contact</a>
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

export default PrivacyPolicy;

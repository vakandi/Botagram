import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const GDPRCompliance = () => {
  return (
    <main className="min-h-screen bg-background">
      <HelmetProvider>
        <Helmet>
          <title>Conformité RGPD | BOTAGRAM</title>
          <meta name="description" content="Conformité RGPD BOTAGRAM - Protection des données personnelles et respect du règlement général sur la protection des données." />
          <link rel="canonical" href="/gdpr" />
        </Helmet>
      </HelmetProvider>
      <Header />
      
      <div className="pt-16">
        <section className="py-16 px-6">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                Conformité RGPD
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Conformité RGPD
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                BOTAGRAM s'engage à respecter le Règlement Général sur la Protection des Données (RGPD)
              </p>
            </div>

            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">1. Notre engagement RGPD</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  BOTAGRAM s'engage à respecter intégralement le Règlement Général sur la Protection des Données (RGPD) 
                  entré en vigueur le 25 mai 2018. Nous mettons en œuvre toutes les mesures nécessaires pour protéger 
                  vos données personnelles et respecter vos droits.
                </p>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Principes fondamentaux</h4>
                  <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-1 ml-4 text-sm">
                    <li>Transparence et loyauté dans le traitement des données</li>
                    <li>Minimisation des données collectées</li>
                    <li>Exactitude et mise à jour des informations</li>
                    <li>Limitation de la durée de conservation</li>
                    <li>Intégrité et confidentialité</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

    

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">3. Droits des personnes concernées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit d'accès (Art. 15)</h4>
                    <p className="text-muted-foreground text-sm">
                      Obtenir une copie de vos données personnelles et des informations sur leur traitement.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit de rectification (Art. 16)</h4>
                    <p className="text-muted-foreground text-sm">
                      Corriger ou compléter des données inexactes ou incomplètes.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit d'effacement (Art. 17)</h4>
                    <p className="text-muted-foreground text-sm">
                      Demander la suppression de vos données dans certaines circonstances.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit à la limitation (Art. 18)</h4>
                    <p className="text-muted-foreground text-sm">
                      Limiter le traitement de vos données dans certaines situations.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit à la portabilité (Art. 20)</h4>
                    <p className="text-muted-foreground text-sm">
                      Récupérer vos données dans un format structuré et lisible par machine.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Droit d'opposition (Art. 21)</h4>
                    <p className="text-muted-foreground text-sm">
                      Vous opposer au traitement de vos données pour des raisons légitimes.
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Exercice des droits :</strong> Pour exercer vos droits, contactez-nous à contact@botagram.fr 
                    ou via votre espace client. Nous répondrons dans un délai d'un mois.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">4. Bases légales du traitement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous traitons vos données sur les bases légales suivantes :
                </p>
                
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Exécution du contrat (Art. 6.1.b)</h4>
                    <p className="text-muted-foreground text-sm">
                      Traitement nécessaire à l'exécution du contrat de service que vous avez souscrit.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Données concernées : identité, facturation, utilisation des services
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Intérêt légitime (Art. 6.1.f)</h4>
                    <p className="text-muted-foreground text-sm">
                      Traitement nécessaire aux fins des intérêts légitimes de BOTAGRAM.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Données concernées : analytics, sécurité, amélioration des services
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Consentement (Art. 6.1.a)</h4>
                    <p className="text-muted-foreground text-sm">
                      Vous avez donné votre consentement au traitement de vos données.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Données concernées : marketing, cookies non essentiels
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Obligation légale (Art. 6.1.c)</h4>
                    <p className="text-muted-foreground text-sm">
                      Traitement nécessaire au respect d'une obligation légale.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Données concernées : conservation des données de facturation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">5. Mesures de sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées :
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Chiffrement</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                      <li>Chiffrement AES-256 pour les données sensibles</li>
                      <li>HTTPS/TLS pour les communications</li>
                      <li>Chiffrement des sauvegardes</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Contrôle d'accès</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                      <li>Authentification multi-facteurs</li>
                      <li>Gestion des rôles et permissions</li>
                      <li>Audit des accès</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Surveillance</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                      <li>Monitoring 24/7</li>
                      <li>Détection d'intrusion</li>
                      <li>Alertes de sécurité</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Formation</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                      <li>Formation RGPD du personnel</li>
                      <li>Bonnes pratiques de sécurité</li>
                      <li>Procédures de gestion des incidents</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">6. Sous-traitants et transferts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous travaillons avec des sous-traitants sélectionnés pour leur conformité RGPD :
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Hébergement</h4>
                    <p className="text-muted-foreground text-sm">
                      Services cloud certifiés avec garanties de sécurité et conformité RGPD
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Paiements</h4>
                    <p className="text-muted-foreground text-sm">
                      Processeurs de paiement certifiés PCI DSS pour la sécurité des données bancaires
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Analytics</h4>
                    <p className="text-muted-foreground text-sm">
                      Outils d'analyse respectueux de la vie privée avec options de désactivation
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Transferts internationaux :</strong> Tous nos sous-traitants sont soumis à des 
                    clauses contractuelles types approuvées par la Commission européenne ou bénéficient 
                    d'une décision d'adéquation.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">7. Violations de données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  En cas de violation de données personnelles, nous nous engageons à :
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-xs">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Notification à la CNIL</h4>
                      <p className="text-muted-foreground text-sm">
                        Dans les 72h suivant la découverte de la violation
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-xs">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Information des personnes concernées</h4>
                      <p className="text-muted-foreground text-sm">
                        Si la violation présente un risque élevé pour leurs droits et libertés
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-xs">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Mesures correctives</h4>
                      <p className="text-muted-foreground text-sm">
                        Mise en œuvre immédiate de mesures pour limiter les conséquences
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">8. Délégué à la protection des données (DPO)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  BOTAGRAM a désigné un Délégué à la Protection des Données (DPO) indépendant :
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Contact DPO</h4>
                  <p className="text-muted-foreground text-sm">
                    <strong>Email :</strong> contact@botagram.fr<br />
                    <strong>Rôle :</strong> Conseiller sur la conformité RGPD<br />
                    <strong>Indépendance :</strong> Le DPO agit de manière indépendante<br />
                    <strong>Confidentialité :</strong> Toutes les communications sont confidentielles
                  </p>
                </div>
                
                <p className="text-muted-foreground text-sm">
                  Le DPO peut être contacté pour toute question relative à la protection des données 
                  ou pour signaler une préoccupation concernant le traitement de vos données personnelles.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">9. Réclamations et recours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Si vous estimez que vos droits ne sont pas respectés, vous pouvez :
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">1. Nous contacter directement</h4>
                    <p className="text-muted-foreground text-sm">
                      Email : contact@botagram.fr<br />
                      Nous nous engageons à examiner et répondre à toute réclamation.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">2. Saisir la CNIL</h4>
                    <p className="text-muted-foreground text-sm">
                      Commission Nationale de l'Informatique et des Libertés<br />
                      Site : www.cnil.fr | Tél : 01 53 73 22 22
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">3. Recours judiciaire</h4>
                    <p className="text-muted-foreground text-sm">
                      Vous pouvez également saisir les tribunaux compétents pour obtenir réparation 
                      du préjudice subi.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">10. Contact et informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pour toute question concernant notre conformité RGPD :
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Email général :</strong> contact@botagram.fr<br />
                    <strong>Délégué à la protection des données :</strong> contact@botagram.fr<br />
                    <strong>Support client :</strong> contact@botagram.fr<br />
                    <strong>Adresse :</strong> BOTAGRAM, Paris, France<br />
                    <strong>Page de contact :</strong> <a href="/contact" className="text-primary hover:underline">/contact</a>
                  </p>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Engagement :</strong> BOTAGRAM s'engage à maintenir sa conformité RGPD 
                    et à améliorer continuellement ses pratiques de protection des données.
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

export default GDPRCompliance;

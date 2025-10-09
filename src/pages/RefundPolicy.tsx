import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const RefundPolicy = () => {
  return (
    <main className="min-h-screen bg-background">
      <HelmetProvider>
        <Helmet>
          <title>Politique de remboursement | BOTAGRAM</title>
          <meta name="description" content="Politique de remboursement BOTAGRAM - Conditions et procédures de remboursement pour nos services d'automatisation." />
          <link rel="canonical" href="/refund" />
        </Helmet>
      </HelmetProvider>
      <Header />
      
      <div className="pt-16">
        <section className="py-16 px-6">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                Politique de remboursement
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Politique de remboursement
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>

            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">1. Droit de rétractation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Conformément à la législation française, vous disposez d'un droit de rétractation de 14 jours 
                  à compter de la souscription de votre abonnement, sous certaines conditions.
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Conditions d'éligibilité</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Demande formulée dans les 14 jours suivant la souscription</li>
                    <li>Aucune utilisation significative des services payants</li>
                    <li>Respect des conditions d'utilisation</li>
                    <li>Non-utilisation des fonctionnalités premium</li>
                  </ul>
                </div>
                
                <p className="text-muted-foreground">
                  <strong>Note :</strong> Le droit de rétractation ne s'applique pas si vous avez commencé 
                  à utiliser nos services de manière significative pendant la période d'essai.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">2. Cas de remboursement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous accordons des remboursements dans les cas suivants :
                </p>
                
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Remboursements automatiques</h4>
                    <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-1 ml-4 text-sm">
                      <li>Erreur technique empêchant l'utilisation des services</li>
                      <li>Interruption de service non planifiée de plus de 24h</li>
                      <li>Non-respect des fonctionnalités promises</li>
                      <li>Problème de sécurité affectant vos données</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Remboursements sous conditions</h4>
                    <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-1 ml-4 text-sm">
                      <li>Changement de politique des plateformes sociales</li>
                      <li>Incompatibilité technique non résolue</li>
                      <li>Fermeture de compte pour raisons légitimes</li>
                      <li>Décès ou incapacité permanente du titulaire</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Remboursements refusés</h4>
                    <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-1 ml-4 text-sm">
                      <li>Violation des conditions d'utilisation</li>
                      <li>Utilisation abusive des services</li>
                      <li>Demande après la période de rétractation</li>
                      <li>Changement d'avis sans raison technique</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">3. Procédure de remboursement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pour demander un remboursement, suivez ces étapes :
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Contactez notre support</h4>
                      <p className="text-muted-foreground text-sm">
                        Envoyez un email à contact@botagram.fr avec votre numéro de commande 
                        et la raison de votre demande de remboursement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Évaluation de la demande</h4>
                      <p className="text-muted-foreground text-sm">
                        Notre équipe examine votre demande sous 48h et vous informe de la décision.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Traitement du remboursement</h4>
                      <p className="text-muted-foreground text-sm">
                        Si approuvé, le remboursement est traité sous 5-10 jours ouvrés selon 
                        votre méthode de paiement.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Informations requises :</strong><br />
                    • Numéro de commande ou email de facturation<br />
                    • Raison détaillée de la demande<br />
                    • Preuves de dysfonctionnement (si applicable)<br />
                    • Coordonnées bancaires (si différent du paiement initial)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">4. Délais et méthodes de remboursement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Les remboursements sont traités selon les délais suivants :
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-foreground">Cartes bancaires</span>
                    <span className="text-sm text-muted-foreground">5-7 jours ouvrés</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-foreground">PayPal</span>
                    <span className="text-sm text-muted-foreground">3-5 jours ouvrés</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-foreground">Virement SEPA</span>
                    <span className="text-sm text-muted-foreground">7-10 jours ouvrés</span>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Important :</strong> Le remboursement sera effectué sur le même moyen de paiement 
                    utilisé pour l'achat initial, sauf demande contraire justifiée.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">5. Remboursements partiels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Dans certains cas, nous pouvons proposer un remboursement partiel :
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Calcul au prorata</h4>
                    <p className="text-muted-foreground text-sm">
                      Si vous avez utilisé partiellement les services, le remboursement sera calculé 
                      au prorata de la période non utilisée.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Frais de service</h4>
                    <p className="text-muted-foreground text-sm">
                      Les frais de traitement et de service peuvent être déduits du montant remboursé 
                      si la demande est faite après utilisation significative.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Crédit de service</h4>
                    <p className="text-muted-foreground text-sm">
                      Alternative au remboursement : crédit de service utilisable pour un futur abonnement 
                      ou des services additionnels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">6. Annulation d'abonnement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Vous pouvez annuler votre abonnement à tout moment :
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Via votre espace client</h4>
                    <p className="text-muted-foreground text-sm">
                      Accédez à "Paramètres" &gt; "Abonnement" &gt; "Annuler l'abonnement"
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Par email</h4>
                    <p className="text-muted-foreground text-sm">
                      Envoyez votre demande à contact@botagram.fr avec votre numéro de compte
                    </p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Important :</strong> L'annulation prend effet à la fin de la période de facturation en cours. 
                    Vous conservez l'accès aux services jusqu'à cette date.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">7. Politique pour les entreprises</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pour les comptes Enterprise et Business, des conditions spécifiques s'appliquent :
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Période d'essai étendue</h4>
                    <p className="text-muted-foreground text-sm">
                      30 jours d'essai gratuit pour évaluer nos services Enterprise
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Support dédié</h4>
                    <p className="text-muted-foreground text-sm">
                      Accompagnement personnalisé pendant la période d'essai
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Remboursement conditionnel</h4>
                    <p className="text-muted-foreground text-sm">
                      Remboursement possible si les objectifs convenus ne sont pas atteints
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">8. Litiges et médiation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  En cas de litige concernant un remboursement :
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Médiation de la consommation</h4>
                    <p className="text-muted-foreground text-sm">
                      Vous pouvez saisir un médiateur de la consommation dans un délai d'un an 
                      à compter de votre réclamation écrite.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Plateforme RLL</h4>
                    <p className="text-muted-foreground text-sm">
                      Résolution en ligne des litiges : https://webgate.ec.europa.eu/odr/
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  Nous nous engageons à rechercher une solution amiable avant toute procédure judiciaire.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">9. Contact et support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pour toute question concernant les remboursements :
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Email support :</strong> contact@botagram.fr<br />
                    <strong>Email remboursements :</strong> contact@botagram.fr<br />
                    <strong>Téléphone :</strong> +33 1 23 45 67 89 (Lun-Ven 9h-18h CET)<br />
                    <strong>Via notre page de contact :</strong> <a href="/contact" className="text-primary hover:underline">/contact</a>
                  </p>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Délai de réponse :</strong> Nous nous engageons à répondre à toute demande 
                    de remboursement dans un délai de 48h ouvrés.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">10. Modifications de la politique</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Cette politique de remboursement peut être modifiée pour refléter les évolutions 
                  de nos services ou de la réglementation. Les modifications importantes vous 
                  seront notifiées par email au moins 30 jours avant leur entrée en vigueur.
                </p>
                <p className="text-muted-foreground">
                  Les demandes de remboursement en cours seront traitées selon la politique 
                  en vigueur au moment de la souscription de l'abonnement.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <Footer />
      </div>
    </main>
  );
};

export default RefundPolicy;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/glow-button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  HelpCircle, 
  MessageSquare, 
  ArrowRight,
  Mail,
  Phone,
  Clock
} from "lucide-react";

const faqs = [
  {
    question: "Quels bots proposez-vous ?",
    answer: "Nous proposons des bots pour Instagram, Twitter/X, YouTube, TikTok, LinkedIn, Telegram et bien d'autres plateformes. Chaque bot est optimisé pour sa plateforme spécifique avec des fonctionnalités avancées de scheduling, analytics et automation."
  },
  {
    question: "Faites-vous du développement sur mesure ?",
    answer: "Absolument ! Nous sommes spécialisés dans le développement de bots custom avec API creation, browser automation et intégrations complexes. Nous pouvons créer des solutions uniques pour vos besoins spécifiques."
  },
  {
    question: "Combien de temps faut-il pour déployer un bot ?",
    answer: "Les bots de notre armada sont déployables en moins de 5 minutes. Pour les développements custom, comptez 2-4 semaines selon la complexité du projet."
  },
  {
    question: "Proposez-vous un support technique ?",
    answer: "Oui ! Support email pour le plan Starter, support prioritaire pour Pro, et support dédié 24/7 pour Enterprise. Nous garantissons également un SLA de 99.9% sur tous nos services."
  },
  {
    question: "Vos bots respectent-ils les CGU des plateformes ?",
    answer: "Nos bots sont conçus pour respecter les limites et bonnes pratiques de chaque plateforme. Nous utilisons des stratégies anti-blocking avancées pour garantir la sécurité de vos comptes."
  },
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements sont effectifs immédiatement et la facturation est proratisée."
  },
  {
    question: "Offrez-vous une période d'essai ?",
    answer: "Tous nos plans incluent 14 jours d'essai gratuit, aucune carte bancaire requise. Vous pouvez tester toutes les fonctionnalités sans engagement."
  },
  {
    question: "Comment fonctionnent les intégrations API ?",
    answer: "Nous proposons des APIs REST et webhooks pour intégrer nos bots à vos systèmes existants. Documentation complète et exemples de code fournis pour tous les endpoints."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/10" id="faq">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* FAQ Section */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent">
                <HelpCircle className="w-4 h-4 mr-2" />
                Questions Fréquentes
              </Badge>
              
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-foreground">Tout ce que vous</span>{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  devez savoir
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Retrouvez les réponses aux questions les plus courantes sur nos bots 
                et services d'automatisation.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 px-6"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <span className="font-medium text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="pt-8">
              <p className="text-muted-foreground mb-4">Vous ne trouvez pas votre réponse ?</p>
              <GlowButton asChild subtle className="group">
                <Link to="/docs">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Voir toute la documentation
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlowButton>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-scale-in">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary p-4 mx-auto mb-4">
                  <MessageSquare className="w-full h-full text-white" />
                </div>
                
                <CardTitle className="text-2xl font-bold text-foreground">
                  Parlons de votre projet
                </CardTitle>
                
                <p className="text-muted-foreground">
                  Décrivez-nous vos besoins et recevez une réponse personnalisée sous 48h
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John"
                      className="bg-background/50 border-border/50 focus:border-primary/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe"
                      className="bg-background/50 border-border/50 focus:border-primary/50" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@exemple.com"
                    className="bg-background/50 border-border/50 focus:border-primary/50" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input 
                    id="company" 
                    placeholder="Mon Entreprise"
                    className="bg-background/50 border-border/50 focus:border-primary/50" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project">Décrivez votre projet</Label>
                  <Textarea 
                    id="project" 
                    placeholder="J'aimerais automatiser..."
                    rows={4}
                    className="bg-background/50 border-border/50 focus:border-primary/50 resize-none" 
                  />
                </div>

                <GlowButton className="w-full group">
                  <Mail className="w-5 h-5 mr-2" />
                  Envoyer ma demande
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </GlowButton>

                {/* Contact info */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/20">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>Réponse sous 48h</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-accent" />
                    <span>Consultation gratuite</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
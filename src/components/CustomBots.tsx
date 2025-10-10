import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/glow-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, 
  Globe, 
  Shield, 
  Zap,
  ArrowRight,
  Code,
  Database,
  Workflow,
  Brain,
  Target,
  TrendingUp,
  BarChart3,
  Network,
  Settings,
  Users,
  MessageSquare,
  Share2,
  Heart,
  Eye,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    icon: Users,
    title: "Gestion d'Audience",
    description: "Automatisation de la croissance et de l'engagement de votre communauté sur tous les réseaux"
  },
  {
    icon: MessageSquare,
    title: "Publication Intelligente",
    description: "Planification et publication automatique de contenu optimisé selon les algorithmes de chaque plateforme"
  },
  {
    icon: Share2,
    title: "Cross-Posting",
    description: "Distribution automatique de contenu adapté aux spécificités de chaque réseau social"
  },
  {
    icon: Heart,
    title: "Engagement Automatique",
    description: "Interactions automatiques intelligentes : likes, commentaires et partages stratégiques"
  },
  {
    icon: Eye,
    title: "Monitoring & Analytics",
    description: "Surveillance en temps réel des performances et analyse des tendances de vos réseaux"
  },
  {
    icon: Calendar,
    title: "Planification Avancée",
    description: "Optimisation des horaires de publication selon les pics d'activité de votre audience"
  }
];

const process = [
  {
    step: "01",
    title: "Analyse de vos besoins",
    description: "Analyse approfondie de vos besoins et contraintes techniques"
  },
  {
    step: "02", 
    title: "Construction",
    description: "Développement customisé avec architecture evoluable et sécurisée"
  },
  {
    step: "03",
    title: "Deploiment",
    description: "Mise en production avec maintenance et maintenance continue"
  }
];

const CustomBots = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden" id="custom">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-highlight/5 to-accent/10" />
      <div className="absolute inset-0 backdrop-blur-3xl" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-20 animate-fade-in">
          <Badge variant="outline" className="border-highlight/40 bg-highlight/10 text-highlight">
            <Zap className="w-4 h-4 mr-2" />
            Premium Sur Mesure
          </Badge>
          
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="text-foreground">L'automatisation ?</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Nôtre Point Fort.
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Botagram est une plateforme SaaS appartenant à COBOU LLC, société enregistrée dans le Wyoming (USA). 
            Nous développons et distribuons des logiciels d'automatisation pour les réseaux sociaux, basés sur les API officielles de ces plateformes. 
            Tous nos produits sont des outils numériques — vendus en paiement unique, sans abonnement ni intervention humaine.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {capabilities.map((capability, index) => {
            const IconComponent = capability.icon;
            
            return (
              <Card 
                key={capability.title}
                className="bg-card/40 backdrop-blur-sm border-border/30 hover:border-primary/40 transition-all duration-300 hover:shadow-glow animate-scale-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-foreground">
                    {capability.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center">
                    {capability.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="bg-card/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-border/30 mb-16 animate-fade-in">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Notre processus en 3 étapes
            </h3>
            <p className="text-lg text-muted-foreground">
              De l'idée au déploiement, nous vous accompagnons à chaque étape
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div 
                key={step.step}
                className="relative text-center animate-scale-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step number */}
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-glow">
                  {step.step}
                </div>
                
                <h4 className="text-2xl font-bold text-foreground mb-4">
                  {step.title}
                </h4>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-primary to-transparent transform translate-x-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
              Prêt pour du <span className="bg-gradient-primary bg-clip-text text-transparent">sur-mesure</span> ?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Après paiement, le client reçoit un lien de téléchargement automatique au format .zip, contenant le logiciel et ses instructions d'installation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton asChild className="group">
              <Link to="/contact">
                <Cpu className="w-5 h-5 mr-2" />
                Contactez-nous
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </GlowButton>
            
            <GlowButton asChild subtle>
              <Link to="/docs">Voir nos réalisations</Link>
            </GlowButton>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">48h</div>
              <div className="text-sm text-muted-foreground">Temps de réponse</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-highlight">100%</div>
              <div className="text-sm text-muted-foreground">Projets livrés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support technique</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">5 ans</div>
              <div className="text-sm text-muted-foreground">Expertise moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomBots;
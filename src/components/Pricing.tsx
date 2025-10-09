import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/glow-button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { botsCatalog } from "@/data/bots";
import { 
  Check, 
  Zap, 
  ArrowRight,
  Star,
  Crown,
  Rocket
} from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    description: "Pour tester et découvrir",
    icon: Rocket,
    color: "from-accent to-accent/80",
    monthlyPrice: 49,
    yearlyPrice: 39,
    badge: "Parfait pour débuter",
    features: [
      "2 bots inclus",
      "1000 actions/mois",
      "Support email",
      "Analytics de base",
      "Templates prêts",
      "Intégrations essentielles"
    ],
    cta: "Commencer gratuitement",
    popular: false
  },
  {
    name: "Pro",
    description: "Pour croître et scaler",
    icon: Star,
    color: "from-primary to-highlight",
    monthlyPrice: 149,
    yearlyPrice: 119,
    badge: "Le plus populaire",
    features: [
      "10 bots inclus",
      "10,000 actions/mois",
      "Support prioritaire",
      "Analytics avancées",
      "Custom webhooks",
      "API access",
      "Scheduling avancé",
      "Multi-comptes"
    ],
    cta: "Démarrer Pro",
    popular: true
  },
  {
    name: "Enterprise",
    description: "Scale sans limites",
    icon: Crown,
    color: "from-highlight to-primary",
    monthlyPrice: null,
    yearlyPrice: null,
    badge: "Scale total",
    features: [
      "Bots illimités",
      "Actions illimitées",
      "Support dédié 24/7",
      "Custom integrations",
      "SLA garanti",
      "Onboarding personnalisé",
      "White-label option",
      "Custom développements"
    ],
    cta: "Parler aux ventes",
    popular: false
  }
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>("instagram");

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/10 to-background" id="pricing">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
            <Zap className="w-4 h-4 mr-2" />
            Tarification Simple
          </Badge>
          
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="text-foreground">Un plan pour</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              chaque stade
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Du test au scale. Transparence totale, aucun frais caché, 
            changement de plan à tout moment.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Mensuel
            </span>
            <Switch 
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annuel
            </span>
            <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent ml-2">
              -20%
            </Badge>
          </div>

          {/* Network selection bar */}
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-4xl overflow-x-auto px-2">
              <ToggleGroup
                type="single"
                value={selectedNetwork}
                onValueChange={(value) => value && setSelectedNetwork(value)}
                className="mx-auto flex min-w-max gap-2 rounded-full bg-muted/40 p-1 backdrop-blur supports-[backdrop-filter]:bg-muted/30 shadow-inner"
                aria-label="Choisir un réseau"
              >
                {botsCatalog.map((bot) => {
                  const Icon = bot.Icon;
                  return (
                    <ToggleGroupItem
                      key={bot.id}
                      value={bot.id}
                      className="group rounded-full px-4 py-2 text-muted-foreground transition-all duration-300 hover:text-foreground hover:-translate-y-0.5 data-[state=on]:bg-gradient-to-r data-[state=on]:from-primary data-[state=on]:to-highlight data-[state=on]:text-white data-[state=on]:shadow-glow focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={bot.name}
                    >
                      <Icon className="mr-2 h-4 w-4 transition-transform duration-300 group-data-[state=on]:scale-110" />
                      <span className="whitespace-nowrap text-sm font-medium">{bot.name}</span>
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            
            return (
              <Card 
                key={plan.name}
                className={`relative bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 animate-scale-in ${
                  plan.popular 
                    ? 'border-primary/50 shadow-glow' 
                    : 'border-border/50 hover:border-primary/30'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-white px-4 py-1">
                      ⭐ {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} p-4 mx-auto mb-4`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>

                  {/* Price */}
                  <div className="mt-6">
                    {price ? (
                      <div className="space-y-2">
                        <div className="text-4xl font-bold text-foreground">
                          {price}€
                          <span className="text-lg text-muted-foreground">
                            /{isYearly ? 'mois' : 'mois'}
                          </span>
                        </div>
                        {isYearly && (
                          <div className="text-sm text-accent">
                            Économisez {((plan.monthlyPrice! - price) * 12).toFixed(0)}€/an
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-foreground">
                        Sur devis
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <GlowButton asChild className="w-full group">
                    <Link to={plan.name === 'Enterprise' ? '/contact' : '/docs#pricing'}>
                      {plan.cta}
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </GlowButton>
                </CardContent>

                {/* Glow effect for popular plan */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-glow rounded-lg opacity-20 pointer-events-none" />
                )}
              </Card>
            );
          })}
        </div>

        {/* Custom Bots CTA */}
        <div className="bg-gradient-to-r from-primary/10 via-highlight/10 to-accent/10 rounded-3xl p-8 lg:p-12 border border-primary/20 text-center animate-fade-in">
          <div className="space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto shadow-glow">
              <Zap className="w-10 h-10 text-white" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                Besoin de quelque chose de <span className="bg-gradient-primary bg-clip-text text-transparent">spécial</span> ?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Bots sur mesure, intégrations complexes, API creation. 
                Nous développons la solution parfaite pour vos besoins.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton asChild className="group">
                <Link to="/contact">
                  Discuter de mon projet
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlowButton>
              
              <GlowButton asChild subtle>
                <Link to="/docs">Voir nos réalisations</Link>
              </GlowButton>
            </div>
          </div>
        </div>

        {/* Trust section */}
        <div className="text-center mt-16 space-y-8 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">14 jours</div>
              <div className="text-sm text-muted-foreground">Essai gratuit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-highlight">0€</div>
              <div className="text-sm text-muted-foreground">Frais setup</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Activation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">99.9%</div>
              <div className="text-sm text-muted-foreground">SLA garanti</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
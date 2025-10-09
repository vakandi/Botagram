import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/glow-button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Music2,
  Search,
  MessageSquare,
  BarChart3,
  Zap,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

const bots = [
  {
    id: "instagram",
    platform: "Instagram",
    icon: Instagram,
    color: "from-pink-500 to-purple-600",
    features: ["Planification des publications", "Workflows DM", "Analyses avancées"],
    description: "Automatisez votre présence Instagram avec des outils de planification et d'engagement.",
    badge: "Populaire",
    slug: "instagram"
  },
  {
    id: "twitter",
    platform: "Twitter (X)",
    icon: Twitter,
    color: "from-blue-400 to-blue-600",
    features: ["Publication automatique", "Suivi des mentions", "Alertes de threads"],
    description: "Gérez votre stratégie Twitter avec des outils de publication et de veille.",
    badge: "Nouveau",
    slug: "x-twitter"
  },
  {
    id: "youtube",
    platform: "YouTube",
    icon: Youtube,
    color: "from-red-500 to-red-700",
    features: ["Pipeline d'upload", "Triage des commentaires", "Rapports analytiques"],
    description: "Optimisez votre chaîne YouTube avec des outils de gestion de contenu.",
    badge: null,
    slug: "youtube"
  },
  {
    id: "tiktok",
    platform: "TikTok",
    icon: Music2,
    color: "from-purple-500 to-pink-500",
    features: ["Planification des publications", "Gestion des commentaires", "Analyses avancées"],
    description: "Maximisez votre présence TikTok avec des outils de publication et d’automatisation avancés.",
    badge: "Tendance",
    slug: "tiktok"
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    icon: BarChart3,
    color: "from-blue-600 to-blue-800",
    features: ["Publication professionnelle", "Croissance du réseau", "Génération de leads"],
    description: "Développez votre réseau professionnel avec des outils d'automatisation B2B.",
    badge: null,
    slug: "linkedin"
  },
  {
    id: "telegram",
    platform: "Telegram",
    icon: MessageSquare,
    color: "from-cyan-400 to-blue-500",
    features: ["Gestion des canaux", "Interactions bot", "Envois de masse"],
    description: "Gérez vos canaux Telegram avec des outils de communication avancés.",
    badge: null,
    slug: "telegram"
  }
];

// Mapping des images de fond par réseau (cartes comme TikTok)
const backgroundById: Record<string, string> = {
  instagram: "/ChatGPT Image 21 sept. 2025, 03_16_18.png",
  twitter: "/ChatGPT Image 21 sept. 2025, 03_59_26.png",
  youtube: "/ChatGPT Image 21 sept. 2025, 03_41_05.png",
  tiktok: "/Tiktokdimensions.png",
  linkedin: "/ChatGPT Image 21 sept. 2025, 04_20_07.png",
  telegram: "/ChatGPT Image 21 sept. 2025, 04_06_50.png"
};

const filters = ["Tous", "Réseaux sociaux", "Messaging", "Analytics", "E-commerce"];

const BotCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filteredBots = bots.filter(bot =>
    bot.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.features.some(feature => 
      feature.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#0A141E" }} id="catalog">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent">
            <Zap className="w-4 h-4 mr-2" />
            Notre Armada
          </Badge>
          
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Bots prêts
            </span>{" "}
            <span className="text-foreground">à déployer</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choisissez parmi notre collection de bots optimisés pour chaque plateforme. 
            Déployement en moins de 5 minutes.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 animate-fade-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Rechercher un bot ou une fonctionnalité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "hero" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="whitespace-nowrap"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Bot Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBots.map((bot, index) => {
            const IconComponent = bot.icon;
            
            return (
              <Card 
                key={bot.id}
                className="group relative bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card hover:-translate-y-2 animate-scale-in flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image de fond pour toutes les cartes (template TikTok) */}
                <div 
                  className="absolute inset-0 rounded-lg bg-cover bg-center bg-no-repeat pointer-events-none"
                  style={{
                    backgroundImage: `url('${backgroundById[bot.id as keyof typeof backgroundById] || ""}')`
                  }}
                />
                <CardHeader className="relative">
                  {/* Badge */}
                  {bot.badge && (
                    <Badge 
                      variant="outline" 
                      className="absolute top-4 right-4 border-primary/40 bg-primary/10 text-primary"
                    >
                      {bot.badge}
                    </Badge>
                  )}
                  
                  <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    <span className="inline-flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      {bot.platform}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 flex flex-col">
                  {/* Capsule description centrée (comme TikTok) */}
                  <div className="flex justify-center">
                    <span className="relative inline-block max-w-md w-full">
                      <span className="absolute inset-0 rounded-2xl bg-black/45 backdrop-blur-sm ring-1 ring-white/10 shadow-lg shadow-black/20 pointer-events-none" />
                      <span className="relative z-10 block text-center text-foreground px-3 py-2 text-sm">
                        {bot.description}
                      </span>
                    </span>
                  </div>

                  {/* Avantages (liste sans l'intitulé) */}
                  <div className="relative max-w-md mx-auto">
                    <div className="absolute inset-0 rounded-2xl bg-black/45 backdrop-blur-sm ring-1 ring-white/10 shadow-lg shadow-black/20 pointer-events-none" />
                    <ul className="relative z-10 space-y-2 px-4 py-3">
                      {bot.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-2 h-2 rounded-full bg-accent mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA (uniform grey button across all cards, anchored at bottom of content) */}
                  <div className="flex justify-center mt-auto pt-2">
                    <Link to={`/bots/${bot.slug}`} className="block w-full">
                      <button className="relative bg-neutral-800 h-10 w-full max-w-xs border border-white/10 text-center px-3 py-2 text-gray-50 text-sm font-medium rounded-lg hover:bg-neutral-700 transition-colors duration-200">
                        {`Découvrir les bots ${bot.platform}`}
                      </button>
                    </Link>
                  </div>
                </CardContent>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-glow rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in">
          <GlowButton asChild className="group">
            <Link to="/bots#all">
              Voir tous les bots disponibles
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </GlowButton>
        </div>
      </div>
    </section>
  );
};

export default BotCatalog;
import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/glow-button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Mail, 
  Twitter, 
  Linkedin, 
  Github,
  Instagram,
  ArrowRight,
  MapPin,
  Phone,
  Clock
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Bots Instagram", href: "/bots#instagram" },
      { name: "Bots Twitter/X", href: "/bots#twitter" },
      { name: "Bots YouTube", href: "/bots#youtube" },
      { name: "Bots TikTok", href: "/bots#tiktok" },
      { name: "Bots LinkedIn", href: "/bots#linkedin" },
      { name: "Développement sur mesure", href: "/contact" },
      { name: "Documentation API", href: "/docs" }
    ],
    company: [
      { name: "À propos", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Carrières", href: "/careers" },
      { name: "Presse", href: "/press" },
      { name: "Partenaires", href: "/partners" },
      { name: "Contact", href: "/contact" }
    ],
    support: [
      { name: "FAQ", href: "/faq" },
      { name: "Centre d'aide", href: "/help" },
      { name: "Documentation", href: "/docs" },
      { name: "Discord", href: "/discord" },
      { name: "Status", href: "/status" },
      { name: "Tutoriels", href: "/tutorials" }
    ],
    legal: [
      { name: "Conditions d'utilisation", href: "/terms" },
      { name: "Politique de confidentialité", href: "/privacy" },
      { name: "Politique de remboursement", href: "/refund" },
      { name: "Conformité RGPD", href: "/gdpr" },
      { name: "Conformité plateformes", href: "/compliance" },
      { name: "Sécurité", href: "/security" }
    ]
  };

  return (
    <footer className="bg-gradient-to-t from-muted/20 to-background border-t border-border/20">
      {/* Newsletter Section */}
      <div className="border-b border-border/20">
        <div className="container max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                <Mail className="w-4 h-4 mr-2" />
                Newsletter
              </Badge>
              
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Restez à la pointe de{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    l'automatisation
                  </span>
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nouvelles fonctionnalités, guides techniques, études de cas. 
                  Recevez nos insights directement dans votre boîte mail.
                </p>
              </div>
            </div>

            <div className="space-y-4 animate-scale-in">
              <div className="flex gap-4">
                <Input 
                  placeholder="votre@email.com" 
                  className="bg-card/50 border-border/50 focus:border-primary/50"
                />
                <GlowButton asChild className="group">
                  <Link to="/docs">
                    S'abonner
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    <span className="noise-overlay" />
                  </Link>
                </GlowButton>
              </div>
              <p className="text-sm text-muted-foreground">
                Pas de spam. Désinscription en un clic. Données sécurisées.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          
          {/* Brand & Contact */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary p-2">
                <Bot className="w-full h-full text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">BOTAGRAM</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              La plateforme d'automatisation premium pour professionnels. 
              Bots prêts et développement sur mesure.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Paris, France & Remote</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-accent" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-accent" />
                <span>Lun-Ven 9h-18h CET</span>
              </div>
            </div>

            {/* Social Links */}
            {/* <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Links Sections */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h4 className="font-semibold text-foreground">Produits</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h4 className="font-semibold text-foreground">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h4 className="font-semibold text-foreground">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <div className="container max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© {currentYear} BOTAGRAM. Tous droits réservés.</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent">Tous systèmes opérationnels</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Développé avec ❤️ en France</span>
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                🔒 SOC 2 Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
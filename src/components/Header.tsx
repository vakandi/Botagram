import * as React from "react";
import { Link } from "react-router-dom";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, Instagram, Twitter, Youtube, Music2, BarChart3, MessageSquare } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useEffect } from "react";

// Cartes "Bots" pour le menu déroulant
const botsMenu: { title: string; to: string; description: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { title: "Instagram", to: "/bots/instagram", description: "Planification, DM, analytics avancées.", Icon: Instagram },
  { title: "Twitter (X)", to: "/bots/x-twitter", description: "Publication auto, mentions, threads.", Icon: Twitter },
  { title: "YouTube", to: "/bots/youtube", description: "Uploads, commentaires, rapports.", Icon: Youtube },
  { title: "TikTok", to: "/bots/tiktok", description: "Auto-post, tendances, file d'attente.", Icon: Music2 },
  { title: "LinkedIn", to: "/bots/linkedin", description: "Posting pro, leads B2B.", Icon: BarChart3 },
  { title: "Telegram", to: "/bots/telegram", description: "Gestion canal, bots, mass messaging.", Icon: MessageSquare },
];

// Liens rapides pour le menu principal
const quickLinks: { title: string; to: string; description: string }[] = [
  { title: "Armada de bots", to: "/bots#all", description: "Catalogue complet des bots prêts à l'emploi." },
  { title: "Tarifs", to: "/#pricing", description: "Plans clairs et transparents, mensuel ou annuel." },
  { title: "FAQ", to: "/faq", description: "Questions fréquentes sur nos services et la sécurité." },
  { title: "Documentation", to: "/docs", description: "Guides d'utilisation et intégrations." },
  { title: "Contact", to: "/contact", description: "Parlez à un expert, projet sur‑mesure." },
];

const components: { title: string; to: string; description: string }[] = [
  {
    title: "Alert Dialog",
    to: "#alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    to: "#hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    to: "#progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    to: "#scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    to: "#tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    to: "#tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function DiscordMark(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M20.317 4.369A19.791 19.791 0 0 0 16.558 3c-.2.36-.43.846-.589 1.23a18.27 18.27 0 0 0-3.938 0C11.872 3.846 11.64 3.36 11.44 3a19.736 19.736 0 0 0-3.76 1.37C4.226 6.315 3.37 9.1 3.64 11.845c1.58 1.185 3.11 1.908 4.6 2.38.37-.51.7-1.053.98-1.62-.54-.205-1.05-.457-1.54-.745.13-.096.26-.197.384-.3 2.966 1.39 6.177 1.39 9.113 0 .126.103.255.204.384.3-.49.288-1 .54-1.54.744.28.567.61 1.11.98 1.62 1.49-.472 3.02-1.195 4.6-2.38.38-3.802-.66-6.544-2.902-8.176ZM9.68 12.6c-.71 0-1.295-.66-1.295-1.474 0-.814.575-1.48 1.295-1.48s1.305.666 1.295 1.48c0 .814-.585 1.474-1.295 1.474Zm4.64 0c-.71 0-1.295-.66-1.295-1.474 0-.814.585-1.48 1.295-1.48s1.295.666 1.295 1.48c0 .814-.585 1.474-1.295 1.474Z"/>
    </svg>
  );
}

export function NavigationMenuDemo() {
  // Prefetch routes bundles on hover for faster TTI
  useEffect(() => {
    const prefetch = (path: string) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = path;
      document.head.appendChild(link);
    };
    // noop on mount; hover handled below via onMouseEnter props when needed
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w[460px] lg:w-[560px] lg:grid-cols-2">
              {quickLinks.map((item) => (
                <ListItem key={item.title} to={item.to} title={item.title}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Bots</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[520px] gap-3 md:w-[640px] md:grid-cols-2 lg:w-[720px]">
              {botsMenu.map(({ title, to, description, Icon }) => (
                <li key={title}>
                  <NavigationMenuLink asChild>
                    <Link to={to} className="flex gap-4 rounded-md border border-border/50 bg-card/80 p-4 hover:bg-accent/10 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight flex items-center justify-center text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground">{title}</div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/docs">Documentation</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/faq">FAQ</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/contact">Contactez‑nous</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/discord" className="flex items-center gap-2">
              <DiscordMark className="w-4 h-4" />
              Discord
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({ title, children, to, ...props }: React.ComponentPropsWithoutRef<"li"> & { to: string; title: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={to} className="block rounded-md p-2 hover:bg-accent/50 focus:outline-none">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-16 flex items-center justify-center">
          <NavigationMenuDemo />
        </div>
      </div>
    </header>
  );
};

export default Header;



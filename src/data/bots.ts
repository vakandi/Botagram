import {
  InstagramIcon,
  XIcon,
  YouTubeIcon,
  TikTokIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsAppIcon,
  DiscordIcon,
  SnapchatIcon,
  IndeedIcon,
  VintedIcon,
} from "@/components/icons/SocialIcons";

export type BotCategory =
  | "social"
  | "messaging"
  | "video"
  | "pro"
  | "marketplace";

export type BotItem = {
  id: string;
  name: string;
  slug: string;
  category: BotCategory;
  tags: string[];
  features: string[];
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  sceneUrl?: string;
  poster?: string;
  rating?: number;
  price: number;
};

export const botsCatalog: BotItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    slug: "instagram",
    category: "social",
    tags: ["social", "automation", "scheduling"],
    features: ["Planification", "DM workflows", "Insights & Analytics"],
    Icon: InstagramIcon,
    description:
      "Automatisez votre présence Instagram : planification, DM et analytics.",
    sceneUrl: "https://prod.spline.design/ekOkVWHGNpgmmW3d/scene.splinecode",
    price: 29.99,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    slug: "x-twitter",
    category: "social",
    tags: ["social", "publishing", "monitoring"],
    features: ["Publication auto", "Monitoring mentions", "Threads"],
    Icon: XIcon,
    description:
      "Gérez votre stratégie X avec publication, veille et alertes threads.",
    price: 19.99,
  },
  {
    id: "youtube",
    name: "YouTube",
    slug: "youtube",
    category: "video",
    tags: ["video", "content", "analytics"],
    features: ["Upload pipeline", "Triage commentaires", "Rapports"],
    Icon: YouTubeIcon,
    description:
      "Optimisez votre chaîne avec gestion d'uploads et analyses avancées.",
    price: 39.99,
  },
  {
    id: "tiktok",
    name: "TikTok",
    slug: "tiktok",
    category: "video",
    tags: ["social", "video", "trends"],
    features: ["Auto-post vidéos", "Trending insights", "File d'attente"],
    Icon: TikTokIcon,
    description: "Maximisez votre reach TikTok avec l'automatisation.",
    price: 24.99,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    slug: "linkedin",
    category: "pro",
    tags: ["b2b", "network", "leads"],
    features: ["Posting pro", "Croissance réseau", "Leads"],
    Icon: LinkedInIcon,
    description:
      "Développez votre réseau et générez des leads avec des workflows B2B.",
    price: 49.99,
  },
  {
    id: "telegram",
    name: "Telegram",
    slug: "telegram",
    category: "messaging",
    tags: ["messaging", "channels", "bots"],
    features: ["Gestion de canal", "Interactions bot", "Messages de masse"],
    Icon: TelegramIcon,
    description:
      "Gérez vos canaux Telegram avec des outils de communication avancés.",
    sceneUrl: "loading...",
    price: 14.99,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    slug: "whatsapp",
    category: "messaging",
    tags: ["messaging", "support", "sales"],
    features: ["Support 24/7", "Templates", "Broadcast"],
    Icon: WhatsAppIcon,
    description:
      "Support client et campagnes sur WhatsApp, avec templates et broadcast.",
    sceneUrl: "loading...",
    price: 34.99,
  },
  {
    id: "discord",
    name: "Discord",
    slug: "discord",
    category: "messaging",
    tags: ["community", "moderation", "automation"],
    features: ["Modération", "Roles & permissions", "Events"],
    Icon: DiscordIcon,
    description:
      "Animez votre communauté avec des bots Discord robustes et modulaires.",
    price: 9.99,
  },
  {
    id: "snapchat",
    name: "Snapchat",
    slug: "snapchat",
    category: "social",
    tags: ["social", "stories"],
    features: ["Stories", "Lens", "Engagement"],
    Icon: SnapchatIcon,
    description: "Boostez votre présence Snap via contenus et routines.",
    price: 17.99,
  },
  {
    id: "indeed",
    name: "Indeed",
    slug: "indeed",
    category: "pro",
    tags: ["recruiting", "automation"],
    features: ["Sourcing", "Screening", "Messages"],
    Icon: IndeedIcon,
    description: "Automatisez votre recrutement avec Indeed (sourcing, screening).",
    price: 44.99,
  },
  {
    id: "vinted",
    name: "Vinted",
    slug: "vinted",
    category: "marketplace",
    tags: ["marketplace", "catalog"],
    features: ["Gestion catalogue", "Repricing", "Relist"],
    Icon: VintedIcon,
    description: "Gérez votre boutique Vinted : pricing, relist et analytics.",
    price: 59.99,
  },
];



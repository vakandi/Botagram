import React, { Fragment, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Instagram, Sparkles, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type BotsInstagramProps = {
  id?: string;
  className?: string;
  overrides?: {
    title?: string;
    subtitle?: string;
    ctas?: { autoDm?: string; smartPosts?: string; autoReplies?: string };
    links?: {
      demoAutoDM?: string;
      demoSmartPosts?: string;
      demoAutoReplies?: string;
      docsAutoDM?: string;
      docsSmartPosts?: string;
      docsAutoReplies?: string;
    };
  };
  onAction?: (
    id: "auto_dm" | "smart_posts_stories" | "auto_replies",
    action: "demo" | "docs"
  ) => void;
};

type CardId = "auto_dm" | "smart_posts_stories" | "auto_replies";

const SECTION_ARIA_LABEL = "Section des bots Instagram";

const baseConfig = {
  header: {
    title: "Bots Instagram – Section",
    subtitle:
      "Découvrez nos solutions automatisées pour optimiser votre expérience Instagram.",
  },
  links: {
    demoAutoDM: "#demo-auto-dm",
    demoSmartPosts: "#demo-smart-posts",
    demoAutoReplies: "#demo-auto-replies",
    docsAutoDM: "#docs-auto-dm",
    docsSmartPosts: "#docs-smart-posts",
    docsAutoReplies: "#docs-auto-replies",
  },
} as const;

const cardConfigs: Array<{
  id: CardId;
  ariaLabel: string;
  title: string;
  body: { paragraphs: string[]; bullets: string[] };
  icon: "instagram" | "spark" | "plus";
  // Visual accents (from GSON)
  overlay: {
    // linear gradient top -> bottom
    background: string;
  };
  glow: {
    // radial gradient glow color
    background: string;
  };
  ctaBgVar: string; // CSS var color for primary button bg
  ctaTextColor: string;
}> = [
  {
    id: "auto_dm",
    ariaLabel: "Carte bot Auto-DM",
    title: "Auto-DM",
    body: {
      paragraphs: [
        "Engage automatiquement les utilisateurs avec des messages directs performants.",
      ],
      bullets: ["Réactivité instantanée", "Augmentation du taux de conversion"],
    },
    icon: "instagram",
    overlay: {
      background:
        "radial-gradient(120% 80% at 50% 0%, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0.00) 60%), linear-gradient(180deg, rgba(34,211,238,0.20) 0%, rgba(34,211,238,0.08) 35%, rgba(34,211,238,0.03) 60%, rgba(255,0,230,0.00) 100%)",
    },
    glow: {
      background:
        "radial-gradient(60% 60% at 50% 0%, rgba(34,211,238,0.55) 0%, rgba(34,211,238,0.00) 100%)",
    },
    ctaBgVar: "var(--primary)",
    ctaTextColor: "#001317",
  },
  {
    id: "smart_posts_stories",
    ariaLabel: "Carte bot Intelligent de posts & stories",
    title: "Bot Intelligent de posts & stories",
    body: {
      paragraphs: [
        "Planifie et publie du contenu de manière intelligente, aux meilleurs moments.",
      ],
      bullets: ["Croissance d’audience"],
    },
    icon: "spark",
    overlay: {
      background:
        "radial-gradient(120% 80% at 50% 0%, rgba(255,0,230,0.22) 0%, rgba(255,0,230,0.00) 60%), linear-gradient(180deg, rgba(255,0,230,0.22) 0%, rgba(255,0,230,0.10) 35%, rgba(139,92,246,0.06) 70%, rgba(139,92,246,0.00) 100%)",
    },
    glow: {
      background:
        "radial-gradient(60% 60% at 50% 0%, rgba(255,0,230,0.45) 0%, rgba(255,0,230,0.00) 100%)",
    },
    ctaBgVar: "var(--secondary)",
    ctaTextColor: "#1A0019",
  },
  {
    id: "auto_replies",
    ariaLabel: "Carte bot Réponses automatiques",
    title: "Réponses automatiques",
    body: {
      paragraphs: [
        "Répond instantanément aux DM avec des réponses adaptées à chaque question.",
      ],
      bullets: ["Satisfaction client"],
    },
    icon: "plus",
    overlay: {
      background:
        "radial-gradient(120% 80% at 50% 0%, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.00) 60%), linear-gradient(180deg, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.10) 35%, rgba(34,211,238,0.06) 70%, rgba(34,211,238,0.00) 100%)",
    },
    glow: {
      background:
        "radial-gradient(60% 60% at 50% 0%, rgba(139,92,246,0.45) 0%, rgba(139,92,246,0.00) 100%)",
    },
    ctaBgVar: "var(--tertiary)",
    ctaTextColor: "#120A21",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32 },
  },
};

export function BotsInstagramSection({ id, className, overrides, onAction }: BotsInstagramProps) {
  const reduceMotion = useReducedMotion();

  const title = overrides?.title ?? baseConfig.header.title;
  const subtitle = overrides?.subtitle ?? baseConfig.header.subtitle;
  const links = { ...baseConfig.links, ...(overrides?.links ?? {}) };

  return (
    <section
      id={id ?? "bots-instagram"}
      className={cn(
        "m3 w-full py-24 px-6", // paddingY 96, paddingX 24
        "[content-visibility:auto] [contain-intrinsic-size:600px_1200px]",
        className
      )}
      role="region"
      aria-label={SECTION_ARIA_LABEL}
    >
      <div className="mx-auto max-w-container">
        {/* Header */}
        <header className="relative mb-10 max-w-[72ch]">
          <h2
            className="relative z-10 font-bold tracking-tight"
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--h1-size)",
              lineHeight: "var(--h1-line)",
              letterSpacing: "var(--h1-letter)",
              color: "var(--on-surface)",
            }}
            role="heading"
            aria-level={2}
          >
            {title}
            {/* Accent underline */}
            <span
              aria-hidden
              className="absolute left-0 -bottom-2 h-1 rounded-full"
              style={{
                width: "min(320px, 60%)",
                background:
                  "linear-gradient(90deg, #FF00E6 0%, #22D3EE 50%, #8B5CF6 100%)",
                opacity: 0.7,
              }}
            />
          </h2>
          {subtitle && (
            <p
              className="mt-4 text-[var(--on-surface-subtle)]"
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--subtitle-size)",
                lineHeight: "var(--subtitle-line)",
                fontWeight: 500,
                maxWidth: 720,
              }}
            >
              {subtitle}
            </p>
          )}
        </header>

        {/* Cards */}
        <AnimatePresence>
          <motion.ul
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-12 gap-6"
            aria-label="Liste de trois cartes présentant les bots Instagram."
          >
            {cardConfigs.map((cfg, idx) => (
              <motion.li
                key={cfg.id}
                variants={itemVariants}
                className="col-span-12 md:col-span-6 lg:col-span-4"
                data-testid={`card-${cfg.id}`}
              >
                <article
                  className={cn(
                    "relative rounded-xl overflow-hidden group transform-gpu will-change-transform motion-safe:animate-float",
                    "bg-[var(--card-bg)] ring-1 ring-[var(--card-stroke)] shadow-elev3",
                    "transition-[background,box-shadow,transform] duration-base ease-std",
                    "hover:bg-[var(--card-bg-hover)] hover:ring-[rgba(34,211,238,0.45)]",
                    "focus-within:outline-none focus-within:ring-2 focus-within:ring-[rgba(34,211,238,0.7)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--surface)]"
                  )}
                  style={{ animationDelay: `${idx * 360}ms`, animationDuration: "4.5s" }}
                  role="article"
                  aria-label={cfg.ariaLabel}
                >
                  {/* Inset overlay */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ background: cfg.overlay.background }}
                  />

                  {/* Outer glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-10 md:-inset-8 mix-blend-screen opacity-35 group-hover:opacity-85 transition-opacity"
                    style={{ filter: "blur(36px)", background: cfg.glow.background }}
                  />

                  <div className="relative p-6 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            cfg.id === "auto_dm"
                              ? "var(--primary-container)"
                              : cfg.id === "smart_posts_stories"
                              ? "var(--secondary-container)"
                              : "#4C2EA5",
                          color:
                            cfg.id === "auto_dm"
                              ? "var(--on-primary)"
                              : cfg.id === "smart_posts_stories"
                              ? "#FFE7FB"
                              : "#F0E7FF",
                        }}
                        aria-hidden
                      >
                        {cfg.icon === "instagram" && <Instagram className="w-[28px] h-[28px]" />}
                        {cfg.icon === "spark" && <Sparkles className="w-[28px] h-[28px]" />}
                        {cfg.icon === "plus" && <Plus className="w-[28px] h-[28px]" />}
                      </div>
                      <h3
                        className="flex-1 text-center text-[color:var(--on-surface)] font-bold tracking-tight"
                        style={{
                          fontFamily: "var(--font-family)",
                          fontSize: "var(--h2-size)",
                          lineHeight: "var(--h2-line)",
                          letterSpacing: "var(--h2-letter)",
                        }}
                      >
                        {cfg.title}
                      </h3>
                      {/* spacer to balance the left icon for perfect centering */}
                      <div aria-hidden className="w-10 h-10" />
                    </div>

                    {/* Body */}
                    <div className="text-[var(--on-surface-subtle)]" style={{ fontFamily: "var(--font-family)" }}>
                      {cfg.body.paragraphs.map((p, idx) => (
                        <p key={idx} className="text-[15px] leading-6">
                          {p}
                        </p>
                      ))}
                      {cfg.body.bullets.length > 0 && (
                        <ul className="mt-2 list-disc pl-5 space-y-1">
                          {cfg.body.bullets.map((b) => (
                            <li key={b} className="text-[15px] leading-6">
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Actions */}
                    {cfg.id === "smart_posts_stories" ? (
                      // Bouton centré pour "Bot Intelligent de posts & stories" (rouge-orange)
                      <div className="mt-4 flex justify-center">
                        <motion.a
                          href={links.demoSmartPosts}
                          onClick={() => onAction?.(cfg.id, "demo")}
                          className="relative inline-flex select-none items-center justify-center rounded-[100px] px-8 text-[18px] font-bold transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                          style={{
                            background: "linear-gradient(45deg, #FF7A6F 0%, #F8494C 100%)",
                            color: "#FFFFFF",
                            height: 52,
                            width: 200,
                            boxShadow: "0 12px 28px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.25) inset",
                          }}
                          whileTap={{ scale: 0.95 }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              onAction?.(cfg.id, "demo");
                            }
                          }}
                          role="button"
                          aria-label={`Voir le bot – ${cfg.title}`}
                        >
                          {/* Ombre/Glow sous le bouton */}
                          <div 
                            className="absolute inset-0 rounded-[100px] opacity-22"
                            style={{
                              background: "#F4717A",
                              filter: "blur(80px)",
                              transform: "translateY(10px)",
                            }}
                          />
                          
                          {/* Back-plate agrandie */}
                          <div 
                            className="absolute inset-0 rounded-[116px] opacity-20"
                            style={{
                              background: "linear-gradient(45deg, #FF7A6F 0%, #F8494C 100%)",
                              filter: "blur(8px)",
                              transform: "scale(1.1)",
                            }}
                          />
                          
                          {/* Color fade en bas */}
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-[140px] rounded-[90px] opacity-80"
                            style={{
                              background: "linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.9) 100%)",
                              filter: "blur(80px)",
                            }}
                          />
                          
                          {/* Texte avec ombre */}
                          <span 
                            className="relative z-10"
                            style={{
                              textShadow: "0 2px 6px rgba(0,0,0,0.25)",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Voir le bot
                          </span>
                        </motion.a>
                      </div>
                    ) : cfg.id === "auto_dm" ? (
                      // Bouton centré pour "Auto-DM" (cyan/bleu)
                      <div className="mt-4 flex justify-center">
                        <motion.a
                          href={links.demoAutoDM}
                          onClick={() => onAction?.(cfg.id, "demo")}
                          className="relative inline-flex select-none items-center justify-center rounded-[100px] px-8 text-[18px] font-bold transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                          style={{
                            background: "linear-gradient(45deg, #22D3EE 0%, #0891B2 100%)",
                            color: "#001317",
                            height: 52,
                            width: 200,
                            boxShadow: "0 12px 28px rgba(34,211,238,0.3), 0 0 0 1px rgba(255,255,255,0.25) inset",
                          }}
                          whileTap={{ scale: 0.95 }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              onAction?.(cfg.id, "demo");
                            }
                          }}
                          role="button"
                          aria-label={`Voir le bot – ${cfg.title}`}
                        >
                          {/* Ombre/Glow sous le bouton */}
                          <div 
                            className="absolute inset-0 rounded-[100px] opacity-22"
                            style={{
                              background: "#22D3EE",
                              filter: "blur(80px)",
                              transform: "translateY(10px)",
                            }}
                          />
                          
                          {/* Back-plate agrandie */}
                          <div 
                            className="absolute inset-0 rounded-[116px] opacity-20"
                            style={{
                              background: "linear-gradient(45deg, #22D3EE 0%, #0891B2 100%)",
                              filter: "blur(8px)",
                              transform: "scale(1.1)",
                            }}
                          />
                          
                          {/* Color fade en bas */}
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-[140px] rounded-[90px] opacity-80"
                            style={{
                              background: "linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.9) 100%)",
                              filter: "blur(80px)",
                            }}
                          />
                          
                          {/* Texte avec ombre */}
                          <span 
                            className="relative z-10"
                            style={{
                              textShadow: "0 2px 6px rgba(0,0,0,0.25)",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Voir le bot
                          </span>
                        </motion.a>
                      </div>
                    ) : cfg.id === "auto_replies" ? (
                      // Bouton centré pour "Réponses automatiques" (violet/purple)
                      <div className="mt-4 flex justify-center">
                        <motion.a
                          href={links.demoAutoReplies}
                          onClick={() => onAction?.(cfg.id, "demo")}
                          className="relative inline-flex select-none items-center justify-center rounded-[100px] px-8 text-[18px] font-bold transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                          style={{
                            background: "linear-gradient(45deg, #8B5CF6 0%, #7C3AED 100%)",
                            color: "#F0E7FF",
                            height: 52,
                            width: 200,
                            boxShadow: "0 12px 28px rgba(139,92,246,0.3), 0 0 0 1px rgba(255,255,255,0.25) inset",
                          }}
                          whileTap={{ scale: 0.95 }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              onAction?.(cfg.id, "demo");
                            }
                          }}
                          role="button"
                          aria-label={`Voir le bot – ${cfg.title}`}
                        >
                          {/* Ombre/Glow sous le bouton */}
                          <div 
                            className="absolute inset-0 rounded-[100px] opacity-22"
                            style={{
                              background: "#8B5CF6",
                              filter: "blur(80px)",
                              transform: "translateY(10px)",
                            }}
                          />
                          
                          {/* Back-plate agrandie */}
                          <div 
                            className="absolute inset-0 rounded-[116px] opacity-20"
                            style={{
                              background: "linear-gradient(45deg, #8B5CF6 0%, #7C3AED 100%)",
                              filter: "blur(8px)",
                              transform: "scale(1.1)",
                            }}
                          />
                          
                          {/* Color fade en bas */}
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-[140px] rounded-[90px] opacity-80"
                            style={{
                              background: "linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.9) 100%)",
                              filter: "blur(80px)",
                            }}
                          />
                          
                          {/* Texte avec ombre */}
                          <span 
                            className="relative z-10"
                            style={{
                              textShadow: "0 2px 6px rgba(0,0,0,0.25)",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Voir le bot
                          </span>
                        </motion.a>
                      </div>
                    ) : null}
                  </div>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <p
          className="mt-8 text-[color:var(--on-surface-subtle)]"
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--caption-size)",
            lineHeight: "var(--caption-line)",
          }}
        >
                                  Des bots Instagram a la pointe de la technologie
        </p>
      </div>
    </section>
  );
}

export default BotsInstagramSection;



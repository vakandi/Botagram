/* TypeScript configuration derived from the provided GSON */

export type Tokens = {
  color: {
    surface: string; surfaceVariant: string; onSurface: string; onSurfaceSubtle: string; divider: string;
    primary: string; primaryContainer: string; onPrimary: string;
    secondary: string; secondaryContainer: string; tertiary: string; onAccent: string;
    cardStroke: string; cardBg: string; cardBgHover: string;
  };
  radius: { sm: number; md: number; lg: number; xl: number; pill: number };
  shadow: { elev1: string; elev2: string; elev3: string };
  easing: { standard: string; emph: string };
  duration: { fast: number; base: number; slow: number };
};

export const tokens: Tokens = {
  color: {
    surface: "#0B0F14",
    surfaceVariant: "#0E131A",
    onSurface: "#E6F0FF",
    onSurfaceSubtle: "#C7D2E6",
    divider: "rgba(255,255,255,0.08)",
    primary: "#22D3EE",
    primaryContainer: "#0EA5B7",
    onPrimary: "#05161C",
    secondary: "#FF00E6",
    secondaryContainer: "#B100A4",
    tertiary: "#8B5CF6",
    onAccent: "#130B1A",
    cardStroke: "rgba(255,255,255,0.10)",
    cardBg: "rgba(255,255,255,0.05)",
    cardBgHover: "rgba(255,255,255,0.07)",
  },
  radius: { sm: 12, md: 16, lg: 20, xl: 24, pill: 1000 },
  shadow: {
    elev1: "0 1px 2px rgba(0,0,0,0.36), 0 1px 1px rgba(0,0,0,0.18)",
    elev2: "0 6px 16px rgba(0,0,0,0.40), 0 2px 6px rgba(0,0,0,0.24)",
    elev3: "0 16px 40px rgba(0,0,0,0.44), 0 6px 16px rgba(0,0,0,0.28)",
  },
  easing: { standard: "cubic-bezier(0.2, 0.8, 0.2, 1)", emph: "cubic-bezier(0.2, 0.0, 0, 1)" },
  duration: { fast: 150, base: 220, slow: 320 },
};

export type InteractionConfig = {
  cardHover: { scale: number; shadow: keyof Tokens['shadow']; bg: keyof Tokens['color']; durationMs: number; easing: keyof Tokens['easing'] };
  stagger: { enabled: boolean; delayMs: number; from: 'left' | 'right' };
  reveal: { translateY: number; opacityFrom: number; opacityTo: number; durationMs: number; easing: keyof Tokens['easing'] };
};

export const interactions: InteractionConfig = {
  cardHover: { scale: 1.02, shadow: 'elev3', bg: 'cardBgHover', durationMs: 220, easing: 'standard' },
  stagger: { enabled: true, delayMs: 60, from: 'left' },
  reveal: { translateY: 12, opacityFrom: 0, opacityTo: 1, durationMs: 320, easing: 'emph' },
};

export type LinkMap = {
  demoAutoDM: string; demoSmartPosts: string; demoAutoReplies: string;
  docsAutoDM: string; docsSmartPosts: string; docsAutoReplies: string;
};

export const defaultLinks: LinkMap = {
  demoAutoDM: '#demo-auto-dm',
  demoSmartPosts: '#demo-smart-posts',
  demoAutoReplies: '#demo-auto-replies',
  docsAutoDM: '#docs-auto-dm',
  docsSmartPosts: '#docs-smart-posts',
  docsAutoReplies: '#docs-auto-replies',
};



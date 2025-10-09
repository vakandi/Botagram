# Network Selector

Un composant React isolé pour la sélection de réseaux sociaux avec une barre de sélection fluide et stylée.

## Fonctionnalités

- ✅ Barre de sélection horizontale avec scroll
- ✅ Icônes officielles pour chaque réseau social
- ✅ Animations et transitions fluides
- ✅ Design responsive
- ✅ Support du mode sombre
- ✅ Accessibilité (ARIA labels)

## Réseaux supportés

- Instagram
- X (Twitter)
- YouTube
- TikTok
- LinkedIn
- Telegram
- WhatsApp
- Discord
- Snapchat
- Indeed
- Vinted

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Structure du projet

```
src/
├── components/
│   ├── ui/
│   │   ├── toggle.tsx
│   │   └── toggle-group.tsx
│   ├── icons/
│   │   └── SocialIcons.tsx
│   └── NetworkSelector.tsx
├── data/
│   └── bots.ts
├── lib/
│   └── utils.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Dépendances

- React 18
- TypeScript
- Tailwind CSS
- Radix UI (Toggle Group)
- Class Variance Authority
- clsx & tailwind-merge

## Utilisation

Le composant `NetworkSelector` peut être importé et utilisé dans n'importe quel projet React :

```tsx
import NetworkSelector from './components/NetworkSelector';

function App() {
  return <NetworkSelector />;
}
```

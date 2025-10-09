import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { botsCatalog } from "@/data/bots";
import Spline from "@splinetool/react-spline";
import splineScenes from "@/data/spline-scenes.json";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import {
	Rocket,
	ShieldCheck,
	Clock3,
	ServerCog,
	Bolt,
	BarChart3,
	MessageSquare,
	CreditCard,
	Workflow,
	Sparkles,
	Smartphone,
	Monitor,
	Users,
	Quote,
	ArrowRight,
	ChevronDown
} from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import BotsInstagramSection from "@/components/sections/BotsInstagramSection";

const advantageItems = [
	{ title: "Optimisation max", Icon: Rocket, desc: "Un seul bot, partout où vous en avez besoin." },
	{ title: "Gain de temps", Icon: Clock3, desc: "Automatisez les tâches répétitives au quotidien." },
	{ title: "Disponible 24/7", Icon: ServerCog, desc: "Répondez en continu, même hors horaires." },
	{ title: "Sécurisé & évolutif", Icon: ShieldCheck, desc: "Conçu pour la fiabilité et la montée en charge." },
];

// Fonction utilitaire pour limiter le texte à 30 caractères par ligne
const limitTextToLines = (text: string, maxCharsPerLine: number = 30): string => {
	const words = text.split(' ');
	const lines: string[] = [];
	let currentLine = '';

	for (const word of words) {
		const testLine = currentLine ? `${currentLine} ${word}` : word;
		
		if (testLine.length <= maxCharsPerLine) {
			currentLine = testLine;
		} else {
			if (currentLine) {
				lines.push(currentLine);
				currentLine = word;
			} else {
				// Si un seul mot dépasse la limite, on le garde quand même
				lines.push(word);
				currentLine = '';
			}
		}
	}
	
	if (currentLine) {
		lines.push(currentLine);
	}
	
	return lines.join('\n');
};

const defaultUseCases = [
	{ title: "Business & ventes", desc: limitTextToLines("Capture de prospects, relances et funnels."), scene: "https://prod.spline.design/fh9YYxywXzTsu6Cu/scene.splinecode" },
	{ title: "Trading & finance", desc: limitTextToLines("Alertes, signaux et automatisations."), scene: "https://prod.spline.design/4kzC5L82ahMrl12f/scene.splinecode" },
	{ title: "Service client", desc: limitTextToLines("Support instantané et self‑service."), scene: "https://prod.spline.design/7IfHMAFJmENIn3cx/scene.splinecode" },
	{ title: "Communauté & marketing", desc: limitTextToLines("Animation, modération et campagnes."), scene: "https://prod.spline.design/ZFgaEiIkr-pXS5ve/scene.splinecode" },
];

export default function BotDetail() {
	const { slug } = useParams();
	const bot = botsCatalog.find((b) => b.slug === slug);

	if (!bot) {
		return <Navigate to="/bots" replace />;
	}

	const title = `${bot.name} Bot — Automatisation intelligente`;
	const description = bot.description || `Automatisez ${bot.name} avec un assistant puissant et flexible.`;

	const Icon = bot.Icon as React.ComponentType<{ className?: string }>;
	const isInstagramPage = bot.slug === "instagram";
	// The Instagram dropdown shows predefined items instead of listing bots

	return (
		<main className="min-h-screen bg-background">
			<HelmetProvider>
				<Helmet>
					<title>{title}</title>
					<meta name="description" content={description} />
					<link rel="canonical" href={`/bots/${bot.slug}`} />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
				</Helmet>
			</HelmetProvider>
			<Header />
			<div className="pt-16">
				{/* Hero */}
				<section className="relative overflow-hidden isolate py-20 lg:py-28 px-6 min-h-[80vh] md:min-h-[90vh]">
					{/* Background Spline full-bleed */}
					<div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
						<div className="absolute inset-0">
							<Spline style={{ display: "block", width: "100%", height: "100%" }} scene={splineScenes.botDetailBackground} />
						</div>
						{/* subtle overlays to improve readability */}
						<div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/30" />
						{/* readability band on the right without hiding the 3D scene */}
						<div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 lg:w-[44%] bg-gradient-to-l from-background/80 via-background/40 to-transparent" />
					</div>

					<div className="relative z-10 container max-w-7xl mx-auto grid lg:grid-cols-[1fr_minmax(520px,600px)] gap-8 lg:gap-12 items-center">
						<div className="space-y-8 lg:col-start-2 lg:text-right lg:ml-auto lg:max-w-[560px]">
							<Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">{bot.category === "social" ? "Instagram" : bot.category}</Badge>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
								<span className="text-foreground">Votre assistant automatisé</span>
								<br className="hidden sm:block" />
								<span className="bg-gradient-primary bg-clip-text text-transparent">pour {bot.name}</span>
							</h1>
							<p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:ml-auto lg:max-w-none">
								Automatisez votre présence sur {bot.name} : planification, DM et analytics.
							</p>
							<div className="mt-2 flex flex-wrap gap-4 lg:justify-end">
								<div className="flex items-center gap-4">
									<div className="text-right">
										<div className="text-3xl font-bold text-primary">{bot.price.toFixed(2)}€</div>
									</div>
								</div>
								<GlowButton asChild className="group h-12 min-w-[240px] px-8">
									<Link to="/contact">
										Acheter {bot.name}
										<ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
										<span className="noise-overlay" />
									</Link>
								</GlowButton>
								{isInstagramPage ? (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<GlowButton subtle className="h-12 min-w-[240px] px-8">
												Voir la documentation
												<ChevronDown className="w-4 h-4 ml-2" />
											</GlowButton>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Instagram</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem asChild>
												<Link to="/docs#instagram-auto-dm">Auto-DM</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link to="/docs#instagram-posts-stories-bots">Bots intelligent de posts & stories</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link to="/docs#instagram-dm-auto-reponses">réponses automatiques en DM</Link>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								) : (
									<GlowButton asChild subtle className="h-12 min-w-[240px] px-8">
										<Link to="/docs">Voir la documentation</Link>
									</GlowButton>
								)}
							</div>
							<div className="mt-2 flex items-center gap-3 text-muted-foreground lg:justify-end">
								<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
									<Icon className="w-6 h-6" />
								</div>
								<span className="text-sm">Optimisé pour {bot.name}</span>
							</div>
						</div>
						{/* Spline en arrière-plan → suppression de la carte latérale */}
					</div>
				</section>

				{/* Pourquoi ce bot */}
				<section className="py-12 px-6">
					<div className="container max-w-7xl mx-auto">
						{/* Titre stylisé avec effet néon */}
						<div className="relative text-center mb-12">
							{/* Icône bot décorative */}
							<div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl border-4 border-cyan-400 bg-gradient-to-br from-white/35 to-white/10 flex items-center justify-center" style={{
								boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), inset 0 0 10px rgba(165, 243, 252, 0.7)'
							}}>
								<div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/35 to-white/10 border-2 border-cyan-100 flex items-center justify-center">
									<div className="flex gap-1">
										<div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{boxShadow: '0 0 6px rgba(34, 211, 238, 0.9)'}}></div>
										<div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{boxShadow: '0 0 6px rgba(34, 211, 238, 0.9)'}}></div>
									</div>
								</div>
							</div>
							
							{/* Titre principal */}
							<h2 className="text-4xl lg:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" style={{
								fontFamily: 'Poppins, Inter, system-ui',
								textShadow: '0 0 20px rgba(34, 211, 238, 0.55), 0 0 28px rgba(139, 92, 246, 0.45)',
								WebkitTextStroke: '2px rgba(191, 239, 255, 0.8)'
							}}>
								POURQUOI CE BOT ?
							</h2>
							
							{/* Soulignement décoratif */}
							<div className="mx-auto mt-4 w-96 h-3 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" style={{
								boxShadow: '0 0 14px rgba(34, 211, 238, 0.7), 0 0 22px rgba(139, 92, 246, 0.55)'
							}}></div>
							
							{/* Points de chargement décoratifs */}
							<div className="flex justify-center gap-6 mt-6">
								{[1, 2, 3].map((i) => (
									<div key={i} className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" style={{
										boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)',
										animationDelay: `${i * 130}ms`,
										animationDuration: '600ms'
									}}></div>
								))}
							</div>
							
							{/* Sparkle décoratif */}
							<div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-pink-300 to-purple-400 rotate-45 border border-white/65" style={{
								boxShadow: '0 0 12px rgba(240, 171, 252, 0.85)'
							}}></div>
						</div>
						<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{advantageItems.map(({ title, Icon, desc }) => (
								<Card key={title} className="bg-card/80 backdrop-blur border-border/50 hover:border-primary/30 transition-colors">
									<CardHeader className="flex flex-row items-center gap-3 pb-2">
										<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center">
											<Icon className="w-5 h-5" />
										</div>
										<CardTitle className="text-base">{title}</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription>{desc}</CardDescription>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Bots Instagram – Material 3 section (inserted below "Pourquoi ce bot ?") */}
				<BotsInstagramSection
					id="bots-instagram"
					overrides={{
						links: {
							demoAutoDM: '#demo-auto-dm',
							demoSmartPosts: '#demo-smart-posts',
							demoAutoReplies: '#demo-auto-replies',
							docsAutoDM: '#docs-auto-dm',
							docsSmartPosts: '#docs-smart-posts',
							docsAutoReplies: '#docs-auto-replies'
						}
					}}
					onAction={(id, action) => {
						console.log('track', id, action);
					}}
				/>



				{/* Cas d'utilisation */}
				<section className="py-12 px-6">
					<div className="container max-w-7xl mx-auto">
						{/* Titre stylisé avec effet néon - version sous-titre */}
						<div className="relative text-center mb-8">
							<h2 className="text-2xl lg:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" style={{
								fontFamily: 'Poppins, Inter, system-ui',
								textShadow: '0 0 15px rgba(34, 211, 238, 0.45), 0 0 20px rgba(139, 92, 246, 0.35)',
								WebkitTextStroke: '1.5px rgba(191, 239, 255, 0.7)'
							}}>
								CAS D'UTILISATION
							</h2>
							
							{/* Soulignement décoratif - plus petit */}
							<div className="mx-auto mt-3 w-48 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" style={{
								boxShadow: '0 0 10px rgba(34, 211, 238, 0.6), 0 0 16px rgba(139, 92, 246, 0.45)'
							}}></div>
						</div>
						<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{defaultUseCases.map(({ title, desc, scene }) => (
								<Card key={title} className="bg-card/80 backdrop-blur border-border/50">
									<CardHeader>
										<CardTitle className="text-base">{title}</CardTitle>
										<CardDescription className="whitespace-pre-line">{desc}</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="w-full h-32 rounded-lg overflow-hidden">
											<Spline scene={scene} style={{ width: "100%", height: "100%" }} />
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Expérience & Design */}
				<section className="py-12 px-6 bg-gradient-to-b from-muted/10 to-background">
					<div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
						<div className="space-y-4">
							<h2 className="text-2xl lg:text-3xl font-semibold">Expérience & Design</h2>
							<p className="text-muted-foreground">Interface intuitive, compatible mobile & desktop. Animations légères respectant prefers‑reduced‑motion.</p>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-accent" /> Expérience mobile optimisée</li>
								<li className="flex items-center gap-2"><Monitor className="w-4 h-4 text-accent" /> UI desktop claire et productive</li>
								<li className="flex items-center gap-2"><Users className="w-4 h-4 text-accent" /> Accessibilité et ARIA conformes</li>
							</ul>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="h-32 rounded-xl bg-gradient-to-br from-primary/15 to-highlight/15" />
							<div className="h-32 rounded-xl bg-gradient-to-br from-highlight/15 to-accent/15" />
							<div className="h-32 rounded-xl bg-gradient-to-br from-accent/15 to-primary/15" />
							<div className="h-32 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15" />
						</div>
					</div>
				</section>

				{/* CTA final */}
				<section className="py-16 px-6 bg-gradient-to-b from-background to-muted/10">
					<div className="container max-w-7xl mx-auto text-center space-y-6">
						<h2 className="text-3xl lg:text-4xl font-bold">Donnez vie à votre bot dès aujourd'hui</h2>
							<div className="flex items-center justify-center gap-6 mb-6">
								<div className="text-center">
									<div className="text-4xl font-bold text-primary">{bot.price.toFixed(2)}€</div>
								</div>
							</div>
						<div className="flex gap-3 justify-center">
							<Button asChild variant="premium" size="lg" className="group">
								<Link to="/contact">
									Acheter {bot.name}
									<ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
							<Button asChild variant="glass" size="lg">
								<Link to="/contact?intent=demo">Demander une démo personnalisée</Link>
							</Button>
						</div>
					</div>
				</section>

				<Footer />
			</div>
		</main>
	);
}
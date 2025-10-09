import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
// Button removed from controls in favor of segmented ToggleGroup
import { GlowButton } from "@/components/ui/glow-button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationFirst, PaginationLast } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState, useEffect, useRef } from "react";
import { botsCatalog } from "@/data/bots";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import { SplineCard } from "@/components/SplineCard";
import splineScenes from "@/data/spline-scenes.json";
import { Search, ArrowRight, X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", label: "Tous" },
  { id: "social", label: "Réseaux sociaux" },
  { id: "messaging", label: "Messaging" },
  { id: "video", label: "Vidéo" },
  { id: "pro", label: "Pro" },
  { id: "marketplace", label: "Marketplace" },
] as const;

const PAGE_SIZE = 9;

const BotsPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]["id"]>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return botsCatalog.filter((b) => {
      const catOk = category === "all" ? true : b.category === category;
      if (!q) return catOk;
      const inName = b.name.toLowerCase().includes(q);
      const inTags = b.tags.some((t) => t.toLowerCase().includes(q));
      const inFeatures = b.features.some((f) => f.toLowerCase().includes(q));
      return catOk && (inName || inTags || inFeatures);
    });
  }, [query, category]);

  const { pageItems, totalPages, currentPage, goToPage, nextPage, prevPage, windowPages } = usePaginatedList({ items: filtered, pageSize: PAGE_SIZE, persistInQuery: true });
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const vantaRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let vantaEffect: any | undefined;
    let isCancelled = false;

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });

    const init = async () => {
      try {
        if (!(window as any).p5) {
          await loadScript("https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js");
        }
        if (!(window as any).VANTA || !(window as any).VANTA.TOPOLOGY) {
          await loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js");
        }
        if (isCancelled) return;
        if (vantaRef.current && (window as any).VANTA && (window as any).VANTA.TOPOLOGY) {
          vantaEffect = (window as any).VANTA.TOPOLOGY({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x50707,
            backgroundColor: 0xf1d2a,
          });
        }
      } catch (e) {
        console.error("Failed to initialize Vanta", e);
      }
    };

    init();

    return () => {
      isCancelled = true;
      if (vantaEffect && typeof vantaEffect.destroy === "function") {
        vantaEffect.destroy();
      }
    };
  }, []);

  const go = (p: number) => {
    if (p === currentPage) return;
    setIsLoadingPage(true);
    requestAnimationFrame(() => {
      goToPage(p);
      setTimeout(() => setIsLoadingPage(false), 150);
    });
  };

  // Reset pagination on search or category change for best UX
  useEffect(() => {
    if (currentPage !== 1) {
      go(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category]);

  return (
    <main className="min-h-screen bg-background">
      <HelmetProvider>
        <Helmet>
          <title>Bots | BOTAGRAM</title>
          <meta name="description" content="Découvrez, filtrez et déployez nos bots prêts à l'emploi. Pagination, recherche et intégrations 3D." />
          <link rel="canonical" href="/bots" />
          <meta property="og:title" content="Bots | BOTAGRAM" />
          <meta property="og:description" content="Catalogue de bots avec recherche, filtres et pagination." />
        </Helmet>
      </HelmetProvider>
      <Header />
      <div className="pt-16">
        {/* Hero */}
        <section id="vanta-hero" ref={vantaRef} className="py-16 px-6 relative">
          <div className="container max-w-7xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">Armada</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Tous nos bots</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez, filtrez et déployez en quelques minutes. Pagination accessible et rapide.
            </p>
          </div>
        </section>

        {/* Controls */}
        <section className="py-8 px-6" aria-labelledby="filters">
          <div className="container max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 id="filters" className="sr-only">Filtres et recherche</h2>

            {/* Search form */}
            <form role="search" className="relative w-full md:max-w-xl" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="search-bots" className="sr-only">Rechercher un bot</label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" aria-hidden="true" />
              <Input
                id="search-bots"
                aria-label="Rechercher un bot"
                aria-controls="bots-grid"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Escape" && query) { setQuery(""); } }}
                placeholder="Rechercher (nom, tag, fonctionnalité)"
                className="pl-10 pr-10 bg-card/50 border-border/50 focus:border-primary/50 transition-colors"
                autoComplete="off"
                inputMode="search"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Effacer la recherche"
                  title="Effacer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Categories: segmented control with scroll and masks */}
            <div className="relative w-full md:flex-1">
              <div
                className="overflow-x-auto scroll-smooth"
                style={{ WebkitMaskImage: "linear-gradient(90deg, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)" }}
              >
                <ToggleGroup
                  type="single"
                  value={category}
                  onValueChange={(v) => v && setCategory(v as (typeof categories)[number]["id"])}
                  aria-label="Catégories"
                  className="flex items-center gap-2 min-w-max px-1"
                >
                  {categories.map((c) => (
                    <ToggleGroupItem
                      key={c.id}
                      value={c.id}
                      aria-label={c.label}
                      className="snap-start whitespace-nowrap data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      {c.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              {/* Edge gradients for a premium feel; pointer-events disabled */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-background to-transparent" />
            </div>

            {/* Results count */}
            <div id="results-count" aria-live="polite" className="text-sm text-muted-foreground whitespace-nowrap md:ml-2">
              {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
            </div>
          </div>
        </section>


        {/* All bots paginated */}
        <section id="all" className="py-10 px-6" aria-busy={isLoadingPage}>
          <div className="container max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingPage && Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <Skeleton key={`s-${i}`} className="h-64 rounded-xl" />
              ))}
              {!isLoadingPage && pageItems.map((b) => (
                <Card key={b.id} className={`bg-card/80 backdrop-blur border-border/50 hover:border-primary/30 transition-all ${(b.id === 'instagram' || b.id === 'twitter' || b.id === 'youtube' || b.id === 'tiktok' || b.id === 'linkedin' || b.id === 'telegram' || b.id === 'whatsapp' || b.id === 'discord' || b.id === 'snapchat' || b.id === 'vinted' || b.id === 'indeed') ? 'relative overflow-hidden' : ''}`}>
                  {b.id === 'instagram' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/ChatGPT Image 14 sept. 2025, 22_03_59.png')"
                      }}
                    />
                  )}
                  {b.id === 'twitter' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/ChatGPT Image 14 sept. 2025, 22_25_50.png')"
                      }}
                    />
                  )}
                  {b.id === 'youtube' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/Logo YouTube sur fond fumé.png')"
                      }}
                    />
                  )}
                  {b.id === 'tiktok' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/ChatGPT Image 14 sept. 2025, 22_39_49.png')"
                      }}
                    />
                  )}
                  {b.id === 'linkedin' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/ChatGPT Image 14 sept. 2025, 22_53_39.png')"
                      }}
                    />
                  )}
                  {b.id === 'telegram' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/ChatGPT Image 14 sept. 2025, 22_53_43.png')"
                      }}
                    />
                  )}
                  {b.id === 'whatsapp' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/ChatGPT Image 14 sept. 2025, 22_53_45.png')"
                      }}
                    />
                  )}
                  {b.id === 'discord' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/ChatGPT Image 14 sept. 2025, 22_53_50.png')"
                      }}
                    />
                  )}
                  {b.id === 'snapchat' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/ChatGPT Image 14 sept. 2025, 23_00_19.png')"
                      }}
                    />
                  )}
                  {b.id === 'vinted' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/ChatGPT Image 14 sept. 2025, 23_02_14.png')"
                      }}
                    />
                  )}
                  {b.id === 'indeed' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                      style={{
                        backgroundImage: "url('/ChatGPT Image 14 sept. 2025, 23_04_02.png')"
                      }}
                    />
                  )}
                   <CardHeader className="relative z-10">
                     <div className="flex items-center justify-between">
                       <div>
                         <CardTitle>{b.name}</CardTitle>
                         <CardDescription className="capitalize">{b.category}</CardDescription>
                       </div>
                       <div className="text-right">
                         <div className="text-2xl font-bold text-primary">{b.price.toFixed(2)}€</div>
                         <div className="text-xs text-muted-foreground">par mois</div>
                       </div>
                     </div>
                   </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {b.features.slice(0, 3).map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                     <div className="flex justify-center">
                       <GlowButton asChild className="group text-sm px-4 py-2">
                         <Link to={`/bots/${b.slug}`}>
                           Acheter {b.name}
                           <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                         </Link>
                       </GlowButton>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8" aria-live="polite">
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationFirst href={`?page=1#all`} onClick={(e) => { e.preventDefault(); go(1); }} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationPrevious href={`?page=${Math.max(1, currentPage - 1)}#all`} onClick={(e) => { e.preventDefault(); go(Math.max(1, currentPage - 1)); }} />
                  </PaginationItem>
                  {windowPages[0] && windowPages[0] > 1 && (
                    <>
                      <PaginationItem>
                        <PaginationLink href={`?page=1#all`} onClick={(e) => { e.preventDefault(); go(1); }}>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    </>
                  )}
                  {windowPages.map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink href={`?page=${p}#all`} isActive={p === currentPage} onClick={(e) => { e.preventDefault(); go(p); }}>{p}</PaginationLink>
                    </PaginationItem>
                  ))}
                  {windowPages[windowPages.length - 1] && windowPages[windowPages.length - 1] < totalPages && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href={`?page=${totalPages}#all`} onClick={(e) => { e.preventDefault(); go(totalPages); }}>{totalPages}</PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  <PaginationItem>
                    <PaginationNext href={`?page=${Math.min(totalPages, currentPage + 1)}#all`} onClick={(e) => { e.preventDefault(); go(Math.min(totalPages, currentPage + 1)); }} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLast href={`?page=${totalPages}#all`} onClick={(e) => { e.preventDefault(); go(totalPages); }} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {/* Load More (mobile) */}
            <div className="mt-6 sm:hidden">
              {currentPage < totalPages && (
                <GlowButton className="w-full" onClick={() => nextPage()}>Charger plus</GlowButton>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default BotsPage;



import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useMemo, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationFirst, PaginationLast } from "@/components/ui/pagination";
import { Helmet, HelmetProvider } from "react-helmet-async";

const faq = {
  header: {
    eyebrow: "Questions Fréquentes",
    title: "Tout ce qu’il faut savoir",
    tabs: [
      { id: "general", label: "Général" },
      { id: "paiements", label: "Paiements" },
      { id: "retours", label: "Retours" },
      { id: "remboursements", label: "Remboursements" },
    ],
  },
  sections: {
    general: [
      {
        q: "Comment démarrer avec BOTAGRAM ?",
        a: "Créez un compte, choisissez un bot dans l’armada puis suivez l’assistant de connexion à la plateforme (Instagram, X, YouTube, etc.).",
      },
      {
        q: "Est‑ce compatible avec plusieurs comptes ?",
        a: "Oui, les plans Pro et Enterprise permettent de lier plusieurs comptes par plateforme et de gérer les permissions par membre.",
      },
      {
        q: "Mes données sont‑elles sécurisées ?",
        a: "Nous chiffrons les secrets et respectons les politiques des plateformes. Accès par rôles, audit et journaux disponibles.",
      },
    ],
    paiements: [
      { q: "Quels moyens de paiement acceptez‑vous ?", a: "Cartes bancaires, PayPal et virement SEPA. Facturation mensuelle ou annuelle." },
    ],
    retours: [
      { q: "Puis‑je annuler à tout moment ?", a: "Oui, l’abonnement est sans engagement. La période en cours reste active jusqu’à son terme." },
    ],
    remboursements: [
      { q: "Proposez‑vous des remboursements ?", a: "Sous 5 à 10 jours ouvrés pour les cas éligibles (voir conditions)." },
    ],
  },
};

const FAQPage = () => {
  const [tab, setTab] = useState<string>("general");
  const [page, setPage] = useState<number>(1);

  // sync URL (?tab=&page=)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") || "general";
    const p = Number(params.get("page") || 1);
    setTab(t);
    setPage(!Number.isNaN(p) && p >= 1 ? p : 1);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    params.set("page", String(page));
    const url = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState({}, "", url);
  }, [tab, page]);

  const itemsPerPage = 6;
  const sections = faq.sections as Record<string, { q: string; a: string }[]>;
  const currentList = sections[tab] ?? sections.general;
  const totalPages = Math.max(1, Math.ceil(currentList.length / itemsPerPage));
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const pageSlice = useMemo(() => {
    const start = (clampedPage - 1) * itemsPerPage;
    return currentList.slice(start, start + itemsPerPage);
  }, [currentList, clampedPage]);

  const windowPages = useMemo(() => {
    const windowSize = 5;
    const half = Math.floor(windowSize / 2);
    let start = Math.max(1, clampedPage - half);
    let end = Math.min(totalPages, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [clampedPage, totalPages]);

  const goto = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <main className="min-h-screen bg-background">
      <HelmetProvider>
        <Helmet>
          <title>FAQ | BOTAGRAM</title>
          <meta name="description" content="Questions fréquentes sur nos bots et nos services d'automatisation." />
          <link rel="canonical" href="/faq" />
        </Helmet>
      </HelmetProvider>
      <section className="pt-24 pb-24 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-10">
            <p className="text-sm text-muted-foreground tracking-widest uppercase">{faq.header.eyebrow}</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground">{faq.header.title}</h1>
          </div>

          <Tabs value={tab} onValueChange={(v) => { setTab(v); setPage(1); }} className="w-full">
            <TabsList className="grid grid-cols-4 max-w-xl mx-auto mb-8">
              {faq.header.tabs.map((t) => (
                <TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="general">
              <Accordion type="single" collapsible className="divide-y divide-border/20 bg-card/60 rounded-2xl border border-border/40">
                {pageSlice.map((it, idx) => (
                  <AccordionItem key={idx} value={`g-${idx}`}>
                    <AccordionTrigger>{it.q}</AccordionTrigger>
                    <AccordionContent>{it.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="mt-6" aria-live="polite">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationFirst href={`?tab=${tab}&page=1`} onClick={(e) => { e.preventDefault(); goto(1); }} />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationPrevious href={`?tab=${tab}&page=${Math.max(1, clampedPage - 1)}`} onClick={(e) => { e.preventDefault(); goto(clampedPage - 1); }} />
                    </PaginationItem>
                    {windowPages[0] && windowPages[0] > 1 && (
                      <>
                        <PaginationItem>
                          <PaginationLink href={`?tab=${tab}&page=1`} onClick={(e) => { e.preventDefault(); goto(1); }}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      </>
                    )}
                    {windowPages.map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink href={`?tab=${tab}&page=${p}`} isActive={p === clampedPage} onClick={(e) => { e.preventDefault(); goto(p); }}>{p}</PaginationLink>
                      </PaginationItem>
                    ))}
                    {windowPages[windowPages.length - 1] && windowPages[windowPages.length - 1] < totalPages && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href={`?tab=${tab}&page=${totalPages}`} onClick={(e) => { e.preventDefault(); goto(totalPages); }}>{totalPages}</PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    <PaginationItem>
                      <PaginationNext href={`?tab=${tab}&page=${Math.min(totalPages, clampedPage + 1)}`} onClick={(e) => { e.preventDefault(); goto(clampedPage + 1); }} />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLast href={`?tab=${tab}&page=${totalPages}`} onClick={(e) => { e.preventDefault(); goto(totalPages); }} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>
            <TabsContent value="paiements">
              <Accordion type="single" collapsible className="divide-y divide-border/20 bg-card/60 rounded-2xl border border-border/40">
                {(tab === "paiements" ? pageSlice : faq.sections.paiements).map((it, idx) => (
                  <AccordionItem key={idx} value={`p-${idx}`}>
                    <AccordionTrigger>{it.q}</AccordionTrigger>
                    <AccordionContent>{it.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            <TabsContent value="retours">
              <Accordion type="single" collapsible className="divide-y divide-border/20 bg-card/60 rounded-2xl border border-border/40">
                {(tab === "retours" ? pageSlice : faq.sections.retours).map((it, idx) => (
                  <AccordionItem key={idx} value={`r-${idx}`}>
                    <AccordionTrigger>{it.q}</AccordionTrigger>
                    <AccordionContent>{it.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            <TabsContent value="remboursements">
              <Accordion type="single" collapsible className="divide-y divide-border/20 bg-card/60 rounded-2xl border border-border/40">
                {(tab === "remboursements" ? pageSlice : faq.sections.remboursements).map((it, idx) => (
                  <AccordionItem key={idx} value={`rf-${idx}`}>
                    <AccordionTrigger>{it.q}</AccordionTrigger>
                    <AccordionContent>{it.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;



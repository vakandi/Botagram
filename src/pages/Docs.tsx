import { Helmet, HelmetProvider } from "react-helmet-async";

const Docs = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <HelmetProvider>
        <Helmet>
          <title>Documentation | BOTAGRAM</title>
          <meta name="description" content="Guides d'utilisation, API et intégrations pour nos bots." />
          <link rel="canonical" href="/docs" />
        </Helmet>
      </HelmetProvider>
      <section className="pt-24 pb-16 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <p className="text-sm text-muted-foreground tracking-widest uppercase">Documentation</p>
            <h1 className="text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Guides & Intégrations</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Démarrez rapidement avec nos bots, API et intégrations. Tout ce qu’il faut pour réussir vos automatisations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <article className="rounded-2xl border border-border/50 bg-card/80 p-6">
              <h2 className="text-xl font-semibold mb-2">Prise en main</h2>
              <p className="text-sm text-muted-foreground mb-4">Installation, configuration et bonnes pratiques.</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Connexion aux plateformes</li>
                <li>Permissions et sécurité</li>
                <li>Déploiement</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-border/50 bg-card/80 p-6">
              <h2 className="text-xl font-semibold mb-2">API & Webhooks</h2>
              <p className="text-sm text-muted-foreground mb-4">Intégrez vos systèmes avec notre API.</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Authentification</li>
                <li>Endpoints essentiels</li>
                <li>Exemples</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Docs;



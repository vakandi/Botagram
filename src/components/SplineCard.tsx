import { useEffect, useRef, useState, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import LoadingSpline from "./LoadingSpline";

const LazySpline = (props: any) => {
  const [Comp, setComp] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    import("@splinetool/react-spline").then((m) => {
      if (mounted) setComp(() => m.default);
    });
    return () => {
      mounted = false;
    };
  }, []);
  if (!Comp) return null;
  return <Comp {...props} />;
};

type SplineCardProps = {
  sceneUrl: string;
  title?: string;
  subtitle?: string;
  cta?: React.ReactNode;
  poster?: string;
  density?: "comfortable" | "compact";
  className?: string;
};

export function SplineCard({ sceneUrl, title, subtitle, cta, poster, density = "comfortable", className }: SplineCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setShouldReduce(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setVisible(e.isIntersecting));
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Card role="group" aria-labelledby={title ? `${sceneUrl}-title` : undefined} className={cn("overflow-hidden bg-card/80 backdrop-blur border-border/50", className)}>
      <CardContent className={cn("p-0", density === "compact" ? "" : "")}>        
        <div ref={containerRef} className="relative">
          {/* aspect ratio wrapper */}
          <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
            {shouldReduce || !visible ? (
              poster ? (
                <img src={poster} alt="Preview" className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full bg-muted" />
              )
            ) : (
              <Suspense fallback={poster ? <img src={poster} alt="Preview" className="w-full h-full object-cover" loading="lazy" /> : <div className="w-full h-full bg-muted" />}> 
                {sceneUrl === "loading..." ? (
                  <LoadingSpline />
                ) : (
                  <LazySpline scene={sceneUrl} className="w-full h-full" />
                )}
              </Suspense>
            )}
          </div>

          {/* overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/30 to-transparent" />
        </div>

        {(title || subtitle || cta) && (
          <div className="p-4 flex items-center justify-between gap-4">
            <div>
              {title && (
                <h3 id={`${sceneUrl}-title`} className="text-base font-semibold text-foreground">
                  {title}
                </h3>
              )}
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {cta}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SplineCard;



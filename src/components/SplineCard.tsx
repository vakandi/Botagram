import { useEffect, useRef, useState, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import LoadingSpline from "./LoadingSpline";
import { useSplineOptimized } from "@/hooks/useSplineOptimized";
import { detectDeviceCapabilities, getOptimalQuality } from "@/constants/splineConfig";

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
  const deviceCapabilities = detectDeviceCapabilities();
  const optimalQuality = getOptimalQuality(deviceCapabilities);
  
  // Generate unique scene ID from URL
  const sceneId = sceneUrl.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
  
  // Use optimized Spline hook
  const {
    isLoaded,
    isLoading,
    shouldRender,
    fallbackVisible,
    containerRef,
    shouldUseFallback,
  } = useSplineOptimized({
    sceneId,
    sceneUrl,
    priority: 'medium',
    quality: optimalQuality,
    fallbackImage: poster,
    preload: false,
  });

  return (
    <Card role="group" aria-labelledby={title ? `${sceneUrl}-title` : undefined} className={cn("overflow-hidden bg-card/80 backdrop-blur border-border/50", className)}>
      <CardContent className={cn("p-0", density === "compact" ? "" : "")}>        
        <div 
          ref={containerRef} 
          className="relative"
          style={{
            contain: 'layout style paint',
            contentVisibility: 'auto',
          }}
        >
          {/* aspect ratio wrapper */}
          <div 
            className="w-full relative overflow-hidden" 
            style={{ 
              aspectRatio: "16 / 9",
              transform: 'translateZ(0)', // GPU acceleration
            }}
          >
            {shouldUseFallback ? (
              // Fallback image or placeholder
              poster ? (
                <img 
                  src={poster} 
                  alt="Preview" 
                  className="w-full h-full object-cover transition-opacity duration-300" 
                  loading="lazy"
                  style={{ willChange: 'opacity' }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-highlight/10 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )
            ) : shouldRender ? (
              // Render Spline scene
              <Suspense fallback={
                poster ? (
                  <img 
                    src={poster} 
                    alt="Loading..." 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-highlight/10 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                )
              }> 
                {sceneUrl === "loading..." ? (
                  <LoadingSpline />
                ) : (
                  <LazySpline 
                    scene={sceneUrl} 
                    className="w-full h-full" 
                    style={{
                      willChange: 'opacity, transform',
                    }}
                  />
                )}
              </Suspense>
            ) : (
              // Loading state
              poster ? (
                <img 
                  src={poster} 
                  alt="Loading..." 
                  className="w-full h-full object-cover opacity-75" 
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-highlight/10 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )
            )}
            
            {/* Loading indicator overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/90 rounded-lg p-3 flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span className="text-sm text-gray-700">Loading...</span>
                </div>
              </div>
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



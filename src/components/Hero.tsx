import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/glow-button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bot, Zap, Globe } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { useSplineOptimized } from "@/hooks/useSplineOptimized";
import { useEffect, useRef, useState, useCallback } from "react";
import { detectDeviceCapabilities, getOptimalQuality } from "@/constants/splineConfig";
import { shouldReduceMotion } from "@/utils/performanceMonitor";

const Hero = () => {
  // Device capabilities and performance detection
  const deviceCapabilities = detectDeviceCapabilities();
  const optimalQuality = getOptimalQuality(deviceCapabilities);
  const prefersReducedMotion = shouldReduceMotion();
  
  // Spline optimization hook
  const {
    isLoaded: isSplineLoaded,
    shouldRender: shouldRenderSpline,
    fallbackVisible: showLoadingImage,
    containerRef,
    loadScene,
  } = useSplineOptimized({
    sceneId: 'hero',
    sceneUrl: 'https://prod.spline.design/kxmX2KuGcoMRRFmp/scene.splinecode',
    priority: 'critical',
    quality: optimalQuality,
    fallbackImage: '/upscalemedia-transformed.jpeg',
    preload: true,
    onLoad: () => {
      // Delay hiding the loading image to allow smooth transition
      setTimeout(() => {
        setShowLoadingImage(false);
      }, 500);
    },
  });
  
  // Cursor → head follow (only the head, not the whole scene)
  const splineRef = useRef<any>(null);
  const headRef = useRef<any>(null);
  const targetYaw = useRef(0);   // left/right (y axis)
  const targetPitch = useRef(0); // up/down (x axis)
  const rafRef = useRef<number | null>(null);
  const lastMouseMoveTime = useRef(0);

  const onLoad = (spline: any) => {
    splineRef.current = spline;
    const candidates = ["Head", "head", "Robot_Head", "Tête", "Helmet", "head_geo", "Head_Rig", "Head.001"];
    for (const name of candidates) {
      const obj = spline.findObjectByName?.(name);
      if (obj) { headRef.current = obj; break; }
    }
    // Mark Spline as loaded
    setIsSplineLoaded(true);
    
    // Delay hiding the loading image to allow smooth transition
    setTimeout(() => {
      setShowLoadingImage(false);
    }, 500); // 0.5 second delay
  };

  // Throttled mouse move handler for better performance
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Skip if reduced motion is preferred or low-end device
    if (prefersReducedMotion || deviceCapabilities.memory < 4) return;
    
    // Throttle to max 60fps
    const now = performance.now();
    if (now - lastMouseMoveTime.current < 16.67) return; // ~60fps
    lastMouseMoveTime.current = now;

    const el = containerRef.current;
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;  // -1 .. 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 .. 1
    
    // Adjust sensitivity based on device capabilities
    const sensitivity = deviceCapabilities.memory < 6 ? 0.5 : 1;
    const maxYaw = 0.22 * sensitivity;   // ~12.5° (légèrement réduit)
    const maxPitch = 0.14 * sensitivity; // ~8°  (légèrement réduit)
    
    targetYaw.current = nx * maxYaw;
    targetPitch.current = -ny * maxPitch;
  }, [prefersReducedMotion, deviceCapabilities.memory]);

  const onMouseLeave = () => {
    targetYaw.current = 0;
    targetPitch.current = 0;
  };

  // Optimized animation loop with requestIdleCallback
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tick = () => {
      const head = headRef.current;
      if (head && !prefersReducedMotion) {
        // Lerp towards target for smooth tracking
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        head.rotation ??= { x: 0, y: 0, z: 0 };
        
        // Adjust lerp speed based on device performance
        const lerpSpeed = deviceCapabilities.memory < 6 ? 0.12 : 0.18;
        head.rotation.y = lerp(head.rotation.y || 0, targetYaw.current, lerpSpeed);
        head.rotation.x = lerp(head.rotation.x || 0, targetPitch.current, lerpSpeed);
      }
      
      // Use requestIdleCallback for better performance on low-end devices
      if (deviceCapabilities.memory < 6) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => {
            rafRef.current = requestAnimationFrame(tick);
          });
        } else {
          rafRef.current = requestAnimationFrame(tick);
        }
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    
    rafRef.current = requestAnimationFrame(tick);
    return () => { 
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, deviceCapabilities.memory]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Loading image - shown while Spline loads */}
      {showLoadingImage && (
        <div 
          className="absolute z-0"
          style={{
            top: '10px',
            left: 0,
            right: 0,
            bottom: 0,
            opacity: showLoadingImage ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
          }}
        >
          <img
            src="/upscalemedia-transformed.jpeg"
            alt="Loading scene"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              objectPosition: 'center',
              transform: 'scale(1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/30 to-highlight/10" />
        </div>
      )}

      {/* Background gradient overlay (does not capture pointer) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-highlight/10 opacity-50 pointer-events-none" />
      
      {/* Secondary 3D model overlay (capture mouse, but prevent Spline from handling pointer) */}
      <div 
        ref={containerRef} 
        onMouseMove={onMouseMove} 
        onMouseLeave={onMouseLeave} 
        className="absolute inset-0 z-0 will-change-transform" 
        style={{
          contain: 'layout style paint',
          transform: 'translateZ(0)', // GPU acceleration
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0">
          {shouldRenderSpline ? (
            <Spline
              onLoad={onLoad}
              style={{ 
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%", 
                height: "100%", 
                pointerEvents: "none",
                opacity: isSplineLoaded ? 1 : 0,
                transition: "opacity 2s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: "scale(1)",
                willChange: "opacity, transform",
              }}
              scene="https://prod.spline.design/kxmX2KuGcoMRRFmp/scene.splinecode"
            />
          ) : null}
        </div>
      </div>
      
      <div className="container relative z-10 px-6 py-32">
        <div className="grid grid-cols-1 gap-12 items-center max-w-7xl mx-auto" style={{ transform: 'translateX(-10%)' }}>
          
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Automatisation Premium
            </Badge>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-8xl font-black tracking-[-0.01em] leading-none">
                <span className="text-foreground block">Votre assistant</span>
                <span className="text-foreground block">automatisé</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#FF00E6] to-[#B400FF]">sur vos réseaux</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Un bot puissant, intégré à vos réseaux favoris. Planification, DM et analytics — optimisé pour Instagram.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <GlowButton asChild className="group">
                <Link to="/bots#all">
                  Découvrir l'armada
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  <span className="noise-overlay" />
                </Link>
              </GlowButton>
              <GlowButton asChild className="group">
                <Link to="/contact">
                  <Bot className="w-5 h-5 mr-2" />
                  Parler à un expert
                </Link>
              </GlowButton>
            </div>
          </div>

          
        </div>
      </div>

      {/* Social proof KPIs - Centered on the entire section */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/20">
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-accent">500+</div>
            <div className="text-sm text-muted-foreground">Bots déployés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-highlight">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime garanti</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary">200+</div>
            <div className="text-sm text-muted-foreground">Clients satisfaits</div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section color (#0A141E) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A141E] to-transparent" />
    </section>
  );
};

export default Hero;
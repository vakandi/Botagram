// Performance monitoring utility for Spline 3D scenes
import { QUALITY_PRESETS, QualityPreset, SPLINE_CONFIG } from '@/constants/splineConfig';

export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  droppedFrames: number;
  lastCheck: number;
}

export interface PerformanceMonitorOptions {
  onPerformanceChange?: (metrics: PerformanceMetrics) => void;
  onQualityAdjust?: (newQuality: QualityPreset) => void;
  checkInterval?: number;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 60,
    frameTime: 16.67,
    memoryUsage: 0,
    droppedFrames: 0,
    lastCheck: Date.now(),
  };

  private options: PerformanceMonitorOptions;
  private rafId: number | null = null;
  private lastFrameTime = 0;
  private frameCount = 0;
  private droppedFrames = 0;
  private intervalId: NodeJS.Timeout | null = null;
  private currentQuality: QualityPreset = 'medium';

  constructor(options: PerformanceMonitorOptions = {}) {
    this.options = {
      checkInterval: SPLINE_CONFIG.performanceCheckInterval,
      ...options,
    };
    this.start();
  }

  private start() {
    this.rafId = requestAnimationFrame(this.tick.bind(this));
    this.intervalId = setInterval(this.checkPerformance.bind(this), this.options.checkInterval);
  }

  private tick(currentTime: number) {
    if (this.lastFrameTime === 0) {
      this.lastFrameTime = currentTime;
    }

    const deltaTime = currentTime - this.lastFrameTime;
    
    // Detect dropped frames (frame time > 33ms indicates < 30fps)
    if (deltaTime > 33.33) {
      this.droppedFrames++;
    }

    this.frameCount++;
    this.lastFrameTime = currentTime;
    
    this.rafId = requestAnimationFrame(this.tick.bind(this));
  }

  private checkPerformance() {
    const now = Date.now();
    const timeDiff = now - this.metrics.lastCheck;
    
    // Calculate FPS
    const fps = this.frameCount / (timeDiff / 1000);
    const frameTime = timeDiff / this.frameCount;
    
    // Get memory usage (if available)
    const memoryInfo = (performance as any).memory;
    const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize : 0;

    this.metrics = {
      fps: Math.round(fps * 10) / 10,
      frameTime: Math.round(frameTime * 100) / 100,
      memoryUsage,
      droppedFrames: this.droppedFrames,
      lastCheck: now,
    };

    // Reset counters
    this.frameCount = 0;
    this.droppedFrames = 0;

    // Check if quality adjustment is needed
    this.checkQualityAdjustment();

    // Notify listeners (production-safe)
    if (this.options.onPerformanceChange) {
      try {
        this.options.onPerformanceChange(this.metrics);
      } catch (error) {
        // Silent fail in production
      }
    }
  }

  private checkQualityAdjustment() {
    const { fps, memoryUsage } = this.metrics;
    const memoryThreshold = SPLINE_CONFIG.memoryThreshold;
    const fpsThreshold = SPLINE_CONFIG.fpsThreshold;

    let newQuality: QualityPreset | null = null;

    // Lower quality if performance is poor
    if (fps < fpsThreshold || memoryUsage > memoryThreshold) {
      if (this.currentQuality === 'high') {
        newQuality = 'medium';
      } else if (this.currentQuality === 'medium') {
        newQuality = 'low';
      }
    }
    // Increase quality if performance is good
    else if (fps > 55 && memoryUsage < memoryThreshold / 2) {
      if (this.currentQuality === 'low') {
        newQuality = 'medium';
      } else if (this.currentQuality === 'medium') {
        newQuality = 'high';
      }
    }

    if (newQuality && newQuality !== this.currentQuality) {
      this.currentQuality = newQuality;
      if (this.options.onQualityAdjust) {
        try {
          this.options.onQualityAdjust(newQuality);
        } catch (error) {
          // Silent fail in production
        }
      }
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  getCurrentQuality(): QualityPreset {
    return this.currentQuality;
  }

  setQuality(quality: QualityPreset) {
    this.currentQuality = quality;
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Singleton instance
let globalMonitor: PerformanceMonitor | null = null;

export const createPerformanceMonitor = (options?: PerformanceMonitorOptions) => {
  if (globalMonitor) {
    globalMonitor.destroy();
  }
  
  globalMonitor = new PerformanceMonitor(options);
  return globalMonitor;
};

export const getPerformanceMonitor = () => globalMonitor;

export const destroyPerformanceMonitor = () => {
  if (globalMonitor) {
    globalMonitor.destroy();
    globalMonitor = null;
  }
};

// Utility functions
export const getDevicePerformance = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    
    if (!gl) return 'poor';
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    
    // Simple heuristic based on renderer info
    if (renderer.toLowerCase().includes('intel') || renderer.toLowerCase().includes('integrated')) {
      return 'low';
    }
    
    if (renderer.toLowerCase().includes('nvidia') || renderer.toLowerCase().includes('amd') || renderer.toLowerCase().includes('radeon')) {
      return 'high';
    }
    
    return 'medium';
  } catch (error) {
    return 'poor';
  }
};

export const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getOptimalSceneSettings = (quality: QualityPreset) => {
  const preset = QUALITY_PRESETS[quality];
  
  return {
    ...preset,
    // Additional scene-specific settings
    maxLights: quality === 'low' ? 2 : quality === 'medium' ? 4 : 8,
    shadowMapSize: quality === 'low' ? 512 : quality === 'medium' ? 1024 : 2048,
    postProcessQuality: quality === 'low' ? 0.5 : quality === 'medium' ? 0.75 : 1,
  };
};


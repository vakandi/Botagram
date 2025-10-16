// Global Spline scene manager for optimal loading and memory management
import { SplineSceneConfig, SPLINE_CONFIG, QUALITY_PRESETS, QualityPreset } from '@/constants/splineConfig';
import { PerformanceMonitor, PerformanceMetrics } from './performanceMonitor';

interface SceneInstance {
  id: string;
  config: SplineSceneConfig;
  element: HTMLElement | null;
  loaded: boolean;
  loading: boolean;
  lastUsed: number;
  priority: number;
  quality: QualityPreset;
}

interface LoadingQueueItem {
  sceneId: string;
  priority: number;
  timestamp: number;
}

class SplineManager {
  private scenes = new Map<string, SceneInstance>();
  private loadingQueue: LoadingQueueItem[] = [];
  private activeScenes = new Set<string>();
  private maxConcurrent = SPLINE_CONFIG.maxConcurrentScenes;
  private performanceMonitor: PerformanceMonitor | null = null;
  private unloadTimeouts = new Map<string, NodeJS.Timeout>();

  constructor() {
    this.initializePerformanceMonitoring();
  }

  private initializePerformanceMonitoring() {
    this.performanceMonitor = new PerformanceMonitor({
      onPerformanceChange: (metrics: PerformanceMetrics) => {
        this.handlePerformanceChange(metrics);
      },
      onQualityAdjust: (quality: QualityPreset) => {
        this.adjustAllScenesQuality(quality);
      },
    });
  }

  private handlePerformanceChange(metrics: PerformanceMetrics) {
    // If performance is poor, reduce concurrent scenes
    if (metrics.fps < 30 || metrics.memoryUsage > SPLINE_CONFIG.memoryThreshold) {
      this.maxConcurrent = Math.max(1, this.maxConcurrent - 1);
      this.unloadLowPriorityScenes();
    } else if (metrics.fps > 50 && this.maxConcurrent < SPLINE_CONFIG.maxConcurrentScenes) {
      // Gradually increase back to normal
      this.maxConcurrent = Math.min(SPLINE_CONFIG.maxConcurrentScenes, this.maxConcurrent + 1);
    }
  }

  private adjustAllScenesQuality(quality: QualityPreset) {
    this.scenes.forEach((scene) => {
      scene.quality = quality;
      // Notify components about quality change
      this.notifySceneUpdate(scene.id, 'quality', quality);
    });
  }

  private notifySceneUpdate(sceneId: string, type: string, data: any) {
    // Dispatch custom event for components to listen (production-safe)
    try {
      window.dispatchEvent(new CustomEvent('spline-scene-update', {
        detail: { sceneId, type, data }
      }));
    } catch (error) {
      // Silent fail in production
    }
  }

  registerScene(sceneId: string, config: SplineSceneConfig, element: HTMLElement | null = null) {
    const priority = this.getPriority(config.priority);
    
    this.scenes.set(sceneId, {
      id: sceneId,
      config,
      element,
      loaded: false,
      loading: false,
      lastUsed: Date.now(),
      priority,
      quality: config.quality,
    });

    // Add to loading queue if needed
    if (config.preload || priority <= 2) {
      this.addToLoadingQueue(sceneId, priority);
    }
  }

  private getPriority(priority: string): number {
    switch (priority) {
      case 'critical': return 1;
      case 'high': return 2;
      case 'medium': return 3;
      case 'low': return 4;
      default: return 3;
    }
  }

  private addToLoadingQueue(sceneId: string, priority: number) {
    // Remove if already in queue
    this.loadingQueue = this.loadingQueue.filter(item => item.sceneId !== sceneId);
    
    // Add with priority
    const queueItem: LoadingQueueItem = {
      sceneId,
      priority,
      timestamp: Date.now(),
    };

    // Insert in priority order
    const insertIndex = this.loadingQueue.findIndex(item => item.priority > priority);
    if (insertIndex === -1) {
      this.loadingQueue.push(queueItem);
    } else {
      this.loadingQueue.splice(insertIndex, 0, queueItem);
    }

    this.processLoadingQueue();
  }

  private processLoadingQueue() {
    // Don't load more than max concurrent
    const currentlyLoading = Array.from(this.scenes.values()).filter(s => s.loading).length;
    if (currentlyLoading >= this.maxConcurrent) {
      return;
    }

    // Load next item in queue
    const nextItem = this.loadingQueue.shift();
    if (nextItem) {
      this.loadScene(nextItem.sceneId);
    }
  }

  private async loadScene(sceneId: string) {
    const scene = this.scenes.get(sceneId);
    if (!scene || scene.loading || scene.loaded) {
      return;
    }

    scene.loading = true;
    scene.lastUsed = Date.now();
    this.activeScenes.add(sceneId);

    try {
      // Simulate loading with timeout
      await this.loadSceneWithTimeout(sceneId, SPLINE_CONFIG.loadingTimeout);
      
      scene.loaded = true;
      scene.loading = false;
      this.notifySceneUpdate(sceneId, 'loaded', true);
      
    } catch (error) {
      // Silent error handling in production
      scene.loading = false;
      this.notifySceneUpdate(sceneId, 'error', error);
    }

    // Process next item in queue
    this.processLoadingQueue();
  }

  private loadSceneWithTimeout(sceneId: string, timeout: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Scene ${sceneId} loading timeout`));
      }, timeout);

      // For now, simulate successful loading
      // In real implementation, this would integrate with Spline loader
      setTimeout(() => {
        clearTimeout(timer);
        resolve();
      }, 1000 + Math.random() * 2000); // Random delay to simulate loading
    });
  }

  requestScene(sceneId: string, element?: HTMLElement) {
    const scene = this.scenes.get(sceneId);
    if (!scene) {
      return;
    }

    scene.lastUsed = Date.now();
    
    if (element) {
      scene.element = element;
    }

    // Update priority based on visibility
    if (this.isElementInViewport(scene.element)) {
      this.addToLoadingQueue(sceneId, Math.max(1, scene.priority - 1));
    }

    // Clear unload timeout if exists
    const timeout = this.unloadTimeouts.get(sceneId);
    if (timeout) {
      clearTimeout(timeout);
      this.unloadTimeouts.delete(sceneId);
    }
  }

  private isElementInViewport(element: HTMLElement | null): boolean {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    return (
      rect.top < windowHeight &&
      rect.bottom > 0 &&
      rect.left < windowWidth &&
      rect.right > 0
    );
  }

  unloadScene(sceneId: string, immediate = false) {
    const scene = this.scenes.get(sceneId);
    if (!scene) return;

    if (immediate) {
      this.doUnloadScene(sceneId);
    } else {
      // Delay unload to allow for quick re-access
      const timeout = setTimeout(() => {
        this.doUnloadScene(sceneId);
        this.unloadTimeouts.delete(sceneId);
      }, SPLINE_CONFIG.unloadDelay);
      
      this.unloadTimeouts.set(sceneId, timeout);
    }
  }

  private doUnloadScene(sceneId: string) {
    const scene = this.scenes.get(sceneId);
    if (!scene) return;

    scene.loaded = false;
    scene.loading = false;
    this.activeScenes.delete(sceneId);
    
    this.notifySceneUpdate(sceneId, 'unloaded', true);
  }

  private unloadLowPriorityScenes() {
    const scenes = Array.from(this.scenes.values())
      .filter(s => s.loaded && s.priority > 2)
      .sort((a, b) => a.lastUsed - b.lastUsed);

    // Unload oldest low-priority scenes first
    const toUnload = scenes.slice(0, Math.max(1, scenes.length - this.maxConcurrent + 1));
    toUnload.forEach(scene => this.unloadScene(scene.id, true));
  }

  getSceneStatus(sceneId: string) {
    const scene = this.scenes.get(sceneId);
    if (!scene) return null;

    return {
      loaded: scene.loaded,
      loading: scene.loading,
      quality: scene.quality,
      priority: scene.priority,
      lastUsed: scene.lastUsed,
    };
  }

  getAllScenes() {
    return Array.from(this.scenes.values()).map(scene => ({
      id: scene.id,
      config: scene.config,
      loaded: scene.loaded,
      loading: scene.loading,
      quality: scene.quality,
      priority: scene.priority,
      lastUsed: scene.lastUsed,
    }));
  }

  getPerformanceMetrics() {
    return this.performanceMonitor?.getMetrics() || null;
  }

  destroy() {
    // Clear all timeouts
    this.unloadTimeouts.forEach(timeout => clearTimeout(timeout));
    this.unloadTimeouts.clear();
    
    // Unload all scenes
    this.scenes.forEach((_, sceneId) => this.doUnloadScene(sceneId));
    this.scenes.clear();
    this.loadingQueue = [];
    this.activeScenes.clear();
    
    // Destroy performance monitor
    this.performanceMonitor?.destroy();
  }
}

// Singleton instance
let globalManager: SplineManager | null = null;

export const getSplineManager = (): SplineManager => {
  if (!globalManager) {
    globalManager = new SplineManager();
  }
  return globalManager;
};

export const destroySplineManager = () => {
  if (globalManager) {
    globalManager.destroy();
    globalManager = null;
  }
};

export type { SceneInstance, LoadingQueueItem };

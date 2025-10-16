// Custom hook for optimized Spline 3D scene loading and management
import { useEffect, useRef, useState, useCallback } from 'react';
import { getSplineManager } from '@/utils/splineManager';
import { detectDeviceCapabilities, getOptimalQuality, QualityPreset } from '@/constants/splineConfig';
import { shouldReduceMotion } from '@/utils/performanceMonitor';

interface UseSplineOptimizedOptions {
  sceneId: string;
  sceneUrl: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  quality?: QualityPreset;
  fallbackImage?: string;
  preload?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

interface SplineState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  shouldRender: boolean;
  quality: QualityPreset;
  fallbackVisible: boolean;
}

export const useSplineOptimized = (options: UseSplineOptimizedOptions) => {
  const {
    sceneId,
    sceneUrl,
    priority = 'medium',
    quality,
    fallbackImage,
    preload = false,
    onLoad,
    onError,
  } = options;

  const [state, setState] = useState<SplineState>({
    isLoading: false,
    isLoaded: false,
    hasError: false,
    shouldRender: false,
    quality: quality || getOptimalQuality(detectDeviceCapabilities()),
    fallbackVisible: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const managerRef = useRef(getSplineManager());
  const mountedRef = useRef(true);

  // Register scene with manager
  useEffect(() => {
    const manager = managerRef.current;
    
    manager.registerScene(sceneId, {
      url: sceneUrl,
      priority,
      preload,
      quality: state.quality,
      fallbackImage,
    }, containerRef.current);

    return () => {
      manager.unloadScene(sceneId, true);
    };
  }, [sceneId, sceneUrl, priority, preload, state.quality, fallbackImage]);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Scene is visible, request loading
            managerRef.current.requestScene(sceneId, container);
            setState(prev => ({ ...prev, shouldRender: true }));
          } else {
            // Scene is not visible, delay unload
            managerRef.current.unloadScene(sceneId, false);
            setState(prev => ({ ...prev, shouldRender: false }));
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0.1,
      }
    );

    observer.observe(container);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [sceneId]);

  // Listen for scene updates from manager
  useEffect(() => {
    const handleSceneUpdate = (event: CustomEvent) => {
      try {
        const { sceneId: updatedSceneId, type, data } = event.detail;
        
        if (updatedSceneId !== sceneId || !mountedRef.current) return;

        switch (type) {
          case 'loaded':
            setState(prev => ({
              ...prev,
              isLoaded: true,
              isLoading: false,
              fallbackVisible: false,
            }));
            if (onLoad) onLoad();
            break;
            
          case 'error':
            setState(prev => ({
              ...prev,
              hasError: true,
              isLoading: false,
              fallbackVisible: true,
            }));
            if (onError) onError(data);
            break;
            
          case 'quality':
            setState(prev => ({ ...prev, quality: data }));
            break;
            
          case 'unloaded':
            setState(prev => ({
              ...prev,
              isLoaded: false,
              isLoading: false,
              fallbackVisible: true,
            }));
            break;
        }
      } catch (error) {
        // Silent error handling in production
      }
    };

    window.addEventListener('spline-scene-update', handleSceneUpdate as EventListener);
    
    return () => {
      window.removeEventListener('spline-scene-update', handleSceneUpdate as EventListener);
    };
  }, [sceneId, onLoad, onError]);

  // Handle reduced motion preference
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      const handleChange = () => {
        if (!mountedRef.current) return;
        
        if (shouldReduceMotion()) {
          setState(prev => ({
            ...prev,
            shouldRender: false,
            fallbackVisible: true,
          }));
        }
      };

      handleChange(); // Check initial state
      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } catch (error) {
      // Silent fail in production
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Manual loading trigger
  const loadScene = useCallback(() => {
    if (containerRef.current) {
      managerRef.current.requestScene(sceneId, containerRef.current);
      setState(prev => ({ ...prev, shouldRender: true, isLoading: true }));
    }
  }, [sceneId]);

  // Force unload
  const unloadScene = useCallback(() => {
    managerRef.current.unloadScene(sceneId, true);
    setState(prev => ({
      ...prev,
      isLoaded: false,
      isLoading: false,
      shouldRender: false,
      fallbackVisible: true,
    }));
  }, [sceneId]);

  // Get scene status
  const getStatus = useCallback(() => {
    return managerRef.current.getSceneStatus(sceneId);
  }, [sceneId]);

  return {
    // State
    isLoading: state.isLoading,
    isLoaded: state.isLoaded,
    hasError: state.hasError,
    shouldRender: state.shouldRender && !shouldReduceMotion(),
    quality: state.quality,
    fallbackVisible: state.fallbackVisible || shouldReduceMotion(),
    
    // Refs
    containerRef,
    
    // Actions
    loadScene,
    unloadScene,
    getStatus,
    
    // Utilities
    shouldUseFallback: shouldReduceMotion() || state.hasError || state.fallbackVisible,
  };
};

// Hook for managing multiple scenes (useful for pages with multiple Spline components)
export const useSplineOptimizedMulti = (scenes: UseSplineOptimizedOptions[]) => {
  const [sceneStates, setSceneStates] = useState<Record<string, SplineState>>({});
  const managerRef = useRef(getSplineManager());

  useEffect(() => {
    // Initialize states for all scenes
    const initialStates: Record<string, SplineState> = {};
    const capabilities = detectDeviceCapabilities();
    
    scenes.forEach(({ sceneId, quality }) => {
      initialStates[sceneId] = {
        isLoading: false,
        isLoaded: false,
        hasError: false,
        shouldRender: false,
        quality: quality || getOptimalQuality(capabilities),
        fallbackVisible: true,
      };
    });
    
    setSceneStates(initialStates);

    // Register all scenes
    scenes.forEach(({ sceneId, sceneUrl, priority = 'medium', preload = false, fallbackImage }) => {
      managerRef.current.registerScene(sceneId, {
        url: sceneUrl,
        priority,
        preload,
        quality: initialStates[sceneId].quality,
        fallbackImage,
      });
    });

    return () => {
      scenes.forEach(({ sceneId }) => {
        managerRef.current.unloadScene(sceneId, true);
      });
    };
  }, []);

  const getSceneState = useCallback((sceneId: string) => {
    return sceneStates[sceneId] || {
      isLoading: false,
      isLoaded: false,
      hasError: false,
      shouldRender: false,
      quality: 'medium' as QualityPreset,
      fallbackVisible: true,
    };
  }, [sceneStates]);

  const loadAllScenes = useCallback(() => {
    scenes.forEach(({ sceneId }) => {
      managerRef.current.requestScene(sceneId);
    });
  }, [scenes]);

  const unloadAllScenes = useCallback(() => {
    scenes.forEach(({ sceneId }) => {
      managerRef.current.unloadScene(sceneId, true);
    });
  }, [scenes]);

  return {
    getSceneState,
    loadAllScenes,
    unloadAllScenes,
    manager: managerRef.current,
  };
};

export type { UseSplineOptimizedOptions, SplineState };

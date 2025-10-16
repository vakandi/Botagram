// Spline 3D Quality Presets and Configuration
export type QualityPreset = 'low' | 'medium' | 'high';

export interface SplineQualitySettings {
  maxPolygons: number;
  textureResolution: number;
  shadows: boolean;
  reflections: boolean;
  particles: boolean;
  postProcessing: boolean;
  antialiasing: boolean;
}

export const QUALITY_PRESETS: Record<QualityPreset, SplineQualitySettings> = {
  low: {
    maxPolygons: 5000,
    textureResolution: 512,
    shadows: false,
    reflections: false,
    particles: false,
    postProcessing: false,
    antialiasing: false,
  },
  medium: {
    maxPolygons: 15000,
    textureResolution: 1024,
    shadows: true,
    reflections: false,
    particles: true,
    postProcessing: true,
    antialiasing: true,
  },
  high: {
    maxPolygons: 50000,
    textureResolution: 2048,
    shadows: true,
    reflections: true,
    particles: true,
    postProcessing: true,
    antialiasing: true,
  },
};

export interface SplineSceneConfig {
  url: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  preload: boolean;
  quality: QualityPreset;
  fallbackImage?: string;
}

export const SPLINE_SCENES: Record<string, SplineSceneConfig> = {
  hero: {
    url: 'https://prod.spline.design/kxmX2KuGcoMRRFmp/scene.splinecode',
    priority: 'critical',
    preload: true,
    quality: 'high',
    fallbackImage: '/upscalemedia-transformed.jpeg',
  },
  botDetailBackground: {
    url: 'https://prod.spline.design/ekOkVWHGNpgmmW3d/scene.splinecode',
    priority: 'high',
    preload: true,
    quality: 'medium',
  },
  contact: {
    url: 'https://prod.spline.design/G7OcUWgZJZZUfMEn/scene.splinecode',
    priority: 'low',
    preload: false,
    quality: 'medium',
  },
  business: {
    url: 'https://prod.spline.design/fh9YYxywXzTsu6Cu/scene.splinecode',
    priority: 'medium',
    preload: false,
    quality: 'low',
  },
  trading: {
    url: 'https://prod.spline.design/4kzC5L82ahMrl12f/scene.splinecode',
    priority: 'medium',
    preload: false,
    quality: 'low',
  },
  support: {
    url: 'https://prod.spline.design/7IfHMAFJmENIn3cx/scene.splinecode',
    priority: 'medium',
    preload: false,
    quality: 'low',
  },
  marketing: {
    url: 'https://prod.spline.design/ZFgaEiIkr-pXS5ve/scene.splinecode',
    priority: 'medium',
    preload: false,
    quality: 'low',
  },
};

export const SPLINE_CONFIG = {
  maxConcurrentScenes: 3,
  loadingTimeout: 10000, // 10 seconds
  unloadDelay: 5000, // 5 seconds after leaving viewport
  performanceCheckInterval: 1000, // 1 second
  memoryThreshold: 100 * 1024 * 1024, // 100MB
  fpsThreshold: 30,
} as const;

export const BROWSER_CAPABILITIES = {
  webgl: false,
  webgl2: false,
  memory: 0,
  cores: 0,
  connection: 'unknown' as 'slow' | 'fast' | 'unknown',
} as const;

// Device detection utilities
export const detectDeviceCapabilities = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const gl2 = canvas.getContext('webgl2');
    
    const memory = (navigator as any).deviceMemory || 0;
    const cores = navigator.hardwareConcurrency || 1;
    
    // Simple connection detection
    const connection = (navigator as any).connection;
    let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
    
    if (connection) {
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        connectionSpeed = 'slow';
      } else if (connection.effectiveType === '3g' || connection.effectiveType === '4g') {
        connectionSpeed = 'fast';
      }
    }
    
    return {
      webgl: !!gl,
      webgl2: !!gl2,
      memory,
      cores,
      connection: connectionSpeed,
    };
  } catch (error) {
    // Fallback for unsupported browsers
    return {
      webgl: false,
      webgl2: false,
      memory: 0,
      cores: 1,
      connection: 'unknown' as const,
    };
  }
};

export const getOptimalQuality = (capabilities: typeof BROWSER_CAPABILITIES): QualityPreset => {
  // No WebGL support
  if (!capabilities.webgl) return 'low';
  
  // Low-end devices
  if (capabilities.memory < 4 || capabilities.cores < 4 || capabilities.connection === 'slow') {
    return 'low';
  }
  
  // High-end devices
  if (capabilities.memory >= 8 && capabilities.cores >= 8 && capabilities.connection === 'fast') {
    return 'high';
  }
  
  // Default to medium
  return 'medium';
};

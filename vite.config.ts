import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/" : "/",
  server: {
    host: true,
    port: 8080,
    allowedHosts: ["59f9cc8e3c4a.ngrok-free.app", "6545aab9f8c1.ngrok-free.app", "b9897d1dee22.ngrok-free.app", "1df55b40310c.ngrok-free.app", "b6cbf5252a59.ngrok-free.app"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Spline-related dependencies
          'spline': ['@splinetool/react-spline', '@splinetool/loader', '@splinetool/r3f-spline'],
          // Separate Three.js and WebGL dependencies
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Separate UI components
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          // Vendor chunk for other dependencies
          'vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps in development
    sourcemap: mode === "development",
    // Optimize for production
    minify: mode === "production" ? "esbuild" : false,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  optimizeDeps: {
    // Pre-bundle Spline dependencies
    include: [
      '@splinetool/react-spline',
      '@splinetool/loader',
      '@splinetool/r3f-spline',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
    // Exclude heavy dependencies from pre-bundling
    exclude: ['@splinetool/react-spline/dist/index.js'],
  },
  // Performance optimizations
  esbuild: {
    // Drop console.log in production
    drop: mode === "production" ? ["console", "debugger"] : [],
    // Remove performance monitoring code in production
    define: mode === "production" ? {
      __PERFORMANCE_MONITORING__: 'false'
    } : {},
  },
}));

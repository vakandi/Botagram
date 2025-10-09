import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
    allowedHosts: ["59f9cc8e3c4a.ngrok-free.app", "6545aab9f8c1.ngrok-free.app", "b9897d1dee22.ngrok-free.app", "1df55b40310c.ngrok-free.app", "b6cbf5252a59.ngrok-free.app"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

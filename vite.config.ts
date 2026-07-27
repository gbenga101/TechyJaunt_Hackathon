import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Proxy /api/v1/* to the backend during local dev — avoids CORS entirely
      "/api/v1": {
        target: "https://farmroutebackend.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
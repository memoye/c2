import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  envPrefix: "CHRONICA_",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/oidc-proxy": {
        target: "https://vault-auth.moolahvest.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oidc-proxy/, ""),
        secure: false,
      },
    },
  },
});

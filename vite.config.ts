import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import sitemap from "vite-plugin-sitemap";
import svgr from "vite-plugin-svgr";

const staticRoutes = [
  "/",
  "/onboarding",
  "/login",
  "/about",
  "/pricing",
  "/contact",
];
// const dynamicRoutes = []; // Manually list or fetch dynamically

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "CHRONICA_");

  return {
    plugins: [
      react(),
      tailwindcss(),
      sitemap({
        hostname: env.CHRONICA_APP_URL,
        dynamicRoutes: [...staticRoutes /* ...dynamicRoutes */],
        exclude: ["/silent-renew.html"],
      }),
      svgr({
        svgrOptions: {
          exportType: "default",
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: "**/*.svg",
      }),
    ],
    envPrefix: "CHRONICA_",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      proxy: {
        "/vault": {
          target: env.CHRONICA_AUTH_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/vault/, ""),
          secure: false,
        },
        "/backend-proxy": {
          target: env.CHRONICA_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/backend-proxy/, ""),
          secure: false,
        },
      },
    },
  };
});

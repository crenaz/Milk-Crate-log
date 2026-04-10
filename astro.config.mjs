// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

const isProd =
  process.env.NODE_ENV === "production" ||
  process.env.CF_PAGES === "1" ||
  process.env.CF_PAGES === "true";

// https://astro.build/config
export default defineConfig({
  output: "static",
  // Cloudflare adapter runs Miniflare/workerd in dev, which may fail on older glibc
  // environments (common in WSL). Keep local dev adapter-free; enable on prod builds.
  adapter: isProd ? cloudflare() : undefined,
  integrations: [react()],

  server: {
    host: true, // cleaner than "0.0.0.0"
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    // Performance + DX improvements
    optimizeDeps: {
      include: ["react", "react-dom"],
    },

    build: {
      target: "es2022",
    },
  },
});

import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Baklava web components'i tanı
          isCustomElement: (tag) => tag.startsWith("bl-"),
        },
      },
    }),
  ],
  // Production'da GitHub Pages için base URL
  base: process.env.NODE_ENV === "production" ? "/baklava-book/" : "/",
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    fs: {
      // Ana projeye erişim izni ver
      allow: [".."],
    },
  },
});

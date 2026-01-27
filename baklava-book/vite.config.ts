import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue({
      template: {
        compilerOptions: {
          // Recognize Baklava web components
          isCustomElement: (tag) => tag.startsWith("bl-"),
        },
      },
    }),
  ],
  // Production'da GitHub Pages için base URL (repo name: baklava)
  base: process.env.NODE_ENV === "production" ? "/baklava/" : "/",
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

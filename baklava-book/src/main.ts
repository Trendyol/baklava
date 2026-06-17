import "@trendyol/baklava";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "../../src/themes/dark.css";
import App from "./App.vue";
import "./assets/main.css";
import "@trendyol/baklava/dist/themes/default.css";

// Initialize theme synchronously before app mounts to prevent flash
function initializeTheme() {
  const savedTheme = localStorage.getItem("baklava-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme ? savedTheme === "dark" : prefersDark;

  // Apply theme to document immediately
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";

  // Update theme-color meta tag
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", isDark ? "#0f131a" : "#ffffff");
  }

  return isDark;
}

// Initialize theme before app mounts
const initialDark = initializeTheme();

// Export for use in App.vue
(window as any).__INITIAL_DARK_MODE__ = initialDark;

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./views/HomeView.vue"),
  },
  {
    path: "/docs/:slug",
    name: "docs",
    component: () => import("./views/DocView.vue"),
  },
  {
    path: "/components/:slug",
    name: "component",
    component: () => import("./views/ComponentView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

const app = createApp(App);

app.use(router);
app.mount("#app");

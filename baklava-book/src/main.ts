import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "@trendyol/baklava";
import "@trendyol/baklava/dist/themes/default.css";

import App from "./App.vue";
import "./assets/main.css";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./views/HomeView.vue"),
  },
  {
    path: "/components/:slug",
    name: "component",
    component: () => import("./views/ComponentView.vue"),
  },
  {
    path: "/docs/:slug",
    name: "docs",
    component: () => import("./views/DocView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

const app = createApp(App);

app.use(router);
app.mount("#app");

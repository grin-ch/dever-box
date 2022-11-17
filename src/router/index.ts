import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const Home = () => import("../views/Home.vue");
const Game = () => import("../views/Game.vue");
const About = () => import("../views/About.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: { name: "home" } },
  { path: "/home", name: "home", component: Home },
  { path: "/game", name: "game", component: Game },
  { path: "/about", name: "about", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

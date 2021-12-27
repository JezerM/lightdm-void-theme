import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
//import Select from "../views/Select.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/select/:mode",
    name: "Select",
    component: () =>
      import(/* webpackChunkName: "select" */ "../views/Select.vue"),
  },
  {
    path: "/splash/:mode",
    name: "Splash",
    component: () =>
      import(/* webpackChunkName: "splash" */ "../views/Splash.vue"),
  },
  {
    path: "/config",
    name: "Config",
    component: () =>
      import(/* webpackChunkName: "config" */ "../views/Config.vue"),
  },
];

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;

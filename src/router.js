import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "welcome",
      component: () => import("./views/Welcome.vue"),
    },
    {
      path: "/list",
      name: "list",
      component: () => import("./views/List/List.vue"),
    },
    {
      path: "/new",
      name: "new",
      component: () => import("./views/New/New.vue"),
    },
  ],
});

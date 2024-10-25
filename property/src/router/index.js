import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  // {
  //   path: "/home",
  //   name: "Home",
  //   // redirect: "/home/index",
  //   component: Home,
  //   children: [
  //     {
  //       path: "/home/index",
  //       name: "Index",
  //       component: () => import("../components/Index.vue"),
  //       meta: { title: '首页' },
  //     }
  //   ]
  // }
  {
    path: "/index",
    name: "Home",
    component: Home,
    children:[
      {
        path: "index/house/unit",
        name: "Unit",
        component: () => import("../components/Unit.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

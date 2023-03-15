// 引入路由组件
/* import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center"; */

// 引入二级路由
/* import MyOrder from "@/pages/Center/myOrder/myOrder.vue";
import GroupOrder from "@/pages/Center/groupOrder/groupOrder.vue"; */

export default [
  {
    path: "*",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    path: "/search:keyword?",
    name: "search",
    component: () => import("@/pages/Search"),
    meta: { show: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/Register"),
    meta: { show: false },
  },
  {
    path: "/detail/:skuId?",
    name: "detail",
    component: () => import("@/pages/Detail"),
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
  },
  {
    path: "/trade",
    name: "trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
  },
  {
    path: "/paySuccess",
    name: "paySuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/pay") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/center",
    name: "center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    children: [
      {
        path: "/center",
        // 重定向
        redirect: "/center/myOrder",
      },
      {
        path: "myOrder",
        component: () => import("@/pages/Center/myOrder/myOrder.vue"),
      },
      {
        path: "groupOrder",

        component: () => import("@/pages/Center/groupOrder/groupOrder.vue"),
      },
    ],
  },
];


 // props->简化模板$route
    /* props: ($route) => {
        return {
          keyword: $route.params.keyword,
          k: $route.query.k,
        }
      } */


 // 1 值为布尔值 只能传params
    // props: true,

    // 2 值为对象 额外传参
    /* props: {
        a: 1,
        b:2
      } */

    // 3 值为函数 可以简化模板
    /* props: ($route) => {
        return {
          keyword: $route.params.keyword,
          k: $route.query.k,
        }
      } */
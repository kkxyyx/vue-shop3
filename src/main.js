import Vue from "vue";
import App from "./App.vue";

// 引入路由
import router from "./router";

// 引入全局组件
import TypeNav from "@/components/TypeNav";
import pagination from "@/components/Pagination";

// 引入大仓库
import store from "@/store";

// 引入mockServe.js
import "@/mock/mockServe";

// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(pagination.name, pagination);

// 引入swiper样式 (选择全局引入->网站多处用到)
// import "swiper/swiper.min.css";

// 引入饿了么 走马灯（轮播图）组件
import "element-ui/lib/theme-chalk/index.css";
import { Carousel, CarouselItem, MessageBox } from "element-ui";
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 图片懒加载
import conan from '@/assets/images/R-C.jpg';
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  loading: conan,
});

// 引入表单验证
import "./utils/validate";

// 统一接口API文件夹里的全部请求函数
import * as API from '@/api';
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由,注册后组件身上多了$route,$router属性
  router,
  // 注册仓库,注册后组件身上多了$store属性
  store,
}).$mount("#app");

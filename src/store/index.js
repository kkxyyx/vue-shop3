import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import users from "./users";
import trade from "./trade";
// bug Vuex.Store中S大写
export default new Vuex.Store({
  // namespaced:true,
  modules: {
    home,
    search,
    detail,
    shopcart,
    users,
    trade
  },
});

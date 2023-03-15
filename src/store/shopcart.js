import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
  cartList: [],
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};
const actions = {
  // 获取商品列表
  async getCartList({ commit }) {
    let result = await reqGetCartList();
    // console.log(result)
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  // 删除产品数量deleteCartById
  async deleteCartById({ commit }, skuId) {
    let result = reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 更新产品的选中状态
  async updateCheckedById({ skuId, isChecked }) {
    let result = reqUpdateCheckedById(skuId, isChecked);
    // console.log(result)
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 清除所有产品的选中状态
  deleteAllCheckedCart({ getters, dispatch }) {
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch("deleteCartById", item.skuId) : "";
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
  // 更新所有产品的选中状态
  updateAllIsChecked({ getters, dispatch }, isChecked) {
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked
      });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
const mutations = {
  // 获取产品列表
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};

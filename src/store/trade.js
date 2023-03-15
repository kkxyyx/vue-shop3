import { reqAddressInfo, reqOrderInfo } from "@/api";

// 交易的小仓库
const state = {
  addressInfo: [],
  orderInfo: {},
};
const getters = {};
const actions = {
  async getUserAdress({ commit }) {
    let result = await reqAddressInfo();
    // console.log("getUserAdress", result);
        if (result.code == 200) {
            commit('GETUSERADRESS',result.data)
        }
  },
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    // console.log("getOrderInfo", result);
      if (result.code == 200) {
        commit("GETORDERINFO", result.data);
      }
  },
};
const mutations = {
  GETUSERADRESS(state, addressInfo) {
    state.addressInfo = addressInfo;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

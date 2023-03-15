import { reqGetGoodsInfo, reqUpdateShopcar } from "@/api";
import { getUUID } from "@/utils/uuid_token";
// 详情页的小仓库
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token:getUUID()
};
const getters = {
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
  
};
const actions = {
  // 获取产品信息
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGetGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  // 将产品添加到购物车(对已有商品进行数量改动)
  async addShopcar({ commit }, { skuId, skuNum }) {
    let result = await reqUpdateShopcar(skuId, skuNum);
    if (result.code == 200) {
      // 返回成功的标记
      return "ok";
    } else {
      // 返回失败的标记
      return Promise.reject(new Error("fail"));
    }
  },
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

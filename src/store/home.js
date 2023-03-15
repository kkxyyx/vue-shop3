// home模块的小仓库
import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
const state = {
  // 数据的格式取决于服务器返回的数据
  categoryList: [],
  bannerList: [],
  floorList:[]
};
const actions = {
  // 获取三级分类列表
  async getCategoryList({ commit }) {
    let result = await reqGetCategoryList();
    if (result.code == 200) {
      result.data.splice(15, 2);
      commit("GETCATEGORYLIST", result.data);
    }
  },
  // 获取首页轮播图
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  async getFloorList({ commit }) {
    let result = await reqGetFloorList()
    if (result.code == 200) {
      commit('GETFLOORLIST',result.data)
    }
  }

};
const mutations = {
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state,floorList) {
    state.floorList=floorList
  }
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};

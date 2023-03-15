import { reqSearchInfo } from "@/api";

// search模块的小仓库
const state = {
  // 通过 检查->网络->响应 查询服务器返回的数据格式
  searchList:{}
};
// 计算属性，为简化数据而生
const getters = {
  // 以防返回undefined，加一个管道
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  }
}
const actions = {
  // params是派发action时的第二个参数传递过来的
  async getSearchList({commit},params={}) {
    let result = await reqSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST',result.data)
    }
  }
};
const mutations = {
  GETSEARCHLIST(state,searchList) {
    state.searchList=searchList
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};

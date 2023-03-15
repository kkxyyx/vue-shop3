import {
  reqGetcode,
  reqLogout,
  reqUserInfo,
  reqUserLogin,
  reqUserRegister,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";

const state = {
  code: "",
  token: getToken(),
  userInfo: "",
};
const getters = {};
const actions = {
  async getCode({ commit }, phone) {
    // 这个接口是随机返回六位数，正常情况下应该是发送给手机
    let result = await reqGetcode(phone);
    console.log("getCode", result);
    // 正常情况下在以下代码不用写
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    console.log('userRegister',result);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    console.log("userLogin", result);
    if (result.code == 200) {
      commit("USERLOGIN",result.data.token);
      // 持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    console.log("getUserInfo", result);
    if (result.code == 200) {
      commit("GETUSERINFO",result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 退出登陆
  async userLogout({ commit }) {
    let result = await reqLogout();
    console.log("userLogout", result);
    if (result.code == 200) {
      commit("LOGOUT");
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(start, userInfo) {
    state.userInfo = userInfo;
  },
  LOGOUT(state) {
    state.token = "";
    state.userInfo = "";
    removeToken();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

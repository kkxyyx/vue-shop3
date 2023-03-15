// 当前模块 -- 对API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

// 对外暴露函数

// 获取三级分类列表的数据
export const reqGetCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "GET" });

// 获取轮播图
export const reqGetBannerList = () =>
  mockRequests({ url: "/banner", method: "GET" });

// 获取楼层的mock数据
export const reqGetFloorList = () =>
  mockRequests({ url: "/floor", method: "GET" });

// 获取搜索模块数据
// 当前这个接口，给服务器传递默认参数（至少是一个空对象，否则请求失败）
export const reqSearchInfo = (params) =>
  requests({ url: "/list", method: "POST", data: params });

// 获取产品数据
/* export const reqGetGoodsInfo = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: "GET",
  }); */

// 获取产品模拟数据
export const reqGetGoodsInfo = () =>
  mockRequests({
    url: `/cart`,
    method: "GET",
  });

// 加入购物车(对已有商品进行数量改动)[skuId, skuNum必选]
export const reqUpdateShopcar = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });

// 获取购物车列表数据
export const reqGetCartList = () =>
  requests({
    url: `/cart/cartList`,
    method: "get",
  });

// 删除购物车产品
export const reqDeleteCartById = (skuId) => {
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
};

// 改变商品选中状态 [skuID, isChecked]必选
export const reqUpdateCheckedById = (skuID, isChecked) =>
  requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: "get" });

// 获取验证码
export const reqGetcode = (phone) =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });

// 用户注册
export const reqUserRegister = (user) =>
  requests({
    url: "/user/passport/register",
    method: "post",
    data: user,
  });
// 用户登录,服务器返回一串token
export const reqUserLogin = (data) =>
  requests({
    url: "/user/passport/login",
    method: "post",
    data: data,
  });

// 获取用户信息（带着token向服务器要用户信息）
export const reqUserInfo = () =>
  requests({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });

/* export const reqUserInfo = () => {
  mockRequests({
    url: "/userInfo",
    method: "get",
  });
}; */

export const reqLogout = () =>
  requests({
    url: "/user/passport/logout",
    method: "get",
  });
// 获取用户地址
export const reqAddressInfo = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

// 获取订单信息
export const reqOrderInfo = () =>
  requests({
    url: "/order/auth/trade",
    method: "get",
  });

// 提交订单
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });
// 获取订单支付信息
export const reqPayInfo = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "GET",
  });

// 查询支付订单状态
export const reqPayStatus = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "GET",
  });

// 获取我的订单列表/order/auth/{ page }/{ limit }
  export const reqMyOrderList = (page, limit) =>
    requests({
      url: `/order/auth/${page}/${limit}`,
      method: "GET",
    });

// 先引入mockjs模块
import Mock from "mockjs";
// webpack 默认暴露图片、json数据格式
import banner from "./banner.json";
import floor from "./floor.json";
import cart from "./cart.json";
import orderInfo from "./order.json";

Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
Mock.mock("/mock/cart", { code: 200, data: cart });
Mock.mock("/mock/orderInfo", { code: 200, data: orderInfo });

// banner的jsons数据
/*  {
        "id":"2",
        "imgUrl":"/images/banner2.jpg"
    },
    {
        "id":"3",
        "imgUrl":"/images/banner3.jpg"
    },
    {
        "id":"4",
        "imgUrl":"/images/banner4.jpg"
    } */

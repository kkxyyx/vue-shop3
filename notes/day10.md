# 第十天

## 购物车业务

### 游客身份

实现：  

- 需要一个用户的uuidToken，用来验证用户身份。但是该请求函数没有参数，所以只能把uuidToken加在请求头中

解决方法：

- npm install uuid

 >每个用户的uuid不能发生变化，还要持久存储

```JS
// utils-uuid_token.js
import {v4 as uuidv4} from 'uuid'
export const getUUID = () => {
    //1、判断本地存储是否有uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //2、本地存储没有uuid
    if(!uuid_token){
        //(1)生成uuid
        uuid_token = uuidv4()
        //(2)存储本地
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    return uuid_token
}
```

```JS
// store-detail.js
const state =  {
    goodInfo:{},
    //游客身份
    uuid_token: getUUID()
}
```

```JS
// api-request.js
import store from '@/store';
requests.interceptors.request.use(config => {
    // config内主要是对请求头Header配置

    // 1、先判断uuid_token是否为空
    if(store.state.detail.uuid_token){
        // 2、userTempId字段和后端统一
        config.headers['userTempId'] = store.state.detail.uuid_token
    }
    return config;
})
```

### 购物车数量的操作

产品数量变化 -> 发请求，带着**变化的数量**请求参数

```HTML
<li class="cart-list-con5">
     <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cartInfo)">-</a>
     <input autocomplete="off" type="text" :value="cartInfo.skuNum" @change="handler('change',$event.target.value,cartInfo)" minnum="1" class="itxt">
     <a href="javascript:void(0)" class="plus" @click="handler('add',1,cartInfo)">+</a>
 </li>
```

```JS
 handler: throttle(async  function(type,disNum,cart){
    if(type === 'minus') {
       //当商品数量为1是，不可以再减少
       if(cart.skuNum === 1){
           return;
       }
    }
    if(type === 'change'){
       //输入内容不合法时
        if(isNaN(disNum * 1)  || disNum <= 0){
          disNum = 0;
        }else{
          disNum = parseInt(disNum) - cart.skuNum
        }
    }
   try{
       await this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum})
       // 商品数量修改成功后再次获取服务器数据
       await this.$store.dispatch("getCartList")
   }catch (error){
       alert(error)
   }
},100)
```

### 删除多个商品

由于后台只提供了删除单个商品的接口，所以要删除多个商品时，只能多次调用actions中的函数

另一种思路

>context中包含dispatch、getters、state，即actions函数中通过dispatch调用其他的actions函数，可以通getters获取仓库的数据

```js
// store-shopcart.js
deleteAllCheckedById({dispatch,getters}) {
        getters.getCartList.cartInfoList.forEach(item =>  {
            let result = [];
            //将每一次返回值添加到数组中
            result.push(item.isChecked === 1?dispatch('deleteCartById',item.skuId):'') 
        })
 return Promise.all(result)
    }
```

>Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值

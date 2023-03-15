# 第十一天

## 登录注册业务

>在开发后台管理系统项目的时候一定要培养看在线文档能力

```js
// utils-token.js
// 存储token
export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};
// 获取token
export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

// 清除本地存储的token
export const removeToken=()=>{
   localStorage.removeItem("TOKEN");
}

```

### 注册业务

```js
// 注册组件
async userRegister(){
    const{phone,password,code} = this
    const success = await this.$validator.validateAll(); 
    if(success){
        // 表单验证成功
        try{
            await this.$store.dispatch('userRegister',{phone,password,code})
            //注册成功跳转到登陆页面，并且携带用户账号
            await this.$router.push({path:'/login',query:{name:this.phone}})
        }catch (error){
            alert(error)
        }
    }
}
```

### 登录业务

- 登录成功 --> 服务器返回token --> 存储token --> **携带token发请求, 获取用户信息**

问题：
为什么刷新页面，用户信息就消失
原因：  

Vuex存储数据非持久化

解决办法：
本地存储token + 配置在请求头中

```js
// store-users.js
async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if(result.code === 200){
            // 登录成功，服务器会返回token
            // token存入vuex
            commit("SETUSERTOKEN",result.data.token)
 
            // 本地存储token (持久化)
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },

```

```js
// 在请求拦截器里写
// 携带token给服务器
if(store.state.user.token)
    // 配置在请求头中
    config.headers.token = store.state.user.token
```

问题：
为什么去别的模块【非home模块】获取用户信息失败？  
原因：
当页面刷新时，虽然本地token不会消失，但是store中的其他数据（用户信息等）会清空,且你去别的模块也没有发请求获取用户信息

解决办法:  

1. 笨方法： 每一个组件都在mounted里面发起获取用户信息，进行展示  
2. **设置全局前置导航守卫**

```js
// -router-index.js
router.beforeEach(async(to, from, next) =>  {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 1、判断有没有token
    if(token){
        // 有token --> 登陆了，不允许前往登录页
        if(to.path==='/login'){
            next('/home')
        } else{
            // 2、判断仓库中是否有用户信息(页面刷新 --> 导致store中的用户信息丢失)
            if(name)
                // 有用户信息，放行
                next()
            else{
                // 没有用户信息，发请求获取用户信息，再放行
                try{
                    await store.dispatch('getUserInfo')
                    next()
                }catch (error){
                    // 获取用户信息失败 --> token过期 --> 重新登录
                    // 必须清除前后端的token
                    await store.dispatch('logout')
                    next('/login')
                }
            }
        }
    }else{
        // 没有token --> 未登录，只可以访问 --> 首页 + 登录 + 注册页
        if(to.path === '/login' || to.path === '/home' || to.path==='/register')
            next()
        else{
            alert('请先登录')
            next('/login')
        }
    }
})
```

### 退出登录

1. 发请求，需要通知服务器，把现在用户身份token【销毁】
2. 清除仓库数据+本地存储数据

```js
// store-user.js
LOGOUT(state) {
    state.token = "";
    state.userInfo = "";
    removeToken();
  }
```

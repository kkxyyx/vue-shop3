# 第四天

## 开发Floor组件业务

### **mock.js**的使用

>**mock.js** - 生成随机数据，拦截 Ajax 请求

> 官方地址 <http://mockjs.com/>

1. 安装`mockjs` 
2. 创建mock文件夹
3. 准备`json`格式的模拟数据

>`JSON`格式的模拟数据：不能有空格，使用格式化插件进行格式化

>把mock数据需要的图片放置于`public`文件夹中

4. 创建`mockServe.js`，引入mockjs和模拟数据

>对于`webpack`当中一些模块：图片、json，不需要对外暴露，因为默认就是对外暴露

5. 在`mockServe.js`中，通过`Mock.mock(请求地址,请求内容)`方法进行模拟数据  

>示例：`Mock.mock('/mock/banner',{code:200,data:banner})`

6. 回到入口文件，引入`mockServe.js`

7. 在API文件夹中创建`mockRequest.js`（对axios进行二次封装的模块）【baseURL:'/mock'】

>真实数据的 `baseURL:'/api'`  
>模拟数据的 `baseURL:'/mock'`

### 一般步骤

1. 写api  
2. Vuex三连环（`state，action，mutation`）  
3. 派发`action`，`mapState`获取数据  
4. 渲染结构

>注意，这里的floor组件被复用两次，所以派发action应该写在**父组件**的`mounted`中,父组件需要通知Vuex发请求，父组件获取到`mock`数据，通过`v-for`遍历生成多个floor组件，达到复用作用

>如果在floor组件中派发action，则无法遍历出两个不同的floor???


# 第一天

## 路由

>注意，项目采用的less样式,浏览器不识别less语法，需要一些loader进行处理，把less语法转换为CSS语法，所以，需要安装`less less-loader@5`

### 路由的跳转

声明式导航：（`router-link`：务必要有to属性）

- 声明式导航使用很多的router-link组件时，一瞬间new出很多VC实例，消耗内存，导致卡顿

  法一：`keep-alive`，`keep-alive`是Vue提供的一个抽象组件，主要用于保留组件状态或避免重新渲染，和`<transition>` 相似，` <keep-alive>` 是一个抽象组件，它自身不会渲染一个DOM元素

  ```html
     <keep-alive>
     <!-- 需要缓存的视图组件 -->
       <router-view v-if="$route.meta.keepAlive" />
     </keep-alive>
     <!-- 不需要缓存的视图组件 -->
     <router-view v-if="!$route.meta.keepAlive" />
  ```

    法二：编程式导航+事件委派

编程式导航： `push | replace`
- 编程式导航可以书写自己的业务逻辑
- 编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误,这种异常，对于程序没有任何影响
- 由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象。解决方案：重写`push|replace`方法

> **router-view** 当你的路由**path 与访问的地址相符时**，会**将指定的组件**替换该 router-view

实现：  
路由跳转+传递参数+合并参数

问题：

    对于声明式路由，我们有多少个a标签就会生成多少个router-link标签，频繁操作时会出现卡顿现象。对于编程式路由，我们是通过触发点击事件实现路由跳转。同理有多少个a标签就会有多少个触发函数。虽然不会出现卡顿，但是也会影响性能

解决方法：

编程式导航+事件委派  

事件委派问题:  

1. 如何确定我们点击的一定是a标签呢
  
2. 如何获取子节点标签的商品名称和商品id

解决方法：  
为a标签添加自定义属性date-categoryName，绑定商品标签名称来标识a标签，为三个等级的a标签再添加自定义属性data-category1Id、data-category2Id、data-category3Id来区分三个等级a标签

> 利用回调函数的默认传参e，解构e.target.dataset，判断自定义属性

```js
// 给父元素添加点击跳转方法
goSearch(e) {
      // console.log(e.target);// <a data-v-18b3c0cc data-categoryname="手机">手机</a>
      // console.log(e.target.dataset);// {v-18b3c0cc:''categoryname:'手机'}
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      if (categoryname) {
        // 整理路由参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 判断第几级列表
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 合并params参数
        if (this.$route.params) {
          // 整理参数
          location.params = this.$route.params;
          location.query = query;
        }
        // 路由跳转
        this.$router.push(location);
      }
```

### 路由传参

- `params`参数：路由需要占位，属于URL当中一部分  
- `query`参数：路由不需要占位  

### 区分 $router与 $route

- `$router`：进行编程式导航的路由跳转

  - `this.$router.push|replace`

- `$route`：可以获取路由的信息|参数
  
  - `this.$route.path`

  - `this.$route.params|query`

  - `this.$route.meta`

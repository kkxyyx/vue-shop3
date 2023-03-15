# 项目第五天

## 开发listContainer组件业务

>官网<https://swiper.com.cn/usage/index.html>

### swiper在Vue项目中的使用方法

1. 安装swiper  
2. 在相应的组件引入swiper.js|swiper.css

  >swiper.css只需要在入口文件引入一次即可

3. 初始化swiper实例

- 初始化swiper实例之前，页面中的**节点(结构)**务必要有，对于Vue一个组件而言，mounted:组件挂载完毕，相应的结构就有了

问题：
初始化写在mounted函数中有时候会失败
原因：
异步请求数据，v-for遍历数据，都需要时间，此时，结构还未完整渲染
解决方案:

- `watch+$nextTick`

  >注意：组件实例的`$nextTick`方法，经常结合第三方插件使用，**获取更新后的DOM节点**

```js
watch: {
    skuImageList(newValue, oldValue) {
      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //显示几个图片设置
          slidesPerView: 3,
          //每一次切换图片个数
          slidesPerGroup:1
        });
      });
    },
  }
```


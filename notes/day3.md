# 第三天

## 开发typeNav全局组件

>注意：以后在开发项目的时候，如果发现某一个组件在项目当中多个地方出现频繁的使用,就把这类的组件注册为**全局组件**，一般是在**入口文件注册**

> *全局组件发送请求*，本来写在组件中，为优化性能 --> 实现只发一次 --> 把请求移到App.vue组件中

### 一级分类的背景效果

法一 ：CSS -> :hover  
**法二** ：JS -> 动态添加类名  

>利用data中的currentIndex，v-for中的Index

  1. 添加鼠标进入mouseenter的方法，并传参(index)  

    -- `this.currentIndex=index`
  2. 动态添加类名  

    -- `:class="{cur: currentIndex === index}"`
  3. 添加鼠标离开mouseleave的方法  

    -- `this.currentIndex = -1`

  >为防止用户过快操作，这里应该进行**节流**操作，import throttle from "lodash/throttle"

### 动态展示二三级分类列表

动态添加样式  
`:style="{diaplay:currentIndex === Index?'block':'none'}"`

### 其他业务分析

需求：  
三级联动在home模块正常显示，在search模块手动显示  
思路：  
你需要让三级联动组件知道谁在用它  
解决方案：  
通过挂载时判断 `this.$route.path!='/home'`，进行条件渲染（v-show）

### 过渡效果

1. 在需要过渡的节点外包裹**transition**内置组件，可以添加name属性
2. 在css中，添加`name-enter-from,name-enter-to,name-leave-from,name-leave-to`四个类名，写样式

>注意，节点|组件务必出现`v-if | v-show`指令才可以进行过渡动画

### TypeNav三级联动**性能优化**

问题：  
home切换到search或者search切换到home，组件在频繁的向服务器发请求，获取三级联动的数据进行展示

>**路由跳转**的时候，组件会进行销毁

思路：  
只需要发一次请求，获取到三级联动的数据  
解决方案：  
把发送请求移到`App.vue`中

>注意：虽然main.js也是只执行一次，但是不可以放在main.js中，因为**只有组件的身上才会有$store属性**


# 第六天

## 开发search模块

>注意：搜索的接口，需要传递参数，至少是一个空对象

实现：

- 根据分类展示不同列表，需要带不同的请求参数发多次请求
  

解决办法：

- 封装成一个函数

>请求的性能优化：对于给服务器携带的参数：如果数值为`undefined`，则参数不会携带给服务器

问题：  

- 第一次进入search页面，展示什么  
  

思路：  

- 根据用户输入的关键词，点击的分类列表，初始化请求参数
  

解决办法：

- 在beforeMount中整理第一次参数

 ```js
  // 在组件挂载完毕之前，整理一次参数
  beforeMount() {
    // 笨方法（以此类推）
    // this.searchParams.category1Id=this.$route.query.category1Id
    // 合并对象, 整理参数 Object.assign(target, ...sources)
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  mounted() {
    this.getData();
  }
 ```

### 利用路由信息变化实现动态搜索

最初想法：  

- 在每个三级列表和搜索按钮上加click事件，只要点击了就执行搜索函数。但是会**生成很多回调函数**，耗性能
  

最佳方法：

- 通过监听路由信息的变化来动态发起搜索请求。

>$route是组件的属性，所以watch是可以监听的

>注意：组件中data的属性包括：自己定义的、系统自带的（如 $route）、父组件向子组件传递的等等

```JS
  watch:{
      $route(newValue,oldValue){
        // 1. 请求前，整理路由参数
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        // 2. 发请求
        this.getData()
        // 3. 记得要清空一些params,避免与下一次请求参数混合
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        this.$route.params.keyword = undefined;
      }
    },
```

### 面包屑业务

#### 删除面包屑

1. 删除分类（query）面包屑

```JS
      removeBread(){
        // 改变请求参数
        this.searchParams.categoryName = undefined
        // 自己跳自己，修改 params
        this.$router.push({name:'Search',params:this.$route.params})
      }
```

2. 删除关键字（params）面包屑

不同点是此部分会多一步操作：删除输入框内的关键字,输入框的关键字数据在header组件中，所以要实现该操作就要通过（header和search）兄弟组件通信完成

```JS
//  Search.vue
removeBreadParams(){
        this.searchParams.keyword = undefined
        //通知兄弟组件header删除输入框的keyword关键字
        this.$bus.$emit("clear")
        this.$router.push({name:'Search',query:this.$route.query})

}

// Header.vue
mounted() {
  // 组件挂载时就监听clear事件
    this.$bus.$on("clear",()=>{
      this.keyword = ''
    })
  }
```

3. 删除品牌面包屑  

 这里删除面包屑时不需要修改地址栏url，因为url是由路由地址+query+params

 ```JS
// Search.vue
searchInfo(){
        this.$store.dispatch("getSearchList",this.searchParams)
      },
removeTradeMark(){
        this.searchParams.trademark = undefined
        this.searchInfo()
      }
 ```

#### 加入面包屑

```JS
// Search的子组件SearchSelector.vue
 attrHandler(attr, attrValue) {
      this.$emit("attrInfo", attr, attrValue);
    },
// Search.vue
    加入其他属性面包屑事件
    attrInfo(attr, attrValue) {
      // props: [], 平台属性的选择参数
      // eg：'107:1200mAh以下:电池容量'
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (!this.searchParams.props.includes(props)) {
        this.searchParams.props.push(props);
      }
      this.getData()
    }
```

#### 渲染面包屑

- 条件渲染

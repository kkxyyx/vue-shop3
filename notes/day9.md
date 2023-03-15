# 第九天

## 开发详情业务

### 滚动行为的设置

<https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html>

### 选择商品属性(款式)

**排他操作**：在工作中经常使用

```js
// 传入：点击项和所有项
changeActive(list, arr) {
      // 排他操作
      arr.forEach((item) => {
        item.isChecked = "0";
      });
      list.isChecked = "1";
    }
// 动态添加类名
    :class="{ active: list.isChecked == 1 }"
```

### 放大镜的功能

```JS
// 放大镜组件
handler(e) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      if (left < 0) left = 0;
      if (left > mask.offsetWidth) left = mask.offsetWidth;
      if (top < 0) top = 0;
      if (top > mask.offsetWidth) top = mask.offsetWidth;
      // 修改遮罩层的位置  【重点】要加'px'
      
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";

```

### 点击轮播图，改变放大镜组件展示的图片

```html
<!-- 轮播图组件 -->
<!-- 点击图片高亮设置 -->
<img :src="skuImage.imgUrl" :class="{active:currentIndex===index}" @click="changeImg(index)">
```

```JS
轮播图组件
changeImg(index){
        //将点击的图片标识位高亮
        this.currentIndex = index
        //通知兄弟组件修改大图图片
        this.$bus.$emit("changeImg",index)
      }

```

```JS
// 放大镜组件
mounted() {
      this.$bus.$on("changeImg",(index)=>{
        //修改索引
        this.currentIndex = index;
      })
    }

    computed:{
      imgObj(){
        // 返回当前索引的图片
          return this.skuImageList[this.currentIndex] || {}
      }
    },
```

### 加入购物车的业务

点击加入购物车时，会向后端发送请求，请求的返回值中data为null，只需要根据状态码code判断是否跳转到"加入购物车的成功页面"。

>注意，只有在服务器将你的产品信息存储成功后，才能进行路由跳转

```JS
// 商品详情页面组件
async addShopCar() {
        try{
          await  this.$store.dispatch("addOrUpdateShopCart", {
            skuId: this.$route.params.skuId,
            skuNum: this.skuNum
          });
          // 简单的数据，通过query传过去
          // 复杂的数据，通过session存储
          // sessionStorage、localStorage只能存储字符串        
          sessionStorage.setItem("SKUINFO",JSON.stringify(this.skuInfo))
          this.$router.push({name:'AddCartSuccess',query:{'skuNum':this.skuNum}})
        }catch (error){
          alert(error.message)
        }
      }

```

```JS
// 商品详情仓库
async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
```

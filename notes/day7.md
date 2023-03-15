# 项目第七天

## 排序业务

1. 代表综合
2. 代表价格
3. asc代表升序
4. desc代表降序  

四种排序方式  
"1:asc" "1:desc"  "2:asc"  "2:desc"

箭头图标（阿里图标库）
>官网<https://www.iconfont.cn/>

>在public文件index引入该css

分析：
  
- 根据1 | 2区分谁有类名active和箭头
  
- 根据asc | desc区分上下箭头

```html
<li :class="{active:isOne}" @click="changeOrder('1')">
<!-- 阿里图标前置类iconfont-->
    <a>综合
        <span v-show="isOne" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}"></span>
    </a>
</li>
<li :class="{active:isTwo}" @click="changeOrder('2')">
    <a >价格
        <span v-show="isTwo" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}"></span>
    </a>
</li>

```

```JS
computed:{
      ...mapGetters(['goodsList']),
      isOne(){
        return this.searchParams.order.indexOf('1')!==-1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2')!==-1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc')!==-1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc')!==-1
      },
    }

changeOrder(flag){
        let newSearchOrder = this.searchParams.order
        //将order拆为两个字段orderFlag(1:2)、order(asc:desc)
        let orderFlag = this.searchParams.order.split(':')[0]
        let order = this.searchParams.order.split(':')[1]
        //点击另外一个按钮
        if(orderFlag!==flag){
          newSearchOrder = `${flag}:desc`
          this.getData()
        }else{
          //点击同一个按钮
          newSearchOrder = `${orderFlag}:${order==='desc'?'asc':'desc'}`
          }
        //需要给order重新赋值
        this.searchParams.order = newSearchOrder;
        //再次发请求
        this.getData();
      }

```

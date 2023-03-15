# 第十二天

提交订单业务

当用户点击提交订单按钮的时候，需要发请求的
提交订单的请求地址

前台：需要告诉服务器：谁买的、买的啥、买几个、 支付多少钱、留言信息...
后台：订单号，这笔交易的一个标识符

## 支付业务

>[Element-UI](<https://element.eleme.cn/#/zh-CN>) --> 弹出框messageBox

>展示二维码----qrcode插件 --> 将字符串转换为在线二维码链接图片

1. 当下选择————前端开启定时器，一直找服务器要用户支付信息

2. 公司项目————前端上线 + 和后台紧密配合

> 支付成功后，需要后台重定向到项目某一个路由中，将支付情况通过URL参数形式传给前端，前端获取到服务器返回的参数，就可以判断了

```js
 // 支付组件 
 // 点击支付按钮，弹出支付二维码
    async open() {
      //生成二维(地址)
      let url = await QRCode.toDataURL(this.payInfo.codeUrl);
      this.$alert(`<img src=${url} />`, "请你微信支付", {
        dangerouslyUseHTMLString: true,
        center: true,
        showCancelButton: true,
        cancelButtonText: "支付遇见问题",
        confirmButtonText: "已支付成功",
        showClose: false,
        beforeClose: (type, instance, done) => {  //instance：当前组件实例
          if (type == "cancel") {
            alert("请联系管理员");
            //清除定时器
            clearInterval(this.timer);
            this.timer = null;
            //关闭弹出框的方法
            done();
          } else {
            //判断是否真的支付了
            //开发人员：为了自己方便，这里判断先不要了
            // if (this.code == 200) {
            clearInterval(this.timer);
            this.timer = null;
            done();
            this.$router.push("/paysuccess");
            // }
          }
        },
      });
      //如果没有定时器，就开启一个定时器
      if (!this.timer) {
        this.timer = setInterval(async () => {
          //发请求获取用户支付状态
          let result = await this.$API.reqPayStatus(this.orderId);
          //如果支付成功
          if (result.code == 200) {
            // 清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 保存支付成功返回的code
            this.code = result.code;
            // 关闭弹出框
            this.$msgbox.close();
            // 跳转到下一路由
            this.$router.push("/paysuccess");
          }
        }, 1000);
      }
    }
  }
```

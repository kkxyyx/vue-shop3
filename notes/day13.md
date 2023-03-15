# 第十三天

## 个人中心模块

```js
{
        // name: 'Center' 不需要写
        path: '/center',
        component:  () => import('@/pages/Center'),
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/MyOrder')
            },
            {
                path: 'groupbuy',
                component: () => import('@/pages/Center/GroupOrder'),
            },
            //默认显示
            {
                path: '',
                redirect: 'myorder'
            }
        ]
    }
```

>二级路由一般在后台管理系统常用

问题：
用户已经登陆，用户在home页可以通过地址栏访问trade等页面，正常情况，用户只能通过在shopcart页面点击去结算按钮才可以到达trade页面。

解决办法：
**路由独享守卫**  

```js
    {
        name: 'Trade',
        path: '/trade',
        meta: {show:true},
        component:  () => import('@/pages/Trade'),
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path ===  '/shopcart' ){
                next()
            }else{
                next(false)
            }
        }
    }
```

### 路由懒加载

当用户访问的时候，加载对应组件进行展示

```js
// router.js
component: ()=> import('../pages/Detail')
```

### 图片懒加载

vue-lazyload:图片懒加载

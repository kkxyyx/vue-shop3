# 第十四天

## 表单验证

>官方提供vee-validate插件

### 准备工作

1. 安装vee-valadite
2. 在utils文件夹--创建validate.js ↓
3. 在入口文件引入 ↓

```js
// validate.js
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)
// 表单验证
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
         // 修改内置规则的 message
        is: (field) => `${field}必须与密码相同`
    },
     // 给校验的 field 属性名映射中文名称
    attributes: {
        phone: '手机号',
        code: '验证码',
        password:'密码',
        password1:'确认密码',
        isCheck:'协议'
}
})
```

```js
// main.js
import './utils/validate'
```

### 具体使用

HTML

```html
// XXX.vue 方式一
  <input 
  v-validate="'required|name'" 
  name="userName" type="text"  
  v-model="userName" />
 <span v-show="errors.has('userName')" class="text-style"> {{ errors.first('userName') }} </span>  
```

```html
// XXX.vue 方式二
<input
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
<span class="error-msg">{{ errors.first("phone") }}</span>
```

### 自定义校验规则

```js
// 用户昵称
Validator.extend('name', {
    messages: {
        zh_CN: field => '用户昵称不允许特殊符号'
    },
    validate: value => {
        return /^[\u4e00-\u9fa5A-Za-z0-9]*$/.test(value)
    }
})
```

```js
// 协议
VeeValidate.Validator.extend('agree', {
    validate: value => {
                return value
            },
    getMessage: field => field + '必须同意'
})
```

### 最后

```js
// register.vue
// 全部表单验证成功返回true
const success = await this.$validator.validateAll(); 
if(success){...}
```

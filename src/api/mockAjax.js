// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress';
// 引入进度条的样式
import 'nprogress/nprogress.css'
// 创建 axios 对象
const requests = axios.create({
    baseURL: '/mock', // 根路径
    timeout: 3000 // 网络延时
})

// 添加请求拦截器 => 前端给后端的参数
requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 进度条开始
    nProgress.start()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器 => 后端给前端的数据
requests.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    // 进度条结束
    nProgress.done()
    return res.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 最终返回的对象
export default requests

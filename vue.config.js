const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // true 则热更新，false 则手动刷新，默认值为 true
  // inline: true,
  // 在打包的时候不生成map格式文件
  // productionSourceMap: false
  devServer: {
    // 配置完要重启
    proxy: {
      "/api": {
        // 匹配所有以'/api' 开头的请求路径
        target: "http://gmall-h5-api.atguigu.cn", // 代理目标的基础路径
        // changeOrigin: true,
      },
    },
  },
});

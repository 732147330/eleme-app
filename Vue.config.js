const path = require('path');
const vuxLoader = require('vux-loader');

const isProduction = process.env.NODE_ENV === 'production';


function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  // 基本路径
  baseUrl: '/',
  // 输出文件目录
  outputDir: 'www',
  // 引用路径
  publicPath: './',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // assetsDir: "./",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // indexPath: './',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // webpack配置
  chainWebpack: (config) => {
    //配置别名
    config.resolve.alias
      .set('@$', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('common', resolve('./src/common'))
      .set('components', resolve('./src/components'))
      .set('layout', resolve('./src/layout'))
      .set('base', resolve('./src/base'))
      .set('static', resolve('./src/static'));

    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      // 如果要取消打包html代码压缩，则去vue依赖包 cli-service =》lib =》config =》 app.js设置
      // 如下设置
      // Object.assign(htmlOptions, {
      //   minify: {
      //     removeComments: true,    // 删除注释
      //     collapseWhitespace: false,   // 缩进
      //     removeAttributeQuotes: false, // 删除引用属性双引号或单引号
      //     collapseBooleanAttributes: true, //省略只有布尔型属性
      //     removeScriptTypeAttributes: true， //删除脚本类型属性
      //     // more options:
      //     // https://github.com/kangax/html-minifier#options-quick-reference
      //   }
      // })
    }

  },
  configureWebpack: () => {
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    compress: false, // 开启压缩
    proxy: null, // 设置代理
    before: app => {
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
  configureWebpack: config => {
    vuxLoader.merge(config, {
      options: {},
      plugins: ['vux-ui']
    })
  }
};

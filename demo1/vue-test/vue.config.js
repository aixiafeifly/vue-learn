const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

function resolve(dir) {
  return path.join(__dirname, dir)
}
const proxyTargetMap = {
  prod: 'https://xxx.xxx.com/',
  randy: 'http://192.168.33.104:9091', // 非正式
  peter: 'http://192.168.33.104:9092' // 非正式
}
let proxyTarget = proxyTargetMap[process.env.API_TYPE] || proxyTargetMap.prod
console.log(proxyTarget)
let publicPath = process.env.NODE_ENV === 'production' ? '/' : '/'

let dllPublishPath = '/vendor'
module.exports = {
  publicPath: publicPath,
  outputDir: 'dist',
  productionSourceMap: true,
  lintOnSave: false, //解决eslint
  css: {
    extract: true,
    sourceMap: false,
    modules: false
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    disableHostCheck: true, //处理host不识别问题
    open: process.platform === 'darwin',
    // host: '192.168.33.100',
    port: 9090,
    https: false,
    hotOnly: false,
    open: true,
    proxy: {
      '/api': {
        target: proxyTarget,
        //target: 'http://192.168.35.84:8086',
        // target: 'http://172.25.10.38:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },

    }
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);
    // 移除 prefetch 插件,解决组件懒加载失效的问题
    config.plugins.delete('prefetch');
    //修复 Lazy loading routes Error
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none';
      return args;
    });
    // 添加新的svg-sprite-loader处理svgIcon
    config.module
      .rule('svgIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        options = {
          symbolId: 'icon-[name]'
        }
        return options
      })
    // 原有的svg图像处理loader添加exclude
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    // 设置别名方便路径简写
    config.resolve.alias
      .set('$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.plugins.push(
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require('./public/vendor/vendor-manifest.json')
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
          // dll文件位置
          filepath: path.resolve(__dirname, './public/vendor/*.js'),
          // dll 引用路径
          publicPath: dllPublishPath,
          // dll最终输出的目录
          outputPath: './vendor'
        }),
        // 开启压缩
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240,
          minRatio: 0.8
        })
      )
      if (process.env.npm_lifecycle_event === 'analyze') {
        config.plugins.push(new BundleAnalyzerPlugin())
      }
    } else {
      // 为开发环境修改配置...
    }
  }
}

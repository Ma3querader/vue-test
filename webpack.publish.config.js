const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const extractTextPlugin = require("extract-text-webpack-plugin");
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  // mode: 'development', // 设置mode
  entry: {
    app: path.join(__dirname, './src/main.js'), // 自己代码的入口
    vendors: ['jquery'] // 要分离的第三方包的入口
  },
  output: { // 指定输出文件的存放路径
    path: path.join(__dirname, './dist'), // 路径
    filename: 'bundle.js' // 输出的文件名
  },

  plugins: [
    new htmlWebpackPlugin({ // 创建一个把HTML首页托管到内存中的插件
      template: path.join(__dirname, './src/index.html'), //  要把哪个HTML页面，作为模板，复制一份托管到内存中
      filename: 'index.html', // 指定，将来在内存中复制出来的页面，名称叫做 index.html
      minify: {// 压缩HTML代码
        collapseWhitespace: true, // 合并空白字符
        removeComments: true, // 移除注释
        removeAttributeQuotes: true // 移除属性上的引号
      }
    }),
    new cleanPlugin(['dist']), // 指定每次重新发布的时候，要先删除的文件夹
    new webpack.optimize.CommonsChunkPlugin({ // 抽离第三方包的插件
      name: 'vendors', // 指定要从哪个入口名称中抽离文件
      filename: 'js/vendors.js' // 指定抽离出来的第三方包，文件名叫做什么
    }),
    new webpack.optimize.UglifyJsPlugin({ // 优化压缩JS
      compress: {
        warnings: false // 移除警告
      }
    }),
    new extractTextPlugin('css/styles.css'), // 抽取CSS文件到单独的目录中
    new optimizeCSSAssetsPlugin() // 自动压缩CSS
  ],

  module: {
    rules: [ // 就是这些 非 JS 文件 和 loader 之间的对应关系
      {
        test: /\.css$/, use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"],
          publicPath: '../' // 设置图片路径
        })
      }, // 创建处理 css 文件的 loader 匹配规则
      {
        test: /\.jpg|png|gif|bmp$/, use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }, // 配置 处理 样式表中图片的 loader规则
      // 添加转换JS文件的loader，
      // 其中，必须把 node_modules 目录设置为 排除项，这样，在打包的时候，会忽略node_modules 目录下的所有JS文件；否则项目运行不起来！
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }

}
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // mode: 'development', // 设置mode
  entry: path.join(__dirname, './src/main.js'), // 指定要处理那个文件
  output: { // 指定输出文件的存放路径
    path: path.join(__dirname, './dist'), // 路径
    filename: 'bundle.js' // 输出的文件名
  },

  plugins: [
    new htmlWebpackPlugin({ // 创建一个把HTML首页托管到内存中的插件
      template: path.join(__dirname, './src/index.html'), //  要把哪个HTML页面，作为模板，复制一份托管到内存中
      filename: 'index.html' // 指定，将来在内存中复制出来的页面，名称叫做 index.html
    })
  ],

  module: {
    rules: [ // 就是这些 非 JS 文件 和 loader 之间的对应关系
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 创建处理 css 文件的 loader 匹配规则
      { test: /\.jpg|png|gif|bmp$/, use: 'url-loader' }, // 配置 处理 样式表中图片的 loader规则
      // 添加转换JS文件的loader，
      // 其中，必须把 node_modules 目录设置为 排除项，这样，在打包的时候，会忽略node_modules 目录下的所有JS文件；否则项目运行不起来！
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }

}
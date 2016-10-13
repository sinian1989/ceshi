var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
console.log(111)

module.exports = {
  devtool: 'source-map',
  debug:true,
  entry: [
    'webpack/hot/only-dev-server',
    './src/main.jsx'
  ],
  watch:true,
  output: {
    // path: process.cwd(),
    path: path.join(__dirname, 'dist'),
    // filename: 'main.js',
    // publicPath: '/'
    filename: "[name].js",
    publicPath: "dist/" ,//给require.ensure用
    chunkFilename: "[name].main.js" // 非主文件的命名规则，加缓存用到md5
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),//模块热替换 用在开发环境下
    new webpack.NoErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //   title : "vuex-tutorial",
    //   template: path.join(__dirname,'/src/index.html'),
    //   inject: true
    // }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    // new ExtractTextPlugin('[hash:8].style.css', { allChunks: true })
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  module: {
    // preLoaders: [
    //   // { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
    //   { test: /\.js$/, loader: "eslint", exclude: /node_modules/ }
    // ],
    loaders: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    // {
      //   test: /\.js$/,
      //   loader: 'babel',
      //   exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/
      // },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")
      },
    {
      test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap' )
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loaders: [
        'url?limit=10000&name=images/[hash:8].[name].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    },{
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
    }]
  },
  // vue: {
  //   loaders: {
  //     js: 'babel'
  //   }
  // },
  // externals: {
  //   'react': 'window.React'//Webpack 可以配置 externals 来将依赖的库指向全局变量，从而不再打包这个库，比如对于这样一个文件
  // },
  resolve: {
    root: path.resolve(__dirname, 'node_modules'),
    extensions: ['','.js','.vue','.scss','.jsx']
  }
}

// This will make the redux-simpler-router module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
// var src = path.join(__dirname, '..', '..', 'src')
// var fs = require('fs')
// if (fs.existsSync(src)) {
//   // Use the latest src
//   module.exports.resolve = { alias: { 'react-router-redux': src } }
//   module.exports.module.loaders.push({
//     test: /\.js$/,
//     loaders: ['babel'],
//     include: src
//   });
// }






// var webpack = require('webpack');
// var config = {
//     entry: './src/main.jsx',
//     //entry: ['webpack/hot/dev-server','webpack-dev-server/client?http://192.168.6.6:8006/htmlreact/','./main.js'],
//     output: {
//         path: './',
//         filename: 'index.js'
//     },
//     //devServer:{
//     //    inline:true,
//     //    port:8006
//     //},
//     resolve: {
//         extensions: ['', '.js', '.jsx']
//     },
//     watch: true,
//     module: {
//         loaders: [{
//             test: /\.js[x]?$/,
//             exclude: /node_modules/,
//             loader: 'babel',
//             query: {
//                 presets: ['es2015', 'react']
//             }
//         },
//             //    {
//             //    test: /\.css$/, // Only .css files
//             //    loader: 'style!css' // Run both loaders
//             //},
//             //    { test: /\.png||.jpg||.gif$/, loader: "url-loader?mimetype=image/png" }
//         ]
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             $: "jquery",
//             jQuery: "jquery",
//             "window.jQuery": "jquery"
//         }),
//     ]
// };
// module.exports = config;

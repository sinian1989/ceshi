var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(222)
module.exports = {
    entry: [
        './src/main.jsx'
    ],
    output: {
        // path: path.join(__dirname, 'dist'),
        // // filename: '[hash:8].[name].js'
        // filename: '[name].js'

        // path: process.cwd(),
        path: path.join(__dirname, 'dist'),
        // filename: 'main.js',
        // publicPath: '/'
        filename: "[name].js",
        publicPath: "dist/",//给require.ensure用
        chunkFilename: "[name].main.js" // 非主文件的命名规则，加缓存用到md5
    },
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            minimize: true
        }),
        //去重复
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            //filename:"common.js",
            minChunks: Infinity //Infinity
        }),
        // new ExtractTextPlugin('[hash:8].style.css', { allChunks: true }),
        new ExtractTextPlugin('style.css', {allChunks: true}),
        // new HtmlWebpackPlugin({
        //   title: "vuex-tutorial",
        //   template: path.join(__dirname,'src/index.html'),  //模板文件
        //   inject:'body',
        //   hash:false,    //为静态资源生成hash值
        //   minify:{    //压缩HTML文件
        //     removeComments:false,    //移除HTML中的注释
        //     collapseWhitespace:true    //删除空白符与换行符
        //   }
        // }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    module: {
        // preLoaders: [
        //   { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
        // ],
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
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
                    presets: ['es2015', 'react']
                }
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')},
            //{ test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap&includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib") ) },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'url?limit=10000&name=images/[hash:8].[name].[ext]',
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            }

        ]
    },
    resolve: {
        root: path.resolve(__dirname, 'node_modules'),
        extensions: ['', '.js', '.vue', '.scss', '.jsx']
    }
}


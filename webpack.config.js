var webpack = require('webpack');//引用webpack
var HtmlWebpackPlugin = require('html-webpack-plugin');//这个插件的作用是依据一个简单的模板，帮你生成最终的Html5文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');//分离CSS和JS文件

module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项

    entry: __dirname + "/app/main.js",//入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "[name]-[hash].js"//打包后输出文件的文件名
    },

    module: {
        loaders: [
            {
                test: /\.json$/,//一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
                loader: "json",//loader的名称（必须）
                //include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
                //query：为loaders提供额外的设置选项（可选）
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            }
        ]
    },

    //PostCSS来为CSS代码自动添加适应不同浏览器的CSS前缀
    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurenceOrderPlugin(),//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin(),//压缩JS代码
        new ExtractTextPlugin("[name]-[hash].css"),//分离CSS和JS文件
    ],

    devServer: {
        //contentBase: "./public",//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
        port:"8080",//设置默认监听端口，如果省略，默认为”8080“
        colors: true,//设置为true，使终端输出的文件为彩色的
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        hot: true,//热加载
    }
}
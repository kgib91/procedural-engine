const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "app.css"
});

module.exports = {
    entry: './index.js',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.css', '.less']
    },
    module: {
        rules: [
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: '/node_modules/',
                use: [{ loader: 'url-loader?limit=10000&minetype=application/font-woff' }]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: '/node_modules/',
                use: [{ loader: "file-loader" }]
            },
            {
                test: /\.css$/,
                include: "/node_modules/",
                use: extractLess.extract({
                    use: [{ loader: "style-loader" }],
                    fallback: "css-loader"
                })
            },
            {
                test: /\.(png|jpg)$/,
                exclude: '/node_modules/',
                use: [{ loader: 'url-loader?limit=8192' }]
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{ loader: "css-loader" }, { loader: "less-loader" }],
                    fallback: "style-loader"
                })
            }
        ],
        loaders: [

        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: './app.js',
        publicPath: '/public/'
    },
	plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            m: "mithril"
        }),
        /*
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: { warnings: false }
        }),
        */
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        extractLess
	]
}
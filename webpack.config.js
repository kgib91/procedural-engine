const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    module: {
        rules: [
            {
                test: /three\/examples\/js/,
                use: 'imports-loader?THREE=three'
            },

            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },

            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name].css`
        }),
        new webpack.ProvidePlugin({
            'THREE': 'three'
        })
    ],

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
          'three-examples': 'three/examples/js'
        }
    },

    watchOptions: {
        poll: 500,
        aggregateTimeout: 1000,
        ignored: "/node_modules/"
    }
};
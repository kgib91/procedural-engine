var webpack = require('webpack');

module.exports = {
    entry: "./code/index.tsx",
    output: {
        filename: "nodegraph.js",
        path: __dirname + "/build"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        alias: {
          three$: 'three/build/three.min.js',
          'three/.*$': 'three',
        },
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            // css
            {
              test: /\.s?css$/,
              use: [
                {
                  loader: "style-loader" // creates style nodes from JS strings
                },
                {
                  loader: "css-loader" // translates CSS into CommonJS
                },
                {
                  loader: "sass-loader" // compiles Sass to CSS
                }
              ]
            }
        ]
    },
    
    plugins: [
        new webpack.ProvidePlugin({
            THREE: 'three',
        }),
    ],

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
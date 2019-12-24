'use strict';
const resolve = require('resolve');
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require("webpack");


const config = {
  watch: true,
  mode: 'development',
  entry: { server:"./server/server.js"},
  output:{
    path: path.resolve(__dirname, 'build'),
    filename:'[name].js',
    publicPath: '/'
  },
  target: 'node',
  externals: [ nodeExternals() ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  
  module:{
    rules:[
      { 
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options:{
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
            "@babel/plugin-transform-spread"
          ],
          cacheDirectory: true,
        }
      },
      {
        test: /\.(css)$/,
        use: [
          { 
            loader: miniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          // "style-loader",
          'css-loader'
        ]
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(png||svg||jpg||gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins:[
    new miniCssExtractPlugin({
      filename: 'static/css/index.css',
      chunkFilename: '[id].css'
    })
  ]
}

// const compiler = webpack(config);
// const watcher = compiler.watch({}, function(err) {
//   console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
  
//   // Gets called every time Webpack finishes recompiling.
// });

module.exports = config
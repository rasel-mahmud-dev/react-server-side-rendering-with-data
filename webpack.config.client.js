'use strict';
const resolve = require('resolve');
const path = require("path");
const webpack = require("webpack");
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = process.env.HOST || "0.0.0.0"

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  entry: "./src/Client.js",
  devServer:{
    port:3000,
    open: false,
    // host: host,
    historyApiFallback: true,
    // for react router dom ........
    contentBase: 'public',
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    // publicPath: '/',
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.plugin` calls above.
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/,
    },
    compress: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:4001',
    //     secure: false
    //   }
    // }
  },

  output: {
    path: path.resolve(__dirname, "build"),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/',
    hotUpdateChunkFilename: 'static/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'static/[hash].hot-update.json',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  module: {
    rules: [
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

  plugins: [
    new miniCssExtractPlugin({
      filename: 'static/css/index.css',
      chunkFilename: '[id].css'
    }),
    // new HtmlWebpackPlugin({
    //   filename: "index.html",
    //   template: 'public/index.html'
    // }),
  ]
};

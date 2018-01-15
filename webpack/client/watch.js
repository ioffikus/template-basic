const { resolve, join } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonRules = require('./../rules');
const commonResolve = require('./../resolve');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8050',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './../../../src/client/index.tsx',
    // the entry point of our app
  ],

  resolve: commonResolve,

  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist', 'client', 'assets'),

    publicPath: 'http://localhost:8050/assets/',
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'src'),

  devtool: 'source-map',

  devServer: {
    disableHostCheck: true,

    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist', 'client', 'assets'),
    // match the output path

    publicPath: '/assets',
    // match the output `publicPath`

    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    port: 8050,
  },

  module: {
    rules: [commonRules.ts, commonRules.json, commonRules.less, commonRules.url, commonRules.svg],
  },

  plugins: [
    new CleanWebpackPlugin(['client'], {
      root: join(__dirname, '..', '..', 'dist'),
      verbose: true,
      dry: false,
      watch: false,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),

        REACT_API_PATH: JSON.stringify(process.env.REACT_API_PATH),

        STATIC_PROTOCOL: JSON.stringify(process.env.STATIC_PROTOCOL),
        STATIC_HOST: JSON.stringify(process.env.STATIC_HOST),
        STATIC_PORT: JSON.stringify(process.env.STATIC_PORT),
      },
    }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new ExtractTextPlugin('styles.css'),
  ],
};

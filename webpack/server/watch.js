const _ = require('lodash');
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./config');

config.entry.push('webpack/hot/poll?1000');

const watchConfig = _.mergeWith(
  config,
  {
    devtool: 'eval',
    cache: false,
    watch: true,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),

      new webpack.DefinePlugin({
        'process.env': {
          BROWSER: JSON.stringify(false),
          NODE_ENV: JSON.stringify('development'),
          LOG_LEVEL: JSON.stringify('debug'),
        },
      }),
    ],
    output: {
      publicPath: 'http://localhost:8050/assets/',
    },
  },
  (objValue, srcValue) => {
    // eslint-disable-line consistent-return
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  },
);

module.exports = watchConfig;

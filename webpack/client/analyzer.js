const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const _ = require('lodash');
const config = require('./config');

module.exports = _.mergeWith(
  config,
  {
    cache: true,
    devtool: 'eval',
    output: {
      filename: 'client.js',
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerPort: 9999,
      }),
    ],
  },
  (objValue, srcValue) => {
    // eslint-disable-line consistent-return
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  },
);

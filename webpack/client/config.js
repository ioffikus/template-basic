const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonRules = require('./../rules');
const commonPlugins = require('./../plugins');
const commonResolve = require('./../resolve');

const appPath = path.join(__dirname, '..', '..');

const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new CleanWebpackPlugin(['client'], {
    root: path.join(__dirname, '..', '..', 'dist'),
    verbose: true,
    dry: false,
    watch: false,
  }),

  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),

      REACT_API_PATH: JSON.stringify(process.env.REACT_API_PATH),

      SENTRY_KEY_REACT: JSON.stringify(process.env.SENTRY_KEY_REACT),
      SENTRY_PROJECT_ID: JSON.stringify(process.env.SENTRY_PROJECT_ID),

      STATIC_PROTOCOL: JSON.stringify(process.env.STATIC_PROTOCOL),
      STATIC_HOST: JSON.stringify(process.env.STATIC_HOST),
      STATIC_PORT: JSON.stringify(process.env.STATIC_PORT),

      CIRCLE_BUILD_NUM: undefined,
    },
  }),

  commonPlugins.stats,
];

const rules = [commonRules.ts, commonRules.less, commonRules.fonts, commonRules.url, commonRules.svg];

if (!devMode) {
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
    }),
  );

  plugins.push(commonPlugins.uglify);

  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());

  plugins.push(new webpack.optimize.AggressiveMergingPlugin());

  plugins.push(commonPlugins.compression);
}

plugins.push(
  new webpack.LoaderOptionsPlugin({
    debug: true,
  }),
);

plugins.push(new webpack.NamedModulesPlugin());

plugins.push(new ExtractTextPlugin('styles.css'));

module.exports = {
  target: 'web',
  devtool: devMode ? 'source-map' : false,
  cache: false,
  context: __dirname,
  stats: {
    colors: true,
    hasErrors: true,
    hasWarnings: true,
    reasons: true,
    errorDetails: true,
  },
  resolve: commonResolve,
  entry: [path.resolve(path.join(appPath, 'src', 'client', 'index.tsx'))],
  module: {
    rules,
    noParse: /\.min\.js/,
  },
  plugins,
  output: {
    path: path.resolve(path.join(appPath, 'dist', 'client', 'assets')),
    filename: 'bundle.js',
  },
  node: {
    __dirname: true,
    fs: 'empty',
  },
};

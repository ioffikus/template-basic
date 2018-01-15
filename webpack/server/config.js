const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonPlugins = require('./../plugins');
const commonRules = require('./../rules');
const commonResolve = require('./../resolve');

const devMode = process.env.NODE_ENV !== 'production';

const nodeModules = {};

const serverUrlRule = Object.assign(commonRules.url);
serverUrlRule.options.emitFile = false;

fs
  .readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const plugins = [
  new CleanWebpackPlugin(['server'], {
    root: path.join(__dirname, '..', '..', 'dist'),
    verbose: true,
    dry: false,
    watch: false,
  }),

  new webpack.EnvironmentPlugin({
    BROWSER: false,
    CIRCLE_BUILD_NUM: null,
  }),
];

if (!devMode) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  );

  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  );

  plugins.push(commonPlugins.uglify);
}

plugins.push(
  new webpack.LoaderOptionsPlugin({
    debug: true,
  }),
);

plugins.push(new webpack.NamedModulesPlugin());

module.exports = {
  target: 'node',
  cache: false,
  context: __dirname,

  devtool: 'source-map',
  entry: ['babel-polyfill', path.resolve(path.join(__dirname, '..', '..', 'src', 'server'))],

  externals: nodeModules,

  stats: {
    colors: true,
    hasErrors: true,
    hasWarnings: true,
    reasons: true,
    errorDetails: true,
  },

  resolve: commonResolve,

  module: {
    rules: devMode
      ? [commonRules.ts, commonRules.json, serverUrlRule, commonRules.yml, commonRules.svg]
      : [commonRules.ts, commonRules.json, serverUrlRule, commonRules.svg],
    noParse: /\.min\.js/,
  },
  plugins,
  output: {
    path: path.resolve(path.join(__dirname, '..', '..', 'dist', 'server')),
    filename: 'server.js',
  },
  node: {
    __dirname: true,
    fs: 'empty',
  },
};

const CompressionPlugin = require('compression-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const webpack = require('webpack');

module.exports = {
  compression: new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),

  uglify: new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      sequences: true,
      booleans: true,
      loops: true,
      unused: true,
      warnings: false,
      drop_console: false,
      unsafe: true,
    },
  }),

  // Write out stats file to build directory.
  stats: new StatsWriterPlugin({
    filename: 'stats.json',
    transform: data =>
      JSON.stringify(
        {
          main: data.assetsByChunkName.main[0],
          css: data.assetsByChunkName.main[1],
        },
        null,
        2,
      ),
  }),
};

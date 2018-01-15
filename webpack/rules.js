const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  ts: {
    test: /\.(tsx|ts)?$/,
    use: {
      loader: 'awesome-typescript-loader',
    },
    exclude: [/node_modules/, /dist/],
  },

  fonts: {
    test: /\.(woff|woff2|ttf|eot)/,
    loader: 'file-loader',
    options: {
      name: 'fonts/[hash].[ext]',
    },
  },

  json: {
    test: /\.json$/,
    use: {
      loader: 'json-loader',
    },
  },

  yml: {
    test: /\.yml$/,
    use: {
      loader: 'yml-loader',
    },
  },

  less: {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              require('autoprefixer')({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
        'less-loader',
      ],
    }),
  },

  js: {
    test: /\.(jsx|js)?$/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
    exclude: [/node_modules/, /dist/],
  },

  url: {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve('url-loader'),
    options: {
      limit: 10000,
      name: 'static/media/[name].[hash:8].[ext]',
    },
  },
  svg: {
    test: /\.svg$/,
    loader: 'svg-inline-loader',
  },
};

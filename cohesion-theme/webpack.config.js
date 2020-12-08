const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');


const env = process.env.NODE_ENV;
const isProduction = (env === 'production');

const plugins = [
  
  // new CleanWebpackPlugin(),
  new FriendlyErrorsWebpackPlugin({clearConsole: false}),
  new WebpackNotifierPlugin({alwaysNotify: true}),
  // new FileManagerPlugin({
  //   events: {
  //     onEnd: {
  //       move: [
  //         { source: '/path/from', destination: '/path/to' },
  //         { source: '/path/fromfile.txt', destination: '/path/tofile.txt' },
  //       ],
  //     },
  //   },
  //   runTasksInSeries: false,
  // })
];

// Configure source map for components file.

const glob = require('glob');

const entry = {};

glob
  .sync('./src/features/*')
  .map(file => {
    return path.basename(file, path.extname(file));
  })
  .forEach(feature => {
    entry[`${feature}/bundle`] = [`./src/features/${feature}/`];
  });

const PATH_SRC = path.resolve(__dirname, 'src');
const PATH_DIST = path.resolve(__dirname, 'components')

module.exports = {
  mode: env,
  watch: false,
  entry: entry,
  output: {
    filename: '[name].js',
    path: PATH_DIST,
  },
  externals: {
    jquery: 'jQuery',
    Drupal: 'Drupal',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        include: PATH_SRC,
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      '~': path.resolve(__dirname, 'src'),
    }
  },
  plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "./../dist/vendor",
          chunks: "initial",
        },
      },
    },
  },
};

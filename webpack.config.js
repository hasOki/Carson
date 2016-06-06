var path = require('path');
var webpack = require('webpack');
var CONFIG = require('./server/config');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'scripts.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['', '.js', '.jsx', '.css', '.json'],
    alias: {
      'styles.css': path.join(__dirname, 'tmp/cssInJS.css'),
      'require-json': 'require-json/index.js',
      'json-loader': 'json-loader/index.js',
      AbstractComponent: 'components/base/AbstractComponent',
      ContainerComponent: 'components/base/ContainerComponent',
    },
  },
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.js|jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules'),
  },
};

const webpack = require('webpack');
const path = require('path');

const BUILD_PATH = path.resolve(__dirname, 'src/www');
const NODE_PATH = path.resolve(__dirname, 'node_modules');

const config = {
  // Entry points to the project
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.jsx'),
  ],
  output: {
    path: BUILD_PATH,
    filename: 'app.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    contentBase: 'src/www',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 8000,
    host: 'localhost',
  },
  devtool: 'eval',
  plugins: [
        // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
        // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        // hot reload and babel parsing for all js(x) files
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: [NODE_PATH],
      },
      {
        // hot reload and babel parsing for all js(x) files
        test: /\.jsx?$/,
        exclude: [NODE_PATH],
        loaders: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};

module.exports = config;

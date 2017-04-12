const webpack = require('webpack');
const path = require('path');

const BUILD_PATH = path.resolve(__dirname, 'src/www');
const NODE_PATH = path.resolve(__dirname, 'node_modules');

const config = {
  // Entry points to the project
  entry: [
    path.join(__dirname, '/src/app/app.jsx'),
  ],
  output: {
    path: BUILD_PATH,
    filename: 'app.js',
  },
  devtool: 'source-map',
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        // babel parsing for all js(x) files
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: [NODE_PATH],
      },
    ],
  },
};

module.exports = config;

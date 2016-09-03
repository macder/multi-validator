const webpack = require('webpack');

module.exports = {

  entry: './scripts/main.es6.js',
  output: {
    path: './dist',
    filename: 'main.js',
  },
 
  module: {
    /* preLoaders: [{
      test: /\.es6.js$/, 
      loader: "eslint-loader", 
      exclude: /node_modules/
    }],*/
    loaders: [{
      test: /\.es6.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },

  plugins: [
    /* new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),*/
  ],

  watch: true,

  watchOptions: {
    aggregateTimeout: 500,
    poll: true,
  },

  keepalive: true, // don't finish the grunt task
  // Use this in combination with the watch option
};
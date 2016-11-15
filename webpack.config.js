const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'example'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'index.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
};

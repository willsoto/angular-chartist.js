module.exports = {
  context: `${__dirname}/example`,
  entry: './index.js',
  output: {
    path: `${__dirname}/example`,
    filename: 'index.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
};

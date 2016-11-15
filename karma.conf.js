var path = require('path');

module.exports = function(config) {
  var options = {
    files: [
      'test/index.spec.js'
    ],

    preprocessors: {
      'test/index.spec.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }, {
          test: /\.js$/,
          include: path.resolve('src/'),
          loader: 'isparta-loader'
        }]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: [
      'spec',
      'coverage'
    ],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.'
    },

    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],
    customLaunchers: {
      ChromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    frameworks: ['mocha', 'chai'],

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-coverage',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-spec-reporter'
    ],

    captureTimeout: 60000,

    autoWatch: false,
    singleRun: true,

    // tests on Travis were timing out
    browserDisconnectTimeout: 60000,
    browserNoActivityTimeout: 60000
  };

  if (process.env.TRAVIS) {
    options.browsers = ['ChromeTravisCI'];
  }

  config.set(options);
};

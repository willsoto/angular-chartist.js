const path = require('path');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  const options = {
    files: ['test/index.spec.js'],

    preprocessors: {
      'test/index.spec.js': ['webpack']
    },

    webpack: {
      mode: 'production',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
          },
          {
            test: /\.js$/,
            include: path.resolve('src/'),
            loaders: ['istanbul-instrumenter-loader']
          }
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['spec', 'coverage'],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.'
    },

    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['ChromeHeadless'],

    frameworks: ['mocha', 'chai'],

    captureTimeout: 60000,

    autoWatch: false,
    singleRun: true,

    // tests on Travis were timing out
    browserDisconnectTimeout: 60000,
    browserNoActivityTimeout: 60000
  };

  config.set(options);
};

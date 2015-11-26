module.exports = function(config) {
    'use strict';

    config.set({
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/jquery/dist/jquery.js',
            './node_modules/chartist/dist/chartist.js',
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',
            'src/*.js',
            'spec/*.js'
        ],

        reporters: ['progress'],

        port: 9876,
        colors: true,

        logLevel: config.LOG_INFO,

        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],

        captureTimeout: 60000,

        autoWatch: false,
        singleRun: true,

        preprocessors: {
            'src/*.js': ['babel']
        }
    });
};

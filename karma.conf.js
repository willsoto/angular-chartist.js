module.exports = function(config) {
    'use strict';

    config.set({
        files: [
            'example/bower_components/jquery/dist/jquery.js',
            'example/bower_components/chartist/dist/chartist.js',
            'example/bower_components/angular/angular.js',
            'example/bower_components/angular-mocks/angular-mocks.js',
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

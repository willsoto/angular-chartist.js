module.exports = function(config) {
    'use strict';

    config.set({
        basePath: '',
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/chartist/dist/chartist.js',
            'src/ng-chartist.js',
            'test/angular-chartist.spec.js'
        ],

        reporters: ['progress'],

        port: 9876,
        colors: true,

        logLevel: config.LOG_INFO,

        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],

        captureTimeout: 60000,

        autoWatch: true,
        singleRun: false
    });
};

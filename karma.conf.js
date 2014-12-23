module.exports = function(config) {
    'use strict';

    config.set({
        basePath: '',
        files: [
            'example/bower_components/angular/angular.js',
            'example/bower_components/angular-mocks/angular-mocks.js',
            'example/bower_components/chartist/dist/chartist.js',
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

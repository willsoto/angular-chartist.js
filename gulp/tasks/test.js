import config from '../config';

import gulp from 'gulp';

import {Server} from 'karma';

gulp.task('test:once', function() {
    let server = new Server({
        configFile: config.test.karma
    });

    server.start();
});

gulp.task('test:watch', function() {
    let server = new Server({
        configFile: config.test.karma,
        singleRun: false,
        autoWatch: true
    });

    server.start();
});

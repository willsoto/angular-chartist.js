import config from '../config';

import gulp from 'gulp';

import {create} from 'browser-sync';

const browserSync = create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.example
        },
        port: 8080,
        notify: false
    });
});

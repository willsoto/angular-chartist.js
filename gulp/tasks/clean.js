import config from '../config';

import del from 'del';

import gulp from 'gulp';

gulp.task('clean', function() {
    return del([config.dist, `${config.example}/lib`]);
});

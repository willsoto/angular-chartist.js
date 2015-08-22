import config from '../config';

import gulp from 'gulp';

gulp.task('watch', function() {
    gulp.watch([config.source + '/*.js'], ['scripts']);
});

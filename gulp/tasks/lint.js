import config from '../config';

import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint', function() {
    return gulp.src(config.source + '/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

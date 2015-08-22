import gulp from 'gulp';

gulp.task('default', [
    'scripts',
    'serve',
    'watch'
]);

gulp.task('pre-push', [
    'lint',
    'test:once'
]);

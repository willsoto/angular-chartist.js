import config from '../config';

import gulp from 'gulp';

import babel from 'gulp-babel';
import wrap from 'gulp-wrap-umd';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

gulp.task('scripts', function() {
    return gulp.src(config.source + '/*.js')
        .pipe(babel())
        .pipe(wrap({
            exports: 'angularChartist',
            namespace: 'angularChartist',
            deps: [{
                name: 'angular',
                paramName: 'angular',
                globalName: 'angular'
            }, {
                name: 'chartist',
                paramName: 'Chartist',
                globalName: 'Chartist'
            }]
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(gulp.dest(config.example + '/lib'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(gulp.dest(config.example + '/lib'));
});

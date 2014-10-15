'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var tagVersion = require('gulp-tag-version');
var wrap = require('gulp-wrap-umd');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = {
    source: 'src',
    dist: 'dist',
    example: 'example',
    server: {
        port: 3000,
        url: 'http://localhost:'
    }
};

var release = function(importance) {
    gulp.src(['./bower.json', './package.json'])
        .pipe($.bump({
            type: importance
        }))
        .pipe(gulp.dest('./'))
        .pipe($.git.commit('bumps package version'))
        .pipe($.filter('bower.json'))
        .pipe(tagVersion());
};

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './example'
        }
    });
});

gulp.task('clean', function(cb) {
    require('del')([config.dist, config.example + '/lib'], {
      force: true
    }, cb);
});

gulp.task('jshint', function() {
    return gulp.src(config.source + '/*.js')
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('serve', ['browser-sync'], function() {
    gulp.watch(config.source + '/*.js', [
        'js',
        browserSync.reload
    ]);
});

gulp.task('js', ['jshint', 'clean'], function() {
    return gulp.src(config.source + '/*.js')
        .pipe(wrap({
            exports: 'ngChartist',
            namespace: 'ngChartist',
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
        .pipe($.beautify())
        .pipe(gulp.dest(config.dist))
        .pipe(gulp.dest(config.example + '/lib'))
        .pipe($.uglify())
        .pipe($.rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(gulp.dest(config.example + '/lib'));
});

gulp.task('default', [
    'dist',
    'serve'
]);

gulp.task('dist', [
    'js'
]);

gulp.task('patch', ['dist'], function() {
    return release('patch');
});

gulp.task('feature', ['dist'], function() {
    return release('minor');
});

gulp.task('release', ['dist'], function() {
    return release('major');
});

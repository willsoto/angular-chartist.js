'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var tagVersion = require('gulp-tag-version');
var wrap = require('gulp-wrap-umd');

var config = {
    source: 'src',
    dist: 'dist',
    example: 'example',
    server: {
        port: 8000,
        url: 'http://localhost:'
    }
};

gulp.task('jshint', function() {
    gulp.src(config.source + '/*.js')
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function(cb) {
    require('del')([config.dist, config.example + '/lib'], {
      force: true
    }, cb);
});

gulp.task('uglify', ['jshint', 'clean'], function() {
    gulp.src(config.source + '/*.js')
        .pipe(wrap({
            exports: 'ngChartist',
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

gulp.task('connect', function() {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var app = connect()
        .use(serveStatic(config.example));

    require('http').createServer(app)
        .listen(config.server.port)
        .on('listening', function() {
            console.log('Started connect web server on ' + config.server.url + config.server.port);
        });
});

gulp.task('open', function() {
    var url = config.server.url + config.server.port;

    require('opn')(url);
});

gulp.task('watch', function() {
    $.watch(config.source + '/*.js', function(files, cb) {
        gulp.start('dist', cb);
    });
});

gulp.task('default', [
    'dist',
    'connect',
    'open',
    'watch'
]);

gulp.task('dist', [
    'uglify'
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

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

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
    return gulp.src(config.source + '/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('clean', del.bind(null, [config.dist]));

gulp.task('uglify', function() {
    gulp.src(config.source + '/*.js')
        .pipe(gulp.dest(config.dist))
        .pipe($.uglify())
        .pipe($.rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('bump', function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe($.bump({
            type: 'patch'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('connect', function() {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var app = connect()
        .use(serveStatic(config.example));
    // .use(connect.directory(config.appDir));

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

gulp.task('copyDist', function() {
    gulp.src(config.dist + '/*.js')
        .pipe(gulp.dest(config.example + '/src/'));
});

gulp.task('example', [
    'copyDist',
    'connect',
    'open'
]);

gulp.task('release', [
    'jshint',
    'clean',
    'uglify'
    // 'bump'
]);

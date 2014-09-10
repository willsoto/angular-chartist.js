'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var tagVersion = require('gulp-tag-version');

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
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('clean', del.bind(null, [config.dist, config.example + '/lib']));

gulp.task('uglify', function() {
    gulp.src(config.source + '/*.js')
        .pipe(gulp.dest(config.dist))
        .pipe(gulp.dest(config.example + '/lib'))
        .pipe($.uglify())
        .pipe($.rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(gulp.dest(config.example + '/lib'));
});

gulp.task('bump', function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe($.bump({
            type: 'patch'
        }))
        .pipe(gulp.dest('./'));
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

gulp.task('default', [
    'connect',
    'open'
]);

gulp.task('dist', [
    'jshint',
    'clean',
    'uglify'
]);

gulp.task('patch', function() {
    return release('patch');
});

gulp.task('feature', function() {
    return release('minor');
});

gulp.task('release', function() {
    return release('major');
});

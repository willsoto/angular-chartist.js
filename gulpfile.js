'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var tagVersion = require('gulp-tag-version');
var wrap = require('gulp-wrap-umd');
var babel = require('gulp-babel');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var fs = require('fs');
var changelog = require('conventional-changelog');

// testing
var karma = require('karma').server;

var config = {
    source: 'src',
    dist: 'dist',
    example: 'example'
};

var release = function(importance) {
    gulp.src(['./bower.json', './package.json'])
        .pipe($.bump({
            type: importance
        }))
        .pipe(gulp.dest('./'))
        .pipe($.git.commit('chore: bumps package version'))
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

gulp.task('changelog', function(done) {
    function changeParsed(err, log) {
        if (err) {
            return done(err);
        }
        fs.writeFile('CHANGELOG.md', log, done);
    }
    fs.readFile('./package.json', 'utf8', function(err, data) {
        var ref$ = JSON.parse(data);
        var repository = ref$.repository;
        var version = ref$.version;

        changelog({
            repository: repository.url,
            version: version
        }, changeParsed);
    });
});

gulp.task('clean', function(cb) {
    require('del')([config.dist, config.example + '/lib'], {
        force: true
    }, cb);
});

gulp.task('enforce', function() {
    var fs = require('fs');
    var validateCommit = '.git/hooks/commit-msg';

    if (!fs.existsSync(validateCommit)) {
        // copy the file over
        fs.createReadStream('./validate-commit-msg.js')
        .pipe(fs.createWriteStream(validateCommit));
        // make it executable
        fs.chmodSync(validateCommit, '0755');
    }
});

gulp.task('jshint', function() {
    return gulp.src(config.source + '/*.js')
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('serve', ['browser-sync'], function() {
    gulp.watch(config.source + '/*.js', [
        'js:build',
        browserSync.reload
    ]);
});

gulp.task('js:build', ['jshint', 'clean', 'test'], function() {
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

gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task('default', [
    'js:build',
    'serve'
]);

gulp.task('dist', [
    'js:build'
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

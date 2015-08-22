/**
 * Import node modules
 */
import fs from 'fs';
import {resolve} from 'path';
import del from 'del';

/**
 * Import all gulp plugins
 */
import gulp from 'gulp';

import babel from 'gulp-babel';
import bump from 'gulp-bump';
import eslint from 'gulp-eslint';
import filter from 'gulp-filter';
import git from 'gulp-git';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import tag from 'gulp-tag-version';
import uglify from 'gulp-uglify';
import wrap from 'gulp-wrap-umd';
import changelog from 'gulp-conventional-changelog';

/**
 * Import misc
 */
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import {Server} from 'karma';

/**
 * Common config options
 */
var config = {
    source: './src',
    dist: './dist',
    example: './example',
    importance: 'patch',
    test: {
        karma: resolve('.') + '/karma.conf.js'
    }
};

function getImportance() {
    return config.importance;
}

function release() {
    runSequence(
        'test',
        'scripts',
        'bump',
        'changelog',
        'commit-release'
    );
}

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: config.example
        }
    });
});

gulp.task('bump', function() {
    return gulp.src([
            './bower.json',
            './package.json'
        ])
        .pipe(bump({
            type: getImportance()
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('changelog', function() {
    return gulp.src('CHANGELOG.md', {
            buffer: false
        })
        .pipe(changelog({
            preset: 'angular'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function(cb) {
    del([config.dist, config.example + '/lib'], {
        force: true
    }, cb);
});

gulp.task('commit-release', function() {
    return gulp.src([
            './bower.json',
            './package.json',
            './CHANGELOG.md',
            config.dist
        ])
        .pipe(git.add({
            args: '-f -A'
        }))
        .pipe(git.commit('chore(release): New ' + getImportance() + ' release'))
        .pipe(filter('package.json'))
        .pipe(tag());
});

gulp.task('lint', function() {
    return gulp.src(config.source + '/*.js')
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('serve', ['browser-sync'], function() {
    gulp.watch(config.source + '/*.js', [
        'scripts',
        browserSync.reload
    ]);
});

gulp.task('scripts', ['lint', 'clean'], function() {
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


gulp.task('test', function() {
    let server = new Server({
        configFile: config.test.karma
    });

    server.start();
});

gulp.task('default', [
    'scripts',
    'serve'
]);

gulp.task('build', [
    'test',
    'scripts'
]);

gulp.task('release:patch', function() {
    return release();
});

gulp.task('release:minor', function() {
    config.importance = 'minor';

    return release();
});

gulp.task('release:major', function() {
    config.importance = 'major';

    return release();
});

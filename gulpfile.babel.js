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
import jscs from 'gulp-jscs';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import tagVersion from 'gulp-tag-version';
import uglify from 'gulp-uglify';
import wrap from 'gulp-wrap-umd';

/**
 * Import misc
 */
import browserSync from 'browser-sync';
import changelog from 'conventional-changelog';

import {server} from 'karma';

/**
 * Common config options
 */
var config = {
    source: 'src',
    dist: 'dist',
    example: 'example'
};

var release = function(importance) {
    return gulp.src([
            './bower.json',
            './package.json'
        ])
        .pipe(bump({
            type: importance
        }))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('chore: prepare release'))
        .pipe(filter('bower.json'))
        .pipe(tagVersion());
};

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: config.example
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
        if (err) {
            return done(err);
        }

        let ref = JSON.parse(data);
        let {repository, version} = ref;

        changelog({
            repository: repository.url,
            version: version
        }, changeParsed);
    });
});

gulp.task('clean', function(cb) {
    del([config.dist, config.example + '/lib'], {
        force: true
    }, cb);
});

gulp.task('enforce', function() {
    let validateCommit = '.git/hooks/commit-msg';

    if (!fs.existsSync(validateCommit)) {
        // copy the file over
        fs.createReadStream('./validate-commit-msg.js')
        .pipe(fs.createWriteStream(validateCommit));
        // make it executable
        fs.chmodSync(validateCommit, '0755');
    }
});

gulp.task('lint', function() {
    return gulp.src(config.source + '/*.js')
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(jscs());
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

gulp.task('test', function(done) {
    let karmaConfigPath = resolve('.') + '/karma.conf.js';

    server.start({
        configFile: karmaConfigPath
    }, done);
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
    return release('patch');
});

gulp.task('release:minor', function() {
    return release('minor');
});

gulp.task('release:major', function() {
    return release('major');
});

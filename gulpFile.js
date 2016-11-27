var gulp = require('gulp'),
    del = require("del"),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    preservetime = require('gulp-preservetime'),
    tsc = require('gulp-typescript'),
    Builder = require('systemjs-builder'),
    tscConfig = require('./tsconfig.json'),
    inlineNg2Template = require('gulp-inline-ng2-template');

gulp.task('bundle', ['copy', 'bundle-app', 'bundle-dependencies'], function() {});

gulp.task('inline-templates', function() {
    return gulp.src(['app/**/*.ts', '!app/**/*.spec.ts'])
        .pipe(inlineNg2Template({
            useRelativePaths: true,
            indent: 0,
            removeLineBreaks: true
        }))
        .pipe(tsc(tscConfig.compilerOptions))
        .pipe(gulp.dest('dist/app'));
});

gulp.task('bundle-app', ['inline-templates'], function() {
    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder('', 'dist-systemjs.config.js');

    return builder
        .bundle(`dist/app/**/* - [@angular/**/*.js] - [rxjs/**/*.js]
        - [angular2-highcharts/**/*.js] - [highcharts/**/*.js]
        - [ng2-bootstrap/**/*.js] - [moment/**/*.js]`,
            'build/bundles/app.bundle.js', {
                minify: true,
                sourceMaps: true
            })
        .then(function() {
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('bundle-dependencies', ['inline-templates'], function() {
    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder('', 'dist-systemjs.config.js');

    return builder
        .bundle('dist/app/**/*.js - [dist/app/**/*.js]', 'build/bundles/dependencies.bundle.js', {
            minify: true,
            sourceMaps: true
        })
        .then(function() {
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('copy', ['clean', 'copy-app', 'copy-db', 'copy-index', 'copy-config', 'copy-node', 'copy-data', 'copy-assets'], function() {});

gulp.task('copy-app', function() {
    return gulp.src(['app/**/*.php', 'app/settings.json', '!app/forbidden/**'])
        .pipe(gulp.dest('build/app'));
});
gulp.task('copy-assets', function() {
    return gulp.src(['assets/**/*'])
        .pipe(gulp.dest('build/assets'));
});
gulp.task('copy-data', function() {
    return gulp.src(['data/**/*'])
        .pipe(gulp.dest('build/data'))
        .pipe(preservetime());
});

gulp.task('copy-node', function() {
    return gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js'
        ])
        .pipe(concat('pollyfills.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/bundles'));
});

gulp.task('copy-index', function() {
    return gulp.src('index_prod.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('copy-db', function() {
    return gulp.src('app/forbidden/b_rw_details_ONLINE.php')
        .pipe(rename('b_rw_details.php'))
        .pipe(gulp.dest('build/app/forbidden'));
});

gulp.task('copy-config', function() {
    return gulp.src(['dist-systemjs.config.js', '.htaccess'])
        .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
    return del.sync('build/**');
});

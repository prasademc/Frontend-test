'use strict';
/*
// Required
*/
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

/*
// Task
*/
    gulp.task('appjs', function () {
    return gulp.src('app/scripts/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('vendor', function () {
    return gulp.src('app/vendor/*.js')
        .pipe(gulp.dest('public/vendor'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    return gulp.src('app/sass/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(concat('default.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src('app/assets/*')
        .pipe(gulp.dest('public/assets'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "public"
        }
    });
});
/*
// Watch Task
*/
gulp.task('watch', function() {
    gulp.watch('app/scripts/*.js', ['appjs']);
    gulp.watch('app/scripts/vendor/*.js', ['vendor']);
    gulp.watch('app/sass/*.scss', ['sass']);
    gulp.watch('app/assets/images/*', ['images']);
    gulp.watch('app/index.html', ['html']);
});

/*
// Default Task
*/
gulp.task('default', gulp.series(['vendor', 'appjs', 'sass', 'images', 'html', 'browser-sync', 'watch']));
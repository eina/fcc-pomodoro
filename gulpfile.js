var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-cssnano');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('styles', function(){
    gulp.src(['./assets/styles/**/*.scss', '!assets/styles/**/*.min.css'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
    return gulp.src(['./assets/scripts/**/*.js', '!assets/scripts/**/*.min.js'])
        // .pipe(plumber({
        //     errorHandler: function (error) {
        //         console.log(error.message);
        //         this.emit('end');
        //     }}))
        // .pipe(concat('main.js'))
        // .pipe(gulp.dest('assets/scripts'))
        // .pipe(rename({suffix: '.min'}))
        // .pipe(uglify())
        // .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({stream:true}))
});


gulp.task('default', ['browser-sync'], function(){
    gulp.watch("./assets/styles/**/*.scss", ['styles']);
    gulp.watch("./assets/scripts/**/*.js", ['scripts']);
    gulp.watch("./*.html", ['bs-reload']);
});
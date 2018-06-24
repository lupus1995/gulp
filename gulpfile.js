var gulp = require("gulp");
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();


//scss

gulp.task('sass', function () {
  return gulp.src(['app/sass/**/*.scss', 'app/sass/**/*.sass'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});


//browser sync
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "app"
    });

    gulp.watch("app/sass/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
});


//fonts
var ttf2woff = require('gulp-ttf2woff');
var ttf2eot = require('gulp-ttf2eot');
var ttf2woff2 = require('gulp-ttf2woff2');
 
gulp.task('fonts', function(){
  gulp.src(['app/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('app/fonts/'));

  gulp.src(['app/fonts/*.ttf'])
    .pipe(ttf2eot())
    .pipe(gulp.dest('app/fonts/'));

  gulp.src(['app/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('app/fonts/'));

  gulp.src(['app/fonts/*.*']).
    pipe(gulp.dest("dist/fonts"));
})



//production
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('production', function () {
    gulp.src('app/css/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));


        gulp.src('app/js/**/*.js')
        .pipe(uglify()).
        pipe(gulp.dest('dist/js'))
    
});







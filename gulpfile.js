"use strict";

const gulp = require('gulp'),
  {src, dest, task, watch} = gulp,
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  cleanCss = require('gulp-clean-css'),
  imagemin = require('gulp-imagemin'),
  del = require('del'),
  connect = require('gulp-connect');

gulp.task('concatScripts', () => {
  return src(['js/circle/autogrow.js', 'js/circle/circle.js'])
    .pipe(maps.init())
    .pipe(concat('all.js'))
    .pipe(maps.write('./'))
    .pipe(dest('js'));
});

gulp.task('minifyJS',['concatScripts'], () => {
  return src('js/all.js')
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(dest('js'));
});


gulp.task('scripts', ['minifyJS'], () => {
  return src(['js/all.js.map', 'js/all.min.js'])
    .pipe(dest('dist/scripts'));
});

gulp.task('compileSass', () => {
  return src(['sass/global.scss'])
    .pipe(maps.init())
    .pipe(sass())
    .pipe(concat('all.css'))
    .pipe(maps.write('./'))
    .pipe(dest('css'))
});

gulp.task('minifyCSS', ['compileSass'], () => {
  return src('css/all.css')
    .pipe(cleanCss())
    .pipe(concat('all.min.css'))
    .pipe(dest('css'));
});

gulp.task('styles', ['minifyCSS'], () => {
  return src(['css/all.css.map', 'css/all.min.css'])
    .pipe(dest('dist/styles'))
    .pipe(connect.reload());
});

gulp.task('images', () => {
  src('images/*')
    .pipe(imagemin())
    .pipe(dest('dist/content'));
})

gulp.task('clean', () => {
  return del(['dist', 'css', 'js/all*.js*']);
});


gulp.task('build', ['clean'], () => {

  return (gulp.start(['scripts','styles','images']),
    src('index.html')
      .pipe(dest('dist')));
});

gulp.task('watchCSS', () => {
  gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('default', ['build','watchCSS'], () => {
  connect.server({
    livereload: true,
    port:3000
  });
});

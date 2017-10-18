var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCss = require('gulp-concat-css'),
    runSequence = require('run-sequence'),
    rimraf = require('gulp-rimraf'),
    livereload = require('gulp-livereload'),
    sassLint = require('gulp-sass-lint'),
    watch = require('gulp-watch'),
    data = require("gulp-data");

//Compile scss to css with Autoprefixer
gulp.task('sass', ['sass-lint'], function () {
  return gulp.src('./scss/**/*.scss')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/style/'))
      .pipe(concatCss('./public/style/style.css'))
      .pipe(concatCss('./public/style/style.css'))
});

//SassLint
gulp.task('sass-lint', function() {
  return gulp.src(['./scss/**/*.s+(a|c)ss'])
      .pipe(sassLint({config: '.sass-lint.yml'}))
      .pipe(sassLint.format())
});

//Watch to all
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./scss/**/*.scss', ['sass']);
});

//Pre clean styles
gulp.task('pre-clean', function() {
  return gulp.src('./public/styles/', {read: false})
      .pipe(rimraf());
});

//Pre clean assets
gulp.task('pre-clean-assets', function() {
  return gulp.src('./public/assets/', {read: false})
      .pipe(rimraf());
});


//Copy assets to build
gulp.task('assets', function() {
  return gulp.src('./assets/**/*')
      .pipe(gulp.dest('./public/assets/'));
});

/************* build styles.css **************/
//Build
gulp.task('build', function(callback) {
  runSequence(
      'pre-clean',
      'pre-clean-assets',
      'assets',
      'sass',
      'watch',
      callback
  );
});

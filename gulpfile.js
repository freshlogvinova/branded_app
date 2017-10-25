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
    data = require("gulp-data"),
    uglifyCss = require('gulp-uglifycss');

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
      .pipe(uglifyCss())
      .pipe(gulp.dest('./assets/style/'))
      .pipe(concatCss('./assets/style/style.css'))
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
  return gulp.src('./assets/styles/', {read: false})
      .pipe(rimraf());
});


/************* build styles.css **************/
//Build
gulp.task('build', function(callback) {
  runSequence(
      'pre-clean',
      'sass',
      'watch',
      callback
  );
});

//Build prod
gulp.task('build-prod', function(callback) {
  runSequence(
      'pre-clean',
      'sass',
      callback
  );
});
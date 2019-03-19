var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var inlineCss = require('gulp-inline-css');
var runSequence = require('run-sequence');

var paths = {
  css: {
    src: './src/style/',
    dist: './'
  },

  html: {
    dist: './'
  }
};

var options = {

  sass: {
    errLogToConsole: true,
    outputStyle: 'compressed'
  },

  inlineCss: {
    applyStyleTags: false,
    removeStyleTags: false
  },

  watch: [
    '/**/*.html',
  ]
}

/* =========================================================
 SASS
========================================================= */
gulp.task('sass', function () {
  return gulp
    .src('./src/style/**/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({outputStyle:'expanded'}))
    .pipe(gulp.dest('./dist/build/'))
});

/* =========================================================
 INLINE CSS
========================================================= */

gulp.task('inlineCss', () => {
  return gulp.src('./src/index.html')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(inlineCss(options.inlineCss))
    .pipe(gulp.dest('./dist/build/'))
});

/* =========================================================
 WATCH
========================================================= */

gulp.task('default', ()=> {
  return gulp.watch(['./src/index.html', './src/style/**/*.scss'],
  gulp.series('sass', 'inlineCss'));
})
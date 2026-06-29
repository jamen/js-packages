var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

var bundle = function bundle(input, name, output) {
  return function() {
    return browserify(input).bundle()
    .pipe(source(name))
    .pipe(gulp.dest(output));
  };
};

gulp.task('build', bundle('index.js', 'dist.js', '.'));
gulp.task('test', bundle('test/test.js', 'index.js', 'test'));

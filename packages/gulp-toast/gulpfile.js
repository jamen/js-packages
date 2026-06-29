'use strict';

const gulp = require('gulp'),
      toast = require('.');

gulp.task('test', function(){
  gulp.src('test/.toast')
    .pipe(toast());
});

gulp.task('toast', function(){
  gulp.src('.toast.json')
    .pipe(toast());
});

'use strict';

const gulp = require('gulp'),
      toast = require('.');

gulp.task('test', function(){
  gulp.src('test/.toast')
    .pipe(toast());
});

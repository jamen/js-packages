toast
=====
[gulp-toast](http://npmjs.com/gulp-toast) allows you to centralize your project's JSON/plain-text configurations (`*rc` files and more) into one location, a `.toast` file.  It then uses gulp to compile into their appropriate configurations.

Consider adding this to your `.gitignore` file, since you only need `.toast`:
```
# Yippee, toast!
.*rc
```

Then put all your configurations in `.toast`:

```javascript
{
  ".jshintrc": { ... },
  ".babelrc": { ... },
  ".bowerrc": { ... },
  ".gitignore": [ ... ],
  ".npmignore": [ ... ],
}
```

## Usage

Simply pipe a configuration file into `toast()`.

```javascript
const gulp = require('gulp'),
      toast = require('gulp-toast');

gulp.task('...', function(){
  gulp
    .src('some/.toast')
    .pipe(toast({ /* options */ }));
});
```

## Options
 - `main`: The `.toast` file.
 - `entry`: The folder to generate the files in.

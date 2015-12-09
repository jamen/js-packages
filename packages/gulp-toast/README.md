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

## Smart things to do

 - [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) (on `post-merge`): Useful if you're setting up a `"ignore"` field, so it will automatically generate a all your toast files.
 - [npm  script](https://docs.npmjs.com/misc/scripts) (`install`): This way people just have to `npm install` to generate configuration files... (which they will inevitably do if you have dependences)

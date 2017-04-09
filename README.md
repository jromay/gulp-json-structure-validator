# gulp-json-structure-validator 
(https://www.npmjs.com/package/gulp-json-structure-validator) 

A gulp wrapper around [diff-json-structure](https://github.com/IndigoUnited/node-diff-json-structure) that has an option to check for forgotten keys.

## Install
`npm install gulp-json-structure-validator`
## Usage
```js
var path = require('path');
var gulpJsonStructureValidator = require('gulp-json-structure-validator');
gulp.task('default', function() {
  return gulp.src('./**/locale/*.json')
    .pipe(gulpJsonStructureValidator({ template: path.join(__dirname, './templates/language.json') }))
});
```
### gulpJsonStructureValidator([options])
#### Options
##### template
Type: `String`

Template file path to compare
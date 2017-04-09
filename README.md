# gulp-json-structure-validator 
(https://www.npmjs.com/package/gulp-json-structure-validator) 

A gulp plugin that has an option to check for forgotten keys on json files (configurations, i18n, ...).

## Install
`npm install gulp-json-structure-validator`

## Usage
```js
var gulp = require('gulp');
var path = require('path');
var gulpJsonStructureValidator = require('gulp-json-structure-validator');
gulp.task('default', function() {
  return gulp.src('./**/locale/*.json')
    .pipe(gulpJsonStructureValidator({ template: path.join(__dirname, './locale/es.json') }))
});
```
### gulpJsonStructureValidator([options])
#### Options
##### template
Type: `String`

Template file path to compare
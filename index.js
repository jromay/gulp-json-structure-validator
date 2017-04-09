var mapStream = require('map-stream');
var PluginError = require('gulp-util').PluginError;
var fs = require('fs');
module.exports = gulpJsonStructureValidator;

function jsondif(a,b,pre){
    var dev = '';
	  for (var prop in a) {
        if(b[prop]==undefined){
            dev += pre+prop+'\n';
        } else {
			if (typeof b[prop] === 'object')  {
				dev += jsondif(a[prop],b[prop],pre+prop+'.');
			}
        }
    }
    return dev;
};

function gulpJsonStructureValidator(option) {
  var template = "";
  if (option) {
    template = option.template;
  }
  
    return mapStream(function(file, cb) {
      fs.readFile(template, 'utf8', function (err, data) {
        if (err) {
          error = new PluginError('gulp-json-structure-validator',{
              name: 'JSON Structure Validate Error',
              filename: file.path,
              message: 'Read Template Error: ' + template
            });
          cb(error, file);
        } else {
          var templateObject = JSON.parse(data);
          var content = file.contents;
          var error;
          if (content) {
			var e = jsondif(templateObject, JSON.parse(content), '');
            if (e != '') {
              error = new PluginError('gulp-json-structure-validator',{
                name: 'JSON Structure Validate Error',
                filename: file.path,
                message: '\nForgotten in "' + file.path + '"' + ':\n' +e
                });
            }
          }
          cb(error, file);
        }
      });
    });
}

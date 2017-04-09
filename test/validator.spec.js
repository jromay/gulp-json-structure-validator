var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var gulpJsonStructureValidator = require('../');

describe('test', function() {
  describe('plugin', function() {
    var file;
    beforeEach(function() {
      file = new gutil.File({
        path: __dirname + '/fixture/diff-key.json',
        cwd: __dirname,
        base: __dirname + '/fixture' ,
        contents: fs.readFileSync('./test/fixture/diff-key.json')
      });
    });

    it('should fail on forgotten key', function(done) {
      var stream = gulpJsonStructureValidator({template: __dirname + '/fixture/diff-key.json.templateerror'});

      stream.on('error', function () {
        done();
      });

      stream.once('end', function () {
        expect(true).to.be.false;
        done();
      });

      stream.write(file);
      stream.end();
    });

    
    it('should not fail on equal structure', function(done) {
      var stream = gulpJsonStructureValidator({template: __dirname + '/fixture/diff-key.json.templateok'});

      var count = 0;
      stream.on('data', function () {
        count++;
      });

      stream.on('error', function () {
        expect(false).to.be.true;
      });
      stream.once('end', function () {
        expect(count).to.equal(1);
        done();
      });

      stream.write(file);
      stream.end();
    });
    
  });
});
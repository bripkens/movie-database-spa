var Q = require('q');
var findit = require('findit');
var _ = require('lodash');
var fs = require('fs');

function findFilesIn(directory) {
  var deferred = Q.defer();

  var files = [];
  findit.find(directory).on('file', function(filename) {
    files.push(filename);
  }).on('end', function() {
    deferred.resolve(files);
  });

  return deferred.promise;
}

function toRequireJsAllFile(files) {
  var fileContent = "define([\n    ";

  files = files.map(function(file) {
    return '"' + file + '"';
  });

  fileContent += files.join(',\n    ');

  fileContent += "], function() {\n";
  fileContent += "  \"use strict\";\n";
  fileContent += "  return Array.prototype.slice.call(arguments, 0);\n";
  fileContent += "});\n";

  return fileContent;
}

module.exports = function(grunt) {

  var filters;
  var filesToCombine;
  var pathToRemove;
  var doneCallback;

  grunt.registerMultiTask('buildAll',
      'Build Angular / Require.js all files',
      function() {
    var config = this.data;

    if (config.hasOwnProperty('reject')) {
      filters = config.reject;

      if (typeof filters === 'string' ||
          Object.getPrototypeOf(filters) !== Array.prototype) {
        filters = [filters];
      }
    } else {
      filters = [];
    }

    pathToRemove = config.remove || "";

    filesToCombine = _.clone(config);
    delete filesToCombine['reject'];
    delete filesToCombine['remove'];

    doneCallback = this.async();
    combine();
  });

  function combine() {
    var promises = Object.keys(filesToCombine).map(function(output) {
      var path = filesToCombine[output];
      return generateAll(path, output);
    });

    Q.allResolved(promises)
    .then(function(promises) {
      var result = promises.reduce(function(result, promise) {
        var fulfilled = promise.isFulfilled();
        result.success = result.success && fulfilled;

        if (!fulfilled) {
          result.errors.push(promise.valueOf().exception);
        }
        return result;
      }, {success: true, errors: []});

      if (!result.success) {
        grunt.log.error(result.errors);
      }

      doneCallback(result.success);
    });
  }

  function generateAll(path, output) {
    return findFilesIn(path)
      .then(function(allFiles) {
        // filter rejected files
        allFiles = allFiles.filter(function(file) {
          return filters.reduce(function(pass, filter) {
            return pass && file.indexOf(filter) === -1;
          }, true);
        });

        // remove the directory prefix
        allFiles = allFiles.map(function(file) {
          var start = file.indexOf(pathToRemove);

          if (start === -1) {
            return file;
          }

          return file.substr(start + pathToRemove.length);
        });

        // remove the '.js' suffix
        allFiles = allFiles.map(function(file) {
          return file.substr(0, file.length - 3);
        });

        // write the newly generated file
        var fileContents = toRequireJsAllFile(allFiles);
        return Q.nfcall(fs.writeFile, output,
          fileContents, 'utf8')
        .then(function() {
          grunt.log.writeln('Generated ' + output);
        });
      });
  };
};
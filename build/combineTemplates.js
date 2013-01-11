/*global module:false,require:false,console:false */
var findit = require("findit");
var fs = require("fs");

module.exports = function(log, doneCallback) {
  var templates = [];
  var templateContents = {};
  var templateReadCount = 0;
  var targetFile = "target/index.html";

  var combineAndWrite = function() {
    var combination = "";
    for (name in templateContents) {
      if (templateContents.hasOwnProperty(name)) {
        combination += "<script type='text/ng-template' id='" + name + "'>";
        combination += templateContents[name];
        combination += "</script>";
      }
    }

    log("Writing combined templates to " + targetFile);
    fs.readFile(targetFile, "utf8", function(err, contents) {
      if (err) {
        log("Failed to read target file contents: " + err);
        return doneCallback(false);
      }

      var newContents = contents.replace("</head>", combination + "</head>");
      fs.writeFile(targetFile, newContents, "utf8", function(err) {
        if (err) {
          log("Failed to write combined templates: " + err);

        }
        doneCallback(true);
      });
    });
  };

  findit.find("src/templates").on("file", function(filename) {
    templates.push(filename);
  }).on("end", function() {
    templates.forEach(function(filename) {
      var filenameWithoutPrefix = filename.substring(3);
      log("Including partial: " + filenameWithoutPrefix);
      fs.readFile(filename, "utf8", function(err, contents) {
        if (err) {
          log("Failed to read contents of " + filename + " due to " + err);
          doneCallback(false);
        }

        templateContents[filenameWithoutPrefix] = contents;

        templateReadCount++;
        if (templateReadCount === templates.length) {
          combineAndWrite();
        }
      });
    });
  });
};
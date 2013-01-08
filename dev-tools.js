/*global module:false,require:false,console:false */
var nodeStatic = require("node-static");
var http = require("http");
var util = require("util");
var findit = require("findit");
var fs = require("fs");
var webroot = "./target";
var port = 8000;
var exec = require("child_process").exec;

module.exports.startServer = function() {
  "use strict";

  var file = new(nodeStatic.Server)(webroot, {
    cache: 0
  });

  http.createServer(function(req, res) {

    req.addListener("end", function() {
      if (!isStaticResource(req.url)) {
        req.url = "/index.html";
      }

      file.serve(req, res, function(err, result) {
        if (err) {
          console.error("Error serving %s - %s", req.url, err.message);
          res.writeHead(err.status, err.headers);
          res.end();
        }
      });
    });
  }).listen(port);

  function isStaticResource(url) {
    var assetTypes = [".js", ".css", ".txt", ".ico", ".html", ".png"];

    return assetTypes.reduce(function(memo, assetType) {
      return memo || url.indexOf(assetType) !== -1;
    }, false);
  }

  console.log("node-static running at http://localhost:%d", port);
};

module.exports.reloadChrome = function() {
  exec("osascript -e 'tell application \"Google Chrome\" " +
                      "to tell the active tab of its first window' " +
                 "-e 'reload' " +
                 "-e 'end tell'");
};

module.exports.combineTemplates = function(log, doneCallback) {
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

      var newContents = contents.replace("</body>", combination + "</body>");
      fs.writeFile(targetFile, newContents, "utf8", function(err) {
        if (err) {
          log("Failed to write combined templates: " + err);

        }
        doneCallback(true);
      });
    });
  };

  findit.find("src/partials").on("file", function(filename) {
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
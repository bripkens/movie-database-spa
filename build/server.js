/*global module:false,require:false,console:false */
var nodeStatic = require("node-static");
var http = require("http");
var webroot = "./target";
var port = 8000;

module.exports = function() {
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
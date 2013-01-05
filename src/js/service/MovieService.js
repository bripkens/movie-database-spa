/*global console:false */
define(["app", "jquery"], function(app, $) {
  "use strict";

  app.factory("MovieService", ["config", function(config) {
    var exports = {};

    exports.all = function(callback) {
      console.log('config: ', config);
    };

    return exports;
  }]);
});
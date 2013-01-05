/*global console:false */
define(["app", "jquery"], function(app, $) {
  "use strict";

  app.factory("MovieService", ["config", function(config) {
    var exports = {};

    exports.all = function(callback) {
      $.ajax({
        type: "GET",
        url: config.endpoint + "/movies",
        dataType: "json",
        headers: {
          Accept: "application/json, application/hal+json"
        },
        success: function(data) {
          callback(null, data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          callback(textStatus);
        }
      });
    };

    exports.get = function(id, callback) {
      $.ajax({
        type: "GET",
        url: config.endpoint + "/movies/" + id,
        dataType: "json",
        headers: {
          Accept: "application/json, application/hal+json"
        },
        success: function(data) {
          callback(null, data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          callback(textStatus);
        }
      });
    };

    return exports;
  }]);
});
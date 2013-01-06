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

    exports.update = function(movie, callback) {
      $.ajax({
        type: "PUT",
        url: config.endpoint + "/movies/" + movie.id,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ // remove the ID property from the JSON
          title: movie.title,
          startDate: movie.startDate,
          description: movie.description
        }),
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
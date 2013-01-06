/*global console:false */
define(["app"], function(app) {
  "use strict";

  app.factory("MovieService", ["config", "$http", function(config, $http) {
    var exports = {};

    exports.all = function(callback) {
      $http({
        method: "GET",
        url: config.endpoint + "/movies",
        headers: {
          Accept: "application/json, application/hal+json"
        }
      }).success(function(data) {
        callback(null, data);
      }).error(function(error) {
        callback(error);
      });
    };

    exports.get = function(id, callback) {
      $http({
        method: "GET",
        url: config.endpoint + "/movies/" + id,
        headers: {
          Accept: "application/json, application/hal+json"
        }
      }).success(function(data) {
        callback(null, data);
      }).error(function(error) {
        callback(error);
      });
    };

    exports.update = function(movie, callback) {
      $http({
        method: "PUT",
        url: config.endpoint + "/movies/" + movie.id,
        headers: {
          Accept: "application/json, application/hal+json",
          "Content-Type": "application/json"
        },
        data: JSON.stringify({ // remove the ID property from the JSON
          title: movie.title,
          startDate: movie.startDate,
          description: movie.description
        })
      }).success(function(data) {
        callback(null, data);
      }).error(function(error) {
        callback(error);
      });
    };

    return exports;
  }]);
});
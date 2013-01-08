/*global console:false */
define(["app", "config"], function(app, config) {
  "use strict";

  var callbackSupport = function(wrapped) {
    return function() {
      var callback = arguments[arguments.length - 1];
      var promise = wrapped.apply(this, arguments);

      if (typeof callback === "function") {
        promise.success(function(data) {
          callback(null, data);
        }).error(function(error) {
          callback(error);
        });
      }

      return promise;
    };
  };

  app.factory("MovieService", ["$http", function($http) {
    var exports = {};

    exports.all = callbackSupport(function() {
      return $http({
        method: "GET",
        url: config.endpoint + "/movies",
        headers: {
          Accept: "application/json, application/hal+json"
        }
      });
    });

    exports.get = callbackSupport(function(id) {
      return $http({
        method: "GET",
        url: config.endpoint + "/movies/" + id,
        headers: {
          Accept: "application/json, application/hal+json"
        }
      });
    });

    exports.update = callbackSupport(function(movie) {
      return $http({
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
      });
    });

    exports.addComment = callbackSupport(function(movieId, content) {
      return $http({
        method: "POST",
        url: config.endpoint + "/movies/" + movieId + "/comments",
        headers: {
          Accept: "application/json, application/hal+json",
          "Content-Type": "text/plain"
        },
        data: content
      });
    });

    return exports;
  }]);
});
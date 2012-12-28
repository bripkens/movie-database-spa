angular.module("DataRepository", ["ngResource"]).
    factory("MovieRepository", function($resource) {
  "use strict";

  return $resource("http://localhost:8080/movies/:movieId", {}, {
    query: {
      method: "GET",
      isArray: true
    },
    get: {
      method: "GET"
    }
  });

});
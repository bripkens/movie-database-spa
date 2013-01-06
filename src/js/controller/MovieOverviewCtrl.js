define(["app"], function(app) {
  "use strict";

  function constructor($scope, $location, MovieService) {
    $scope.movies = [];

    $scope.click = function(movieId) {
      $location.path("/movies/" + movieId);
    };

    MovieService.all(function(error, movies) {
      $scope.$apply(function() {
        $scope.movies = movies;
      });
    });
  }

  var controller = app.controller("MovieOverviewCtrl",
    ["$scope", "$location", "MovieService", constructor]);

  constructor.partial = "movies/overview.html";
  return constructor;
});
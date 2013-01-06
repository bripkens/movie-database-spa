define(["angularUtils"], function(angularUtils) {
  "use strict";

  function constructor($scope, $location, MovieService) {
    $scope.movies = [];

    $scope.click = function(movieId) {
      $location.path("/movies/" + movieId);
    };

    MovieService.all(function(error, movies) {
      $scope.movies = movies;
    });
  }

  return angularUtils.defineController({
    name: "MovieOverviewCtrl",
    constructor: constructor,
    partial: "movies/overview.html",
    dependencies: ["$scope", "$location", "MovieService"]
  });
});
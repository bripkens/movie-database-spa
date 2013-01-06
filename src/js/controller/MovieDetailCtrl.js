define(["angularUtils"], function(angularUtils) {
  "use strict";

  function constructor($scope, $routeParams, MovieService) {
    $scope.movieId = $routeParams.movieId;

    MovieService.get($scope.movieId, function(error, data) {
      $scope.movie = data;
    });
  }

  return angularUtils.defineController({
    name: "MovieDetailCtrl",
    constructor: constructor,
    partial: "movies/detail.html",
    dependencies: ["$scope", "$routeParams", "MovieService"]
  });
});
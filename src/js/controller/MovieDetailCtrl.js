define(["app"], function(app) {
  "use strict";

  function constructor($scope, $routeParams, MovieService) {
    $scope.movieId = $routeParams.movieId;

    MovieService.get($scope.movieId, function(error, data) {
      $scope.$apply(function() {
        $scope.movie = data;
      });
    });
  }

  var controller = app.controller("MovieDetailCtrl",
    ["$scope", "$routeParams", "MovieService", constructor]);

  constructor.partial = "movies/detail.html";
  return constructor;
});
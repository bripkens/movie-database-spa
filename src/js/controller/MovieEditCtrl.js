define(["angularUtils"], function(angularUtils) {
  "use strict";

  function constructor($scope, $routeParams, $location, MovieService) {
    $scope.movieId = $routeParams.movieId;
    $scope.title = "";
    $scope.releaseDate = "";
    $scope.description = "";

    MovieService.get($scope.movieId, function(error, data) {
      $scope.title = data.title;
      $scope.description = data.description;

      if (data.startDate) {
        $scope.releaseDate = data.startDate.substring(0, 10);
      }
    });

    $scope.save = function() {
      var data = {
        id: $scope.movieId,
        title: $scope.title,
        description: $scope.description,
        startDate: $scope.releaseDate
      };

      MovieService.update(data, function(error, data) {
        if (!error) {
          $location.path("/movies/" + $scope.movieId);
        }
      });
    };
  }

  return angularUtils.defineController({
    name: "MovieEditCtrl",
    constructor: constructor,
    partial: "movies/edit.html",
    dependencies: ["$scope", "$routeParams", "$location", "MovieService"]
  });
});
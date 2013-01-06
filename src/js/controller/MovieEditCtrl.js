/*global console:false */
define(["app"], function(app) {
  "use strict";

  function constructor($scope, $routeParams, MovieService) {
    $scope.movieId = $routeParams.movieId;
    $scope.title = "";
    $scope.releaseDate = "";
    $scope.description = "";

    var readServerResponse = function(error, data) {
      $scope.$apply(function() {
        $scope.title = data.title;
        $scope.description = data.description;

        if (data.startDate) {
          $scope.releaseDate = data.startDate.substring(0, 10);
        }
      });
    };

    MovieService.get($scope.movieId, readServerResponse);

    $scope.save = function() {
      var data = {
        id: $scope.movieId,
        title: $scope.title,
        description: $scope.description
      };
      MovieService.update(data, readServerResponse);
    };
  }

  var controller = app.controller("MovieEditCtrl",
    ["$scope", "$routeParams", "MovieService", constructor]);

  constructor.partial = "movies/edit.html";
  return constructor;
});
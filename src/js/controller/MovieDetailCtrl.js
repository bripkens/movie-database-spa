define(["app"], function(app) {
  "use strict";

  function constructor($scope, $routeParams) {
    $scope.movieId = $routeParams.movieId;
  }

  var controller = app.controller("MovieDetailCtrl",
    ["$scope", "$routeParams", constructor]);

  constructor.partial = "detail.html";
  return constructor;
});
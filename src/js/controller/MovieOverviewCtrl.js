define(["app"], function(app) {
  "use strict";

  function constructor($scope, $location) {
    $scope.movies = [
      {title: "Star Wars", id: "5270ca09-03ee-4677-8d4c-91eac3c1821d"},
      {title: "Forrest Gump", id: "4dd66d58-922c-482b-af62-c8df6748ccd6"}
    ];

    $scope.click = function(movieId) {
      $location.path("/movies/" + movieId);
    };

    // MovieRepository.all(function() {
    //   console.log(arguments);
    // });
  }

  var controller = app.controller("MovieOverviewCtrl",
    ["$scope", "$location", constructor]);

  constructor.partial = "overview.html";
  return constructor;
});
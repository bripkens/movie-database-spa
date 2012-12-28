/*global console:false */
function MovieOverviewCtrl($scope, $location, MovieRepository) {
  "use strict";

  $scope.movies = [
    {title: "Star Wars", id: "5270ca09-03ee-4677-8d4c-91eac3c1821d"},
    {title: "Forrest Gump", id: "4dd66d58-922c-482b-af62-c8df6748ccd6"}
  ];

  $scope.click = function(movieId) {
    $location.path("/movies/" + movieId);
  };

  MovieRepository.query({}, function success() {
    console.log(arguments);
  }, function error() {
    console.log(arguments);
  });
}

MovieOverviewCtrl.$inject = ["$scope", "$location", "MovieRepository"];
MovieOverviewCtrl.partial = "overview.html";
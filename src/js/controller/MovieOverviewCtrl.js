define(["angularUtils"], function(angularUtils) {
  "use strict";

  function controller($scope, $location, movieResponse) {
    $scope.movies = movieResponse.data;
    $scope.predicate = "title";

    $scope.click = function(movieId) {
      $location.path("/movies/" + movieId);
    };

    $scope.pageTitle = "Overview";
  }

  var resolve = {};
  resolve.movieResponse = function(MovieService) {
    return MovieService.all();
  };
  resolve.movieResponse.$inject = ["MovieService"];

  return angularUtils.defineController({
    name: "MovieOverviewCtrl",
    controller: controller,
    partial: "movies/overview.html",
    resolve: resolve,
    dependencies: ["$scope", "$location", "movieResponse"]
  });
});
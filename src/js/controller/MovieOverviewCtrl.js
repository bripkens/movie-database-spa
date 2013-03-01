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
  resolve.movieResponse = function($location, MovieService) {
    var query = $location.search().searchString;
    if (query == null) {
      return MovieService.all();
    }

    return MovieService.query(query);
  };
  resolve.movieResponse.$inject = ["$location", "MovieService"];

  return angularUtils.defineController({
    name: "MovieOverviewCtrl",
    controller: controller,
    partial: "movies/overview.html",
    resolve: resolve,
    dependencies: ["$scope", "$location", "movieResponse"]
  });
});
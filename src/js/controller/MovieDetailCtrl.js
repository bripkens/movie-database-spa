define(["angularUtils"], function(angularUtils) {
  "use strict";

  function controller($scope, movieResponse) {
    $scope.movie = movieResponse.data;

    $scope.pageTitle = function() {
      return $scope.movie.title;
    };
  }

  var resolve = {};
  resolve.movieResponse = function($route, MovieService) {
    var movieId = $route.current.params.movieId;
    return MovieService.get(movieId);
  };
  resolve.movieResponse.$inject = ["$route", "MovieService"];

  return angularUtils.defineController({
    name: "MovieDetailCtrl",
    controller: controller,
    partial: "movies/detail.html",
    dependencies: ["$scope", "movieResponse"],
    resolve: resolve
  });
});
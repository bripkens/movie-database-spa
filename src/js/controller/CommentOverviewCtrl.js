define(["angularUtils"], function(angularUtils) {
  "use strict";

  function controller($scope, movieResponse, MovieService) {
    $scope.predicate = "creationDate";
    $scope.reverse = true;
    $scope.newCommmentContent = "";
    $scope.movie = movieResponse.data;

    $scope.addComment = function() {
      MovieService.addComment($scope.movie.id,
          $scope.newCommmentContent,
          function(error, data) {
        $scope.newCommmentContent = "";
        $scope.movie = data;
      });
    };

    $scope.pageTitle = "Comments - " + $scope.movie.title;
  }

  var resolve = {};
  resolve.movieResponse = function($route, MovieService) {
    var movieId = $route.current.params.movieId;
    return MovieService.get(movieId);
  };
  resolve.movieResponse.$inject = ["$route", "MovieService"];

  return angularUtils.defineController({
    name: "CommentOverviewCtrl",
    controller: controller,
    partial: "comments/overview.html",
    resolve: resolve,
    dependencies: ["$scope", "movieResponse", "MovieService"]
  });
});
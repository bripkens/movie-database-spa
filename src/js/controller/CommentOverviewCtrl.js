define(["angularUtils"], function(angularUtils) {
  "use strict";

  function constructor($scope, movieResponse, MovieService) {
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
  }

  constructor.title = "fooobar";
  constructor.resolve = {};
  constructor.resolve.movieResponse = function($route, MovieService) {
    var movieId = $route.current.params.movieId;
    return MovieService.get(movieId);
  };
  constructor.resolve.movieResponse.$inject = ["$route", "MovieService"];

  return angularUtils.defineController({
    name: "CommentOverviewCtrl",
    constructor: constructor,
    partial: "comments/overview.html",
    dependencies: ["$scope", "movieResponse", "MovieService"]
  });
});
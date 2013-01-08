define(["angularUtils"], function(angularUtils) {
  "use strict";

  function constructor($scope, $routeParams, MovieService) {
    $scope.movieId = $routeParams.movieId;

    $scope.comments = [
      {
        creationDate: "2012-12-12",
        content: "This is a comment"
      }, {
        creationDate: "2013-01-07",
        content: "The site is improving!"
      }, {
        creationDate: "2013-01-08",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
                 "In animi sunt aspernatur ullam provident culpa velit " +
                 "soluta perferendis consequuntur fugit delectus praesentium " +
                 "quae laboriosam assumenda quam tenetur obcaecati " +
                 "consectetur consequatur!"
      }
    ];

    MovieService.get($scope.movieId, function(error, data) {
      $scope.movie = data;
    });
  }

  return angularUtils.defineController({
    name: "CommentOverviewCtrl",
    constructor: constructor,
    partial: "comments/overview.html",
    dependencies: ["$scope", "$routeParams", "MovieService"]
  });
});
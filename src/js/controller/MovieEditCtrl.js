define(["angularUtils", "events", "eventbus"],
    function(angularUtils, events, eventbus) {
  "use strict";

  function controller($scope, $location, MovieService, movieResponse) {
    $scope.movie = movieResponse.data;

    if ($scope.movie.startDate) {
      // HTML 5 date input field expects data in the form of "yyyy-MM-dd"
      $scope.movie.startDate = $scope.movie.startDate.substring(0, 10);
    }

    $scope.save = function() {
      MovieService.update($scope.movie, function(error, data) {
        if (!error) {
          $location.path("/movies/" + $scope.movie.id);
          eventbus.fire(events.showNotification, [{
            type: "success",
            title: "Movie '" + $scope.movie.title + "' successfully edited."
          }]);
        }
      });
    };
  }

  var resolve = {};
  resolve.movieResponse = function($route, MovieService) {
    var movieId = $route.current.params.movieId;
    return MovieService.get(movieId);
  };
  resolve.movieResponse.$inject = ["$route", "MovieService"];

  return angularUtils.defineController({
    name: "MovieEditCtrl",
    controller: controller,
    partial: "movies/edit.html",
    resolve: resolve,
    dependencies: ["$scope", "$location", "MovieService", "movieResponse"]
  });
});
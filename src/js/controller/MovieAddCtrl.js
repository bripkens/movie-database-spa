define(["angularUtils", "events", "eventbus"],
    function(angularUtils, events, eventbus) {
  "use strict";

  function controller($scope, $location, MovieService) {
    $scope.movie = {};
    $scope.pageTitle = "Add Movie";

    $scope.save = function() {
      MovieService.add($scope.movie, function(error, data) {
        if (!error) {
          $location.path("/movies/" + data.id);
          eventbus.fire(events.showNotification, [{
            type: "success",
            title: "Movie '" + data.title + "' successfully added."
          }]);
        }
      });
    };
  }

  return angularUtils.defineController({
    name: "MovieAddCtrl",
    controller: controller,
    partial: "movies/add.html",
    dependencies: ["$scope", "$location", "MovieService"]
  });
});
function MovieDetailCtrl($scope, $routeParams) {
  "use strict";

  $scope.movieId = $routeParams.movieId;
}

MovieDetailCtrl.$inject = ["$scope", "$routeParams"];
MovieDetailCtrl.partial = "detail.html";
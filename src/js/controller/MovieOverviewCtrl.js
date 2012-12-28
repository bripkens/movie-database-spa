function MovieOverviewCtrl($scope, $location) {
  "use strict";

  $scope.movies = [
    {title: "Star Wars", id: "5270ca09-03ee-4677-8d4c-91eac3c1821d"},
    {title: "Forrest Gump", id: "4dd66d58-922c-482b-af62-c8df6748ccd6"}
  ];
}

MovieOverviewCtrl.$inject = ["$scope", "$location"];
MovieOverviewCtrl.partial = "overview.html";
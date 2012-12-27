/*jshint unused:false*/

function AppCtrl($scope) {
  "use strict";

  $scope.url = "";
  $scope.tags = "";
  $scope.description = "";

  $scope.bookmarks = [];

  $scope.addBookmark = function() {
    $scope.bookmarks.push({
      url: $scope.url,
      tags: $scope.tags.split(" "),
      description: $scope.description
    });

    $scope.url = "";
    $scope.tags = "";
    $scope.description = "";
  };
}
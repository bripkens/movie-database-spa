/*global console:false */
define(["angularUtils", "eventbus"], function(angularUtils, eventbus) {
  "use strict";

  function controller($scope, $location) {
    $scope.query = $location.search().searchString;

    $scope.search = function() {
      $location.path("/");
      $location.search("searchString", $scope.query);
    };
  }

  return angularUtils.defineController({
    name: "SearchCtrl",
    controller: controller,
    dependencies: ["$scope", "$location"]
  });
});

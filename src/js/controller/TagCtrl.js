define(["angularUtils"], function(angularUtils) {
  "use strict";

  function constructor($scope) {
    $scope.tags = ["Science Fiction", "Thriller", "Action"];

    $scope.click = function(tag) {
      var text = document.createTextNode("Showing movies tagged with " + tag);
      document.body.appendChild(text);
    };
  }

  return angularUtils.defineController({
    name: "TagCtrl",
    constructor: constructor,
    dependencies: ["$scope"]
  });
});
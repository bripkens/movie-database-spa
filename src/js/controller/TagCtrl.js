define(["angularUtils", "eventbus"], function(angularUtils, eventbus) {
  "use strict";

  function controller($scope) {
    $scope.tags = ["Science Fiction", "Thriller", "Action"];

    $scope.click = function(tag) {
      var text = document.createTextNode("Showing movies tagged with " + tag);
      document.body.appendChild(text);
    };
  }

  return angularUtils.defineController({
    name: "TagCtrl",
    controller: controller,
    dependencies: ["$scope"]
  });
});
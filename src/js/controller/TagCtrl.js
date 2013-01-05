define(["app"], function(app) {
  "use strict";

  function constructor($scope) {
    $scope.tags = ["Science Fiction", "Thriller", "Action"];

    $scope.click = function(tag) {
      var text = document.createTextNode("Showing movies tagged with " + tag);
      document.body.appendChild(text);
    };
  }

  var controller = app.controller("TagCtrl", ["$scope", constructor]);

  constructor.needsPartial = false;
  return constructor;
});
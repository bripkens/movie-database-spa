function TagCtrl($scope) {
  "use strict";

  $scope.tags = ["Science Fiction", "Thriller", "Action"];

  $scope.click = function(tag) {
    var text = document.createTextNode("Showing movies tagged with " + tag);
    document.body.appendChild(text);
  };
}

TagCtrl.$inject = ["$scope"];
TagCtrl.needsPartial = false;
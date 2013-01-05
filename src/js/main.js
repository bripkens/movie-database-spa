require(["angular",
         "app",
         "configuration",
         "service/all",
         "controller/all",
         "routes"], function (angular) {
  "use strict";
  angular.bootstrap(document, ["movieDatabase"]);
});
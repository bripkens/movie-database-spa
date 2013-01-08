require(["angular",
         "app",
         "service/all",
         "filter/all",
         "directive/all",
         "controller/all",
         "setup"], function (angular) {
  "use strict";
  angular.bootstrap(document, ["movieDatabase"]);
});
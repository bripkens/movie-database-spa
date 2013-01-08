/*global console:false */
define(["angularUtils", "eventbus"], function(angularUtils, eventbus) {
  "use strict";

  function constructor($scope) {
    $scope.foo = "bar";

    $scope.$on("$routeChangeSuccess", function(e, current, previous) {
      if (current && current.$route && current.$route.controller) {
        var controller = current.$route.controller;
        console.log('controller.title: ', controller.title);
      }
    });

    $scope.$on("$routeChangeError", function(e, current, prev, rejection) {
      console.log("routeChangeError", arguments);
    });

    $scope.$on("$routeChangeStart", function(e, next, current) {
      console.log("routeChangeStart", arguments);
    });
  }

  return angularUtils.defineController({
    name: "ApplicationCtrl",
    constructor: constructor,
    needsPartial: false,
    dependencies: ["$scope", "$route"]
  });
});
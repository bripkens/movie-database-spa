/*global AppCtrl:false*/
angular.module("movie-database", []).
  config(["$routeProvider", "$locationProvider",
      function($routeProvider, $locationProvider) {
    "use strict";

    // Route Configurations
    var routes = {
      "/movies": AppCtrl
    };
    var otherwise = "/movies";

    // Registering the previously defined routes with Angular JS
    _.each(routes, function(ctrl, route) {
      $routeProvider.when(route, {
        templateUrl: "partials/" + ctrl.partial,
        controller: ctrl
      });
    });
    $routeProvider.otherwise({redirectTo: "/movies"});

    // Only activate HTML 5 when the application is actually deployed as our
    // development server does not support URL rewriting
    if (window.location.href.indexOf("http://localhost") !== 0) {
      $locationProvider.html5Mode(true);
    }

    // We explicitly have to set the HashPrefix to comply with Google's
    // crawlable hash prefix.
    $locationProvider.hashPrefix("!");
}]);
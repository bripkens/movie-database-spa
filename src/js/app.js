/*global MovieOverviewCtrl:false, MovieDetailCtrl:false*/
angular.module("movie-database", []).
  config(["$routeProvider", "$locationProvider",
      function($routeProvider, $locationProvider) {
    "use strict";

    // Route Configurations
    var routes = {
      "/movies": MovieOverviewCtrl,
      "/movies/:movieId": MovieDetailCtrl
    };
    var otherwise = "/movies";

    // Registering the previously defined routes with Angular JS
    _.each(routes, function(ctrl, route) {
      $routeProvider.when(route, {
        templateUrl: "/partials/" + ctrl.partial,
        controller: ctrl
      });
    });
    $routeProvider.otherwise({redirectTo: "/movies"});

    // use the new History API (Angular provides automatic fallback)
    $locationProvider.html5Mode(true);

    // We explicitly have to set the HashPrefix to comply with Google's
    // crawlable hash prefix.
    $locationProvider.hashPrefix("!");
}]);
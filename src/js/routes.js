define(["app",
        "lodash",
        "controller/MovieDetailCtrl",
        "controller/MovieOverviewCtrl",
        "controller/MovieEditCtrl"],
        function(app, _, MovieDetailCtrl, MovieOverviewCtrl, MovieEditCtrl) {
  "use strict";

  app.config(["$routeProvider", "$locationProvider",
      function($routeProvider, $locationProvider) {

    // Route Configurations
    var routes = {
      "/movies": MovieOverviewCtrl,
      "/movies/:movieId": MovieDetailCtrl,
      "/movies/:movieId/edit": MovieEditCtrl
    };
    var otherwise = "/movies";

    // Registering the previously defined routes with Angular JS
    _.each(routes, function(ctrl, route) {
      $routeProvider.when(route, {
        templateUrl: "/partials/" + ctrl.partial,
        controller: ctrl
      });
    });
    $routeProvider.otherwise({redirectTo: otherwise});

    // use the new History API (Angular provides automatic fallback)
    $locationProvider.html5Mode(true);

    // We explicitly have to set the HashPrefix to comply with Google's
    // crawlable hash prefix.
    $locationProvider.hashPrefix("!");
  }]);

});
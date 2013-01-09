define(["app", "lodash", "routes"], function(app, _, routes) {
  "use strict";

  app.config(["$routeProvider", "$locationProvider",
      function($routeProvider, $locationProvider) {

    // Register routes from routes.js with the routeProvider
    _.each(routes.paths, function(ctrl, route) {

      var routeConfiguration = {};

      if (typeof ctrl === "string") {
        // the controller is actually a redirect instruction
        routeConfiguration.redirectTo = ctrl;
      } else {
        routeConfiguration.templateUrl = ctrl.partial;
        routeConfiguration.controller = ctrl;

        if (ctrl.resolve) {
          routeConfiguration.resolve = ctrl.resolve;
        }
      }

      $routeProvider.when(route, routeConfiguration);
    });

    // fallback route
    $routeProvider.otherwise({redirectTo: routes.otherwise});

    // use the new History API (Angular provides automatic fallback)
    $locationProvider.html5Mode(true);

    // We explicitly have to set the HashPrefix to comply with Google's
    // crawlable hash prefix.
    $locationProvider.hashPrefix("!");
  }]);

});
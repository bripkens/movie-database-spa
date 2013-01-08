define(["angular"], function (angular) {
  "use strict";

  /*
   * We only define the angular module, but do not add further configuration
   * options. Many other (requirejs) modules, like *routes* and *controllers*
   * rely on the existence of the root angular module and we do not want
   * to fiddle around with dependency management which would be a result of
   * early configuration.
   *
   * Problem example:
   * If you were going to define the routes in this file, you would need
   * the controller constructors to be available. Unfortunately, the
   * definition of the controllers also requires the existence of the
   * root angular module, i.e., this file. Result: Dependency cycle.
   *
   * Let me illustrate this (arrow head indicates dependency):
   *    app.js    <--->    *Ctrl.js
   *
   * This project therefore splits the definition of the angular root module,
   * its configuration and the definition of the controllers.
   *    app.js    <---     *Ctrl.js
   *
   *      /\
   *      |
   *
   *   routes.js
   */
  return angular.module('movieDatabase', []);
});
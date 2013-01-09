define(["app", "utils", "config"], function(app, utils, configModule) {
  "use strict";

  var exports = {};

  exports.defineController = function(config) {
    utils.assert(config.name,
      "Controller defines no name!");
    utils.assert(config.dependencies,
      "Controller % defines no dependencies!",
      config.name);
    utils.assertFunction(config.controller,
      "Controller % defines no controller function. Got: %",
      config.name, config.controller);

    var controller = config.controller;
    app.controller(config.name, controller);

    controller.controllerName = config.name;

    if (config.partial) {
      controller.partial = configModule.templatePath.partials + config.partial;
    } else {
      controller.needsPartial = false;
    }

    if (config.resolve) {
      controller.resolve = config.resolve;
    }

    controller.$inject = config.dependencies;
    return controller;
  };

  return exports;
});
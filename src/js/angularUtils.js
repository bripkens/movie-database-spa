define(["app", "utils"], function(app, utils) {
  "use strict";

  var exports = {};

  exports.defineController = function(config) {
    utils.assert(config.name,
      "Controller defines no name!");
    utils.assert(config.dependencies,
      "Controller % defines no dependencies!",
      config.name);
    utils.assertFunction(config.constructor,
      "Controller % defines no controller function. Got: %",
      config.name, config.constructor);

    var constructor = config.constructor;
    app.controller(config.name, constructor);

    if (config.partial) {
      constructor.partial = config.partial;
    } else {
      constructor.needsPartial = false;
    }

    constructor.$inject = config.dependencies;
    return constructor;
  };

  return exports;
});
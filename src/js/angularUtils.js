define(["app"], function(app) {
  "use strict";

  var exports = {};

  exports.defineController = function(config) {
    var constructor = config.constructor;
    app.controller(config.name, constructor);

    if (config.partial) {
      constructor.partial = config.partial;
    } else {
      constructor.needsPartial = false;
    }

    constructor.$inject = config.dependencies || [];
    return constructor;
  };

  return exports;
});
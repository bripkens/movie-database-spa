define(["config"], function(config) {
  "use strict";

  var exports = {};

  var formatStringRegex = /%/;

  exports.format = function(message) {
    var result = message;
    for (var i = 1; i < arguments.length; i++) {
      result = result.replace(formatStringRegex, arguments[i]);
    }
    return result;
  };

  exports.assert = function(bool, message) {
    if (config.enableAssertions && !bool) {
      var error = "Assertion error: " + message;

      var args = Array.prototype.slice.call(arguments, 2);
      args.unshift(error);

      throw new Error(exports.format.apply(this, args));
    }
  };

  return exports;
});
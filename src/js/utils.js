define(["config"], function(config) {
  "use strict";

  var exports = {};

  var formatStringRegex = /\\{0}%/;
  var replaceEscapeCharacterRegex = /\\%/;

  exports.format = function(message) {
    var result = message;
    for (var i = 1; i < arguments.length; i++) {
      result = result.replace(formatStringRegex, arguments[i]);
    }
    return result.replace(replaceEscapeCharacterRegex, "%");
  };

  exports.assert = function(bool, message) {
    if (config.enableAssertions && !bool) {
      var error = "Assertion error: " + message;

      var args = Array.prototype.slice.call(arguments, 2);
      args.unshift(error);

      throw new Error(exports.format.apply(this, args));
    }
  };

  exports.assertFunction = function(fn) {
    if (config.enableAssertions && typeof fn !== "function") {
      var args = Array.prototype.slice.call(arguments);
      args[0] = false;
      exports.assert.apply(this, args);
    }
  };

  exports.onlyAllowInUnitTest = function(fn) {
    var outerArgs = arguments;

    return function() {
      if (config.unitTestModus === true) {
        fn.apply(this, arguments);
      } else {
        exports.assert(false, "This function can only be called in " +
          "unitTestingMode.");
      }
    };
  };

  return exports;
});
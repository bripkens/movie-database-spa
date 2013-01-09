define(["config"], function(config) {
  "use strict";

  var exports = {};

  var formatStringRegex = /((\\)?%)/g;
  var replaceEscapeCharacterRegex = /\\%/g;

  exports.format = function(message) {
    var result = "";

    var argIndex = 1;
    var escape = false;
    for (var i = 0; i < message.length; i++) {
      var c = message.charAt(i);
      if (c === "\\") {
        escape = true;
      } else if (c === "%") {
        if (escape) {
          result += "%";
        } else if (argIndex < arguments.length) {
          result += arguments[argIndex];
          argIndex += 1;
        }
        escape = false;
      } else {
        if (escape) {
          result += "\\";
        }
        result += c;
        escape = false;
      }
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
/*global describe:false,expect:false,rIt:false*/
/*jshint loopfunc:false */

describe("Controller: ", function () {
  "use strict";

  rIt("should define a partial", ["controller/all"], function(all) {
    expect(all.length).toBeGreaterThan(0);
    for (var i = 0; i < all.length; i++) {
      var controller = all[i];
      if (controller.needsPartial !== false) {
        expect(controller.partial).toBeTruthy();
      }
    }
  });

  rIt("parameters should match $inject",
      ["controller/all"],
      function(all) {

    var extractParametersRegex = /function.*?\((.*?)\)/i;
    all.forEach(function(controller) {
      var match = controller.toString().match(extractParametersRegex);
      expect(match).toBeTruthy();

      var parameterString = match[1];

      if (parameterString.length > 0) {
        var parameters = parameterString.split(/\s*,\s*/);

        // validate parameter number
        expect(controller.$inject.length).to(function(actual) {
          var message = controller.controllerName + " has " +
            parameters.length + " parameters, but defines " +
            actual + " dependencies.";

          return {
            ok: actual === parameters.length,
            message: message
          };
        });

        // validate each parameter's name
        parameters.forEach(function(parameter, i) {
          expect(parameter).to(function(actual) {
            var expected = controller.$inject[i];
            var message = controller.controllerName + ": expected" +
              " parameter " + expected + ", but found " + actual +
              " at position " + i + ".";
            return {
              ok: actual === expected,
              message: message
            };
          });
        });
      }
    });
  });
});
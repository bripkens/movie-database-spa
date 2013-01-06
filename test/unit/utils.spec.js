/*global describe:false,expect:false,rIt:false*/

describe("utils", function() {
  "use strict";

  describe("format", function() {
    rIt("should format single param", ["utils"], function(utils) {
      expect(utils.format("The Winner is %", "John Doe"))
        .toEqual("The Winner is John Doe");
    });

    rIt("should format multiple params", ["utils"], function(utils) {
      expect(utils.format("% should %", "You", "hack!"))
        .toEqual("You should hack!");
    });
  });

  describe("assert", function() {
    rIt("should not throw errors when successful",
        ["config", "utils"],
        function(config, utils) {
      config.enableAssertions = true;
      utils.assert(true, "Some message");
    });

    rIt("should throw errors", ["config", "utils"], function(config, utils) {
      config.enableAssertions = true;
      try {
        utils.assert(false, "The error is: %", "Unknown");
        throw new Error("This should fail!");
      } catch (e) {
        expect(e.message).toEqual("Assertion error: The error is: Unknown");
      }
    });

    rIt("should not throw errors when deactivated",
        ["config", "utils"],
        function(config, utils) {
       config.enableAssertions = false;

       try {
        utils.assert(false, "Some message");
       } finally {
        config.enableAssertions = true;
       }
    });
  });


});
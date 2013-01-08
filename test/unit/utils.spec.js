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

    rIt("allows escaping of params", ["utils"], function(utils) {
      expect(utils.format("% get %\\% on the %!", "You", "5", "price"))
        .toEqual("You get 5% on the price!");
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

  describe("assertFunction", function() {
    rIt("should identify functions", ["config", "utils"],
        function(config, utils) {
      config.enableAssertions = true;
      utils.assertFunction(describe, "This is a valid function");
    });

    rIt("should fail for != function", ["config", "utils"],
        function(config, utils) {
      config.enableAssertions = true;
      try {
        utils.assert(false, "I need a %", "callback");
        throw new Error("This should fail!");
      } catch (e) {
        expect(e.message).toEqual("Assertion error: I need a callback");
      }
    });
  });

  describe("onlyAllowInUnitTest", function() {
    var functionCalled = false;
    var testFn = function() {
      functionCalled = true;
    };

    rIt("should fail for mode != unit test",
        ["config", "utils"],
        function(config, utils) {
      functionCalled = false;
      config.unitTestModus = false;
      var wrappedFn = utils.onlyAllowInUnitTest(testFn);

      try {
        wrappedFn();
      } catch (e) {
        // the assertion error is the right one in this case
        expect(e.message.indexOf("Assertion error")).not.toEqual(-1);
      }
      expect(functionCalled).toBe(false);
    });

    rIt("should work in unit test mode",
        ["config", "utils"],
        function(config, utils) {
      functionCalled = false;
      config.unitTestModus = true;
      var wrappedFn = utils.onlyAllowInUnitTest(testFn);
      wrappedFn();
      expect(functionCalled).toBe(true);
    });
  });
});
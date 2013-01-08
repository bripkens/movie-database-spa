/*global describe:false,expect:false,rIt:false,beforeEach:false*/

describe("eventbus", function() {
  "use strict";

  var aOneCalled = false;
  var aTwoCalled = false;
  var bCalled = false;

  var aOneListener = function() { aOneCalled = true; };
  var aTwoListener = function() { aTwoCalled = true; };
  var bListener = function() { bCalled = true; };

  var callAndExpect = function(eventbus, eventToCall,
      shouldAOneBeCalled,
      shouldATwoBeCalled,
      shouldBBeCalled) {

    aOneCalled = false;
    aTwoCalled = false;
    bCalled = false;

    eventbus.fire(eventToCall);

    expect(aOneCalled).toBe(shouldAOneBeCalled);
    expect(aTwoCalled).toBe(shouldATwoBeCalled);
    expect(bCalled).toBe(shouldBBeCalled);
  };

  rIt("reset should only be allowed in unit testing mode",
      ["config", "eventbus"],
      function(config, eventbus) {
    config.unitTestModus = true;
    eventbus._reset();

    config.unitTestModus = false;
    try {
      eventbus._reset();
      throw new Error("This should not be allowed!");
    } catch (e) {
      // expected exception
    }
  });

  rIt("listeners should be called",
      ["config", "eventbus"],
      function(config, eventbus) {
    config.unitTestModus = true;
    eventbus._reset();

    var aOneIdentifier = eventbus.addListener("a", aOneListener);
    var aTwoIdentifier = eventbus.addListener("a", aTwoListener);
    var bIdentifier = eventbus.addListener("b", bListener);

    callAndExpect(eventbus, "noListeners", false, false, false);
    callAndExpect(eventbus, "a", true, true, false);
    callAndExpect(eventbus,"b", false, false, true);

    eventbus.removeListener("a", aOneIdentifier);
    callAndExpect(eventbus,"a", false, true, false);
    callAndExpect(eventbus,"b", false, false, true);

    eventbus.removeListener("b", bIdentifier);
    callAndExpect(eventbus,"a", false, true, false);
    callAndExpect(eventbus,"b", false, false, false);

    eventbus.removeListener("a", aTwoIdentifier);
    callAndExpect(eventbus,"a", false, false, false);
    callAndExpect(eventbus,"b", false, false, false);
  });

  // call with property
  // fallback for scopes
});
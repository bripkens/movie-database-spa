/*global describe:false,expect:false,rIt:false*/

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

});
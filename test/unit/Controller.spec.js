/*global describe:false,it:false,expect:false,runs:false,waitsFor:false*/



describe("Controller: ", function () {
  "use strict";

  var done = false;

  it("should define a partial", function() {
    runs(function() {
      require(["controller/all"], function(all) {
        expect(all.length).toBeGreaterThan(0);
        for (var i = 0; i < all.length; i++) {
          var controller = all[i];
          if (controller.needsPartial !== false) {
            expect(controller.partial).toBeTruthy();
          }
        }
        done = true;
      });
    });
  });


  waitsFor(function() {
    return done;
  });

});
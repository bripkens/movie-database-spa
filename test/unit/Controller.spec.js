/*global describe:false,it:false,expect:false,AppCtrl:false,beforeEach:false*/

describe("Controller: ", function () {
  "use strict";

  var validateControllerDefinesPartial = function(name, ctrl) {
    it(name + " should define a partial", function() {
      expect(ctrl.partial).toBeTruthy();
    });
  };

  for (var key in window) {
    if (window.hasOwnProperty(key) && key.indexOf("Ctrl") !== -1) {
      var controller = window[key];
      if (controller.needsPartial !== false) {
        validateControllerDefinesPartial(key, controller);
      }
    }
  }

});
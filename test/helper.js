/*global it:false,runs:false,waitsFor:false,beforeEach:false*/


this.rIt = function rIt(name, dependencies, test) {
  "use strict";

  it(name, function() {
    var done = false;
    var scope = this;

    runs(function() {
      require(dependencies, function() {
        test.apply(scope, arguments);
        done = true;
      });
    });

    waitsFor(function() {
      return done;
    });
  });
};

beforeEach(function() {
  "use strict";
  this.addMatchers({
    to: function(delegate) {
      var result = delegate(this.actual);

      this.message = function() {
        return result.message || "Expect " + this.actual + " to be ?";
      };

      return result.ok;
    }
  });
});
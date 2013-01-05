/*global it:false,runs:false,waitsFor:false*/
function rIt(name, dependencies, test) {
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
}
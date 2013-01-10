/*global console:false */
define(["angularUtils"], function(angularUtils) {
  "use strict";

  function controller() {
  }

  return angularUtils.defineController({
    name: "ErrorCtrl",
    controller: controller,
    partial: "error.html",
    dependencies: []
  });
});
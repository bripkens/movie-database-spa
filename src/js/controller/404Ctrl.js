/*global console:false */
define(["angularUtils"], function(angularUtils) {
  "use strict";

  function constructor() {
  }

  return angularUtils.defineController({
    name: "404Ctrl",
    constructor: constructor,
    partial: "404.html",
    dependencies: []
  });
});
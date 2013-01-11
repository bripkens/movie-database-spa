define(["angularUtils"], function(angularUtils) {
  "use strict";

  function controller() {
  }

  return angularUtils.defineController({
    name: "404Ctrl",
    controller: controller,
    partial: "404.html",
    dependencies: []
  });
});
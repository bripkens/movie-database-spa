define(["app", "config"], function(app, config) {
  "use strict";

  return app.directive("notification", function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {
        title: "=",
        type: "=",
        onHide: "&",
        visible: "="
      },
      templateUrl: config.templatePath.directives + "notification.html"
    };

  });

});
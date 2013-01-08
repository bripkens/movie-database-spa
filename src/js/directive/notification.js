/*global console:false */
define(["app", "angular", "utils"], function(app, angular, utils) {
  "use strict";

  return app.directive("notification", function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {
        title: "=",
        type: "=",
        show: "="
      },
      templateUrl: "/partials/directives/notification.html",
      link: function(scope, element, attrs) {
        var button = angular.element(element.children()[0]);

        button.bind("click", function() {
          element.remove();
        });
      }
    };

  });

});
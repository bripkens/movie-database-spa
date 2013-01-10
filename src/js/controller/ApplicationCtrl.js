define(["angularUtils", "config", "utils", "eventbus", "events", "lodash"],
    function(angularUtils, config, utils, eventbus, events, _) {
  "use strict";

  function controller($scope, $log, $timeout, $location) {
    $scope.notification = null;
    $scope.pageTitle = config.pageTitleFallback;
    $scope.loading = true;

    $scope.onHide = function() {
      $scope.notification.visible = false;
    };

    eventbus.addListener(events.showNotification, function(notification) {
      var notificationId = _.uniqueId();
      $scope.notification = {
        id: notificationId,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        visible: true
      };

      // automatically remove the notification after
      // config.notificationVisibilityTime
      $timeout(function() {
        if ($scope.notification && $scope.notification.id === notificationId) {
          $scope.notification.visible = false;
        }
      }, config.notificationVisibilityTime);
    });

    $scope.$on("$routeChangeSuccess", function(e, current, previous) {
      $scope.loading = false;

      /*
       * Unfortunately the $routeChangeSuccess function is called before
       * the controller is initialised. As a result we need delay the access
       * to the controller's pageTitle property.
       */
      $timeout(function() {
        var pageTitle = e.currentScope.pageTitle;
        if (typeof pageTitle === "function") {
          pageTitle = pageTitle();
        }

        if (pageTitle) {
          pageTitle = utils.format(config.pageTitle, pageTitle);
        } else {
          pageTitle = config.pageTitleFallback;
        }

        $scope.pageTitle = pageTitle;
      });
    });

    $scope.$on("$routeChangeError", function(e, current, prev, rejection) {
      $scope.loading = false;
      $location.path("/error");
    });

    $scope.$on("$routeChangeStart", function(e, next, current) {
      $scope.loading = true;
    });
  }

  return angularUtils.defineController({
    name: "ApplicationCtrl",
    controller: controller,
    needsPartial: false,
    dependencies: ["$scope", "$log", "$timeout", "$location"]
  });
});
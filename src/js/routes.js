define(["controller/404Ctrl",
        "controller/MovieDetailCtrl",
        "controller/MovieOverviewCtrl",
        "controller/MovieEditCtrl",
        "controller/CommentOverviewCtrl"],
        function(
          _404Ctrl,
          MovieDetailCtrl,
          MovieOverviewCtrl,
          MovieEditCtrl,
          CommentOverviewCtrl) {
  "use strict";

  return {
    paths: {
      "/": "/movies",
      "/404": _404Ctrl,
      "/movies": MovieOverviewCtrl,
      "/movies/:movieId": MovieDetailCtrl,
      "/movies/:movieId/edit": MovieEditCtrl,
      "/movies/:movieId/comments": CommentOverviewCtrl
    }, otherwise: "/404"
  };

});
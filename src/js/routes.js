define(["controller/404Ctrl",
        "controller/ErrorCtrl",
        "controller/MovieDetailCtrl",
        "controller/MovieOverviewCtrl",
        "controller/MovieEditCtrl",
        "controller/MovieAddCtrl",
        "controller/CommentOverviewCtrl",
        "controller/NotImplementedCtrl"],
        function(
          _404Ctrl,
          ErrorCtrl,
          MovieDetailCtrl,
          MovieOverviewCtrl,
          MovieEditCtrl,
          MovieAddCtrl,
          CommentOverviewCtrl,
          NotImplementedCtrl) {
  "use strict";

  return {
    paths: {
      "/": "/movies",
      "/error": ErrorCtrl,
      "/notfound": _404Ctrl,
      "/notimplemented": NotImplementedCtrl,
      "/movies": MovieOverviewCtrl,
      "/movies/new": MovieAddCtrl,
      "/movies/:movieId": MovieDetailCtrl,
      "/movies/:movieId/edit": MovieEditCtrl,
      "/movies/:movieId/comments": CommentOverviewCtrl
    }, otherwise: "/notfound"
  };

});
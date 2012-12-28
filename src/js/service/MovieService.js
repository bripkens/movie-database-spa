/*global console:false */
angular.module("DataRepository", []).
    factory("MovieRepository", function() {
  "use strict";

  return { query: function() {
    console.log("Getting data!", arguments);
  }};

});
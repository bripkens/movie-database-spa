define(["lodash"], function(_) {
  "use strict";

  var eventPrefix = "event";
  var id = _.uniqueId.bind(_, eventPrefix);

  return {
    tags: {
      // fn()
      update: id()
    }
  };
});
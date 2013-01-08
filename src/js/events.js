define(["lodash"], function(_) {
  "use strict";

  var eventPrefix = "event";

  var id = _.uniqueId.bind(_, eventPrefix);

  return {
    // fn(newTitle)
    pageTitle: id(),

    tags: {
      // fn()
      update: id()
    }
  };
});
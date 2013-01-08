define(["lodash"], function(_) {
  "use strict";

  var eventPrefix = "event";

  return {
    tags: {
      "update": _.uniqueId(eventPrefix)
    }
  };
});
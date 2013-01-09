define(["lodash"], function(_) {
  "use strict";

  var eventPrefix = "event";
  var id = _.bind(_.uniqueId, _, eventPrefix);

  return {
    /*
     * Fired when a notification should be displayed
     *
     * Listener signature: fn(notification : Object)
     *
     * The notification object has the following properties
     *
     *  type: String (one of success|info|error|warning)
     *  title: String
     *  message: String
     */
    showNotification: id(),

    tags: {
      /*
       * Event is fired when a tag is added.
       *
       * Listener signature: fn(newTag : String)
       */
      added: id()
    }
  };
});
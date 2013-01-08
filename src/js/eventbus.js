define(["lodash", "utils"], function(_, utils) {
  "use strict";

  /*
   * Object structure
   *
   * listener = {
   *   eventName: {
   *     listenerIdentifier: {
   *       callback: function(){}
   *       scope: {}
   *     }
   *   }
   * }
   */
  var events = {};
  var listenerIdentifierPrefix = "eventbus-listener";
  var exports = {};

  var getListeners = function(eventName) {
    var listeners = events[eventName];

    if (!listeners) {
      listeners = events[eventName] = {};
    }

    return listeners;
  };

  exports.addListener = function(event, callback, scope) {
    utils.assert(event, "'%' is not a valid event name.", event);
    utils.assertFunction(callback,
        "The second parameter should be a callback, but got: %.", callback);

    var identifier = _.uniqueId(listenerIdentifierPrefix);
    var listeners = getListeners(event);
    listeners[identifier] = {
      callback: callback,
      scope: scope || null
    };

    return identifier;
  };

  exports.removeListener = function(event, identifier) {
    utils.assert(event, "'%' is not a valid event name.", event);
    utils.assert(identifier, "'%' is not a valid listener identifier.",
        identifier);

    var listeners = getListeners(event);
    delete listeners[identifier];
  };

  exports.fire = function(event, parameters, scope) {
    var listeners = getListeners(event);
    _.each(listeners, function(listener) {
      var callScope = listener.scope || scope;
      listener.callback.apply(callScope, parameters);
    });
  };

  exports._reset = utils.onlyAllowInUnitTest(function() {
    events = {};
  });

  return exports;
});
/*global module:false,require:false,console:false */
var exec = require("child_process").exec;

module.exports = function() {
  exec("osascript -e 'tell application \"Google Chrome\" " +
                      "to tell the active tab of its first window' " +
                 "-e 'reload' " +
                 "-e 'end tell'");
};
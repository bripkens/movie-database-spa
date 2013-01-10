require(["app", "moment"], function(app, moment) {
  "use strict";

  var serviceDateFormat = "YYYY-MM-DD";

  app.filter("strDateFormat", function() {
    return function(str, format) {
      var date = moment(str, serviceDateFormat);
      return date ? date.format(format || "LL") : "";
    };
  });

  app.filter("strDateTimeFormat", function() {
    return function(str) {
      var date = moment(str);
      return date ? date.format("LLL") : "";
    };
  });
});
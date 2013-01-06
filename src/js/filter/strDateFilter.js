require(["app", "moment"], function(app, moment) {
  "use strict";

// THH:mm:ss.SSSZ
  var serviceDateFormat = "YYYY-MM-DD";

  app.filter("strDateFormat", function() {
    return function(str, format) {
      var date = moment(str, serviceDateFormat);
      return date.format(format || "LL");
    };
  });

  app.filter("strDateTimeFormat", function() {
    return function(str) {
      var date = moment(str);
      return date.format("LLL");
    };
  });
});
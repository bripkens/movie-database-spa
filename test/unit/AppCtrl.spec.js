/*global describe:false,it:false,expect:false,AppCtrl:false,beforeEach:false*/

describe("tagbook", function () {
  "use strict";

  describe("AppCtrl", function () {
    var scope = {};
    var ctrl = new AppCtrl(scope);

    beforeEach(function() {
      scope = {};
      ctrl = new AppCtrl(scope);
    });

    it("should start with an empty list", function () {
      expect(scope.bookmarks.length).toBe(0);
    });

    it("should add new bookmarks", function (){
      var description = scope.description = "Ben's Blog";
      var url = scope.url = "http://blog.bripkens.de";
      var tags = scope.tags = "ben ripkens blog personal java javascript";

      scope.addBookmark();
      expect(scope.bookmarks.length).toBe(1);

      var bookmark = scope.bookmarks[0];
      expect(bookmark.description).toEqual(description);
      expect(bookmark.url).toEqual(url);
      expect(bookmark.tags.length).toBe(6);
    });
  });
});
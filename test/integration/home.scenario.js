/*global
  describe:false,
  it:false,
  expect:false,
  AppCtrl:false,
  beforeEach:false,
  browser:false,
  repeater:false,
  input:false,
  pause:false,
  dump:false,
  element:false
*/

describe("tagbook App", function() {
  "use strict";

  describe("Home View", function() {

    beforeEach(function() {
      browser().navigateTo("/index.html");
    });


    it("should add new bookmarks", function() {
      expect(repeater("ul li").count()).toBeGreaterThan(0);

      input("url").enter("http://blog.bripkens.de");
      input("description").enter("Ben's Blog");
      input("tags").enter("ben ripkens blog");

      element(":button").click();
      expect(repeater("ul li").count()).toBe(1);
    });
  });
});
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

describe("movie overview", function() {
  "use strict";

  beforeEach(function() {
    browser().navigateTo("/");
    // expect(browser().location().url()).toBe('/movies');
  });


  it("should list movies", function() {
    expect(repeater("table tbody tr").count()).toBeGreaterThan(0);
    // element(":button").click();
    // expect(repeater("ul li").count()).toBe(1);
  });
});

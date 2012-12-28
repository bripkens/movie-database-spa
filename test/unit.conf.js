/*global
 basePath:true,
 files:true,
 JASMINE:false,
 JASMINE_ADAPTER:false,
 autoWatch:true,
 browsers:true,
 singleRun:true,
 junitReporter:true,
 reporters:true,
 preprocessors: true
*/
basePath = "../";

files = [
  JASMINE,
  JASMINE_ADAPTER,
  "src/lib/angular.js",
  "src/lib/angular-resource.js",
  "src/lib/lodash.js",
  "src/js/**/*.js",
  "test/unit/**/*.js"
];

browsers = ["PhantomJS"];
autoWatch = false;
singleRun = true;

reporters = ['progress', 'coverage'];

preprocessors = {
  "**/src/js/*.js": "coverage"
};
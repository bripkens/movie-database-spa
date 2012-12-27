/*global
 basePath:true,
 files:true,
 ANGULAR_SCENARIO:false,
 ANGULAR_SCENARIO_ADAPTER:false,
 autoWatch:true,
 browsers:true,
 singleRun:true,
 junitReporter:true,
 reporters:true,
 preprocessors:true,
 coverageReporter:true,
 proxies:true
*/

basePath = "../";

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  "test/integration/**/*.js"
];

browsers = ["Chrome"];
autoWatch = false;
singleRun = true;

proxies = {
  "/": "http://localhost:8000/"
};

reporters = ['progress'];

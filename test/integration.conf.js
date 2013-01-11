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
 proxies:true,
 port:true,
 urlRoot:true
*/

basePath = "../";

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  "test/integration/**/*"
];

urlRoot = '/__testacular/';

port = 8181;

browsers = ["Chrome"];
autoWatch = true;
singleRun = false;

proxies = {
  "/": "http://localhost:8000/"
};
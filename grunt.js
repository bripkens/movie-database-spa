/*global module:false,require:false*/
module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: "<json:package.json>",
    meta: {
      banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
        "<%= grunt.template.today('yyyy-mm-dd') %>\n" +
        "<%= pkg.homepage ? '* ' + pkg.homepage + '\n' : '' %>" +
        "* Copyright (c) <%= grunt.template.today('yyyy') %> " +
        " <%= pkg.author.name %>;" +
        " Licensed <%= _.pluck(pkg.licenses, 'type').join('') %> */"
    },
    lint: {
      files: ["grunt.js", "dev-server.js", "src/js/**/*.js", "test/**/*.js"]
    },
    watch: {
      files: ["src/**/*", "test/**/*"],
      tasks: "lint compile:development reload"
    },
    server: {
      port: 8000,
      base: "./target"
    },
    concat: {
      development: {
        src: ["src/lib/require.js",
              "target/js/app-without-require.js"],
        dest: "target/js/app.js"
      }
    },
    min: {
      production: {
        src: ["src/lib/require.js",
              "target/js/app-without-require.js"],
        dest: "target/js/app.js"
      }
    },
    requirejs: {
      compile: {
        options: {
          name: "main",
          baseUrl: "src/js",
          optimize: "none",
          out: "target/js/app-without-require.js",
          shim: {
            angular: {
              exports: 'angular'
            }
          },
          paths: {
            jquery: "../lib/jquery",
            angular: "../lib/angular",
            lodash: "../lib/lodash",
            moment: "../lib/moment"
          }
        }
      }
    },
    copy: {
      production: {
        files: {
          "target/": ["src/*.html",
                      "src/*.ico",
                      "src/*.txt",
                      "src/partials/**/*",
                      "src/img/**/*"]
        }
      }
    },
    jshint: {
      options: {
        bitwise: true,
        boss: true,
        browser: true,
        curly: true,
        camelcase: true,
        eqeqeq: true,
        eqnull: true,
        forin: true,
        immed: true,
        indent: 2,
        latedef: true,
        maxcomplexity: 4,
        maxdepth: 3,
        maxparams: 3,
        maxstatements: 10,
        maxlen: 80,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        quotmark: "double",
        sub: true,
        strict: true,
        trailing: true,
        undef: true,
        unused: true
      }, globals: {
        require: false,
        define: false
      }
    },
    less: {
      development: {
        options: {
        },
        files: {
          "target/css/app.css": "src/less/app.less"
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "target/css/app.css": "src/less/app.less"
        }
      }
    },
    testacularServer: {
      unit: {
        options: {
          keepalive: true
        },
        configFile: "test/unit.conf.js"
      },
      integration: {
        options: {
          keepalive: true
        },
        configFile: "test/integration.conf.js"
      },
      dev: {
        options: {
          keepalive: true
        },
        configFile: "test/unit.conf.js",
        singleRun: false,
        autoWatch: true
      }
    },
    clean: ["target/"]
  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-testacular");

  var server = require("./build/server");
  grunt.registerTask("server", "Custom development server", function() {
    server();
  });

  var reload = require("./build/reload");
  grunt.registerTask("reload", "reload Chrome on OS X", function() {
    reload();
  });

  var combineTemplates = require("./build/combineTemplates");
  grunt.registerTask("combineTemplates", "Combine the partials", function() {
    combineTemplates(grunt.log.writeln.bind(grunt.log), this.async());
  });

  grunt.registerTask("compile:production",
    "less:production copy requirejs min combineTemplates");
  grunt.registerTask("compile:development",
    "less:development copy requirejs concat combineTemplates");

  grunt.registerTask("default", "lint compile:production");
  grunt.registerTask("run", "compile:development server watch");

  grunt.registerTask("test", "testacularServer:dev");
  grunt.registerTask("itest", "testacularServer:integration");
  grunt.registerTask("travis", "lint compile:production testacularServer:unit");
};

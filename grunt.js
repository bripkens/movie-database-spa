/*global module:false*/
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
      files: ["grunt.js", "js/**/*.js", "test/**/*.js"]
    },
    watch: {
      files: ["<config:lint.files>", "less/**/*.less"],
      tasks: "less:development lint"
    },
    server: {
      port: 8000,
      base: "."
    },
    jshint: {
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        camelcase: true,
        forin: true,
        noempty: true,
        nonew: true,
        quotmark: "double",
        unused: true,
        strict: true,
        trailing: true,
        indent: 2,
        maxparams: 3,
        maxdepth: 3,
        maxstatements: 10,
        maxcomplexity: 4,
        maxlen: 80
      },
      globals: {}
    },
    less: {
      development: {
        options: {
        },
        files: {
          "css/app.css": "less/app.less"
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "css/app.css": "less/app.less"
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
        browsers: ["Chrome"],
        singleRun: false,
        autoWatch: true
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-testacular");

  // Default task.
  grunt.registerTask("default",
    "lint less:production testacularServer:unit");
  grunt.registerTask("run",
    "less:development server watch");
  grunt.registerTask("test",
    "testacularServer:dev");
  grunt.registerTask("itest",
    "testacularServer:integration");
  grunt.registerTask("travis", "lint");
};

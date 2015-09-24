/*global module:false, require*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**!\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * <%= pkg.homepage ? " " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n **/\n\n',
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js']
      }
    },
    jasmine : {
      src : 'lib/**/*.js',
      options : {
        vendor: 'test/vendor/Sinon/sinon-1.14.1.js',
        specs: 'test/spec/**/*.js',
        helpers: 'test/helpers/**/*.js',
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfigFile: 'lib/js/main.js',
          requireConfig: {
            baseUrl: './',
            paths: {
              'jQuery': "node_modules/jquery/dist/jquery.min",
              'PIXI': 'node_modules/PIXI/pixi',
              'Brick': 'lib/js/Brick',
              'BrickTexture': 'lib/js/BrickTexture',
              'Wall': 'lib/js/Wall',
              'StartButton': 'lib/js/StartButton'
            }
          }
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "./lib/js/",
          mainConfigFile: "lib/js/main.js",
          include: ['main.js', 'Wall.js', 'BrickTexture.js', 'StartButton.js', 'Brick.js'],
          out: "dist/js/wall.min.js"
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            cwd: 'node_modules/jquery/dist/', src: ['jquery.min.js', 'jquery.min.map'], dest: 'dist/js/jquery/dist/', expand: true
          },
          {
            cwd: 'node_modules/PIXI/', src: ['pixi.js'], dest: 'dist/js/PIXI/', expand: true
          },
          {
            cwd: 'node_modules/requirejs/', src: ['require.js'], dest: 'dist/js/requirejs/', expand: true
          }
        ]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('copylibs', ['copy']);
  grunt.registerTask('default', ['jshint', 'jasmine', 'requirejs', 'copylibs']);

};

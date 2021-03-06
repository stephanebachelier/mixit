/*global module:false*/
module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['dist/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      closure: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.closure.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      closure: {
        src: '<%= concat.closure.dest %>',
        dest: 'dist/<%= pkg.name %>.closure.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      libtest: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    jscs: {
      libtest: {
        src: '<%= jshint.libtest.src %>'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    lintspaces: {
      options: {
        editorconfig: '.editorconfig'
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      libtest: {
        src: ['lib/**/*.js', 'tests/*.spec.js']
      }
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },

      all: {
        src: ['tests/*.spec.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile', 'jscs:gruntfile', 'lintspaces:gruntfile']
      },
      libtest: {
        files: '<%= jshint.libtest.src %>',
        tasks: ['jshint:libtest', 'jscs:libtest', 'lintspaces:libtest', 'build', 'test']
      }
    },
    'release-it': {
      options: {
        pkgFiles: ['package.json', 'bower.json'],
        commitMessage: 'bump release %s',
        tagName: '%s',
        tagAnnotation: 'Release %s',
        buildCommand: false,
        publish: true
      }
    },
    umd: {
      lib: {
        src: 'lib/<%= pkg.name %>.js',
        dest: '<%= concat.dist.dest %>',
        indent: '  ',
        objectToExport: 'mixit'
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['lint', 'build', 'test']);

  grunt.registerTask('build', ['umd:lib', 'concat', 'uglify']);

  grunt.registerTask('test', ['simplemocha']);

  grunt.registerTask('lint', ['jshint', 'jscs', 'lintspaces']);
};

/*global module:false, require:true, console:true */
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-exec');

  var banner = [
        '/*! <%= pkg.name %> - v<%= pkg.version %> - ',
        '<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.homepage %> */\n'
      ].join('');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commit: false,
        createTag: false,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false
      }
    },
    yuidoc: {
      compile: {
        name: 'Rekapi',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        logo: '../../demo/img/rekapi-logo-200.png',
        options: {
          paths: ['src', 'renderers'],
          themedir: 'yuidoc_theme',
          outdir: 'api'
        }
      }
    },
    exec: {
      symlink: 'rm -rf src renderers && ln -s bower_components/rekapi/src src && ln -s bower_components/rekapi/renderers renderers'
    }
  });

  // Default task.
  grunt.registerTask('default', [
    'exec:symlink',
    'yuidoc'
  ]);

};

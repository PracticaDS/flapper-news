module.exports = function(grunt) {

  grunt.initConfig({

  	wiredep: {
      task: {
        src: ['views/**/*.ejs']
      },
      options : {
      	ignorePath : "../public"	
      }
    },

    jshint: {
        node: {
            files: {
                src: [
                    'Gruntfile.js',
                    'models/**/*.js',
                    'routes/**/*.js',
                    'app.js',
                    'test/spec/**/*.js'
                ]
            },
            options: {
                jshintrc: '.jshintrc-server'
            }
        },
        browser: {
            files: {
                src: [
                    'public/javascripts/*.js',
                ]
            },
            options: {
                jshintrc: '.jshintrc-client'
            }
        }
    }

  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // TASKS
  grunt.registerTask('default', 'jshint');
};

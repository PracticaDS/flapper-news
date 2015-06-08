module.exports = function(grunt) {

  grunt.initConfig({

  	wiredep: {
      task: {
        src: ['views/**/*.ejs']
      },
      options : {
      	ignorePath : "../public"	
      }
    }

  });

  grunt.loadNpmTasks('grunt-wiredep');
};

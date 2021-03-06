module.exports = function(grunt) {

  grunt.initConfig({
    sonarServerIp : "192.168.59.103",
    // READ Package.json
    pkg: grunt.file.readJSON('package.json'),

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
    },

    sonarRunner: {
        analysis: {
            options: {
                debug: true,
                separator: '\n',
                sonar: {
                    host: {
                        url: 'http://<%= sonarServerIp%>:9000'
                    },
                    jdbc: {
                        url: 'jdbc:h2:tcp://<%= sonarServerIp%>:9092/sonar',
                        username: 'sonar',
                        password: 'sonar'
                    },
 
                    projectKey: 'sonar:grunt-sonar-runner:0.1.0',
                    projectName: '<%=pkg.name%>',
                    projectVersion: '<%=pkg.version%>',
                    sources: ['app.js','public/javascripts/angularApp.js','models','routes', 'test'].join(','),
                    language: 'js',
                    sourceEncoding: 'UTF-8'
                }
            }
        }
    },

    mongoimport: {
        options: {
        db : 'heroku_9jjsr8g7',
        host : 'ds043972.mongolab.com',
        username: "heroku_9jjsr8g7",
        password: process.env.MONGOLAB_PASSWD,
        port: '43972',
        stopOnError : true,
        collections : [
          { 
            name : 'posts', 
            type : 'json', 
            file : 'data/posts.json', 
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          },
          { 
            name : 'comments', 
            type : 'json', 
            file : 'data/comments.json', 
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          }
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // SONAR
  grunt.loadNpmTasks('grunt-sonar-runner');

  // TASKS
  grunt.registerTask('default', 'jshint');

  grunt.loadNpmTasks('grunt-mongoimport');
};

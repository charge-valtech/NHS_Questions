module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  

    concat: {
      options: {
        separator: ';'
      },
      demo: {
        src: ['www/_assets/**/*.js'],
        dest: 'dist/_assets/js/<%= pkg.name %>.js'
      },
      dist: {
        src: ['www/_assets/js/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
        // Metadata.
        meta: {
            sassPath: 'www/_assets/scss/',
            cssPath: 'www/_assets/css/',
        },



    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'www/_assets/js/modules/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },


    compass: { 
        demo: {
          options: { 
            sassDir: 'www/_assets/scss',
            cssDir: 'demo/_assets/css',
            environment: 'production'
          }
        },
        dist: {
          options: { 
            sassDir: 'www/_assets/scss',
            cssDir: 'dist/_assets/css',
            environment: 'production'
          }
        },        
        dev: { 
          options: {
            sassDir: 'www/_assets/scss',
            cssDir: 'www/_assets/css'
          }
        }
      },   

    cssmin: {
                combine: {
                    files: {
                    'www/_assets/css/main.css': ['www/_assets/css/*.css'] 
                    }
                }
    },   



    bake: { 
        demo: {
            files: {
                "demo/index.html": "www/index.html",
                "demo/employer-role-submission/employer.html": "www/employer-role-submission/employer.html",
                "demo/employer-role-submission/key-dates.html": "www/employer-role-submission/key-dates.html",
                "demo/employer-role-submission/eligibility-criteria.html": "www/employer-role-submission/eligibility-criteria.html",
                "demo/employer-role-submission/preview.html": "www/employer-role-submission/preview.html",
                "demo/employer-role-submission/complete.html": "www/employer-role-submission/complete.html",
                "demo/employer-role-submission/training-provider.html": "www/employer-role-submission/training-provider.html",
                "demo/employer-role-submission/vacancy.html": "www/employer-role-submission/vacancy.html",                                                                                                

            }
        },
        dev: { 
            files: {

            }
        }
      },           
      
    watch: {
            css: {
                files: ['www/_assets/scss/**/*.scss'],
                tasks: ['compass:dev']
            },
            js: { 
                files: ['www/_assets/js/**/*.js'],
                tasks: ['jshint']
            }          
    } 
  });

  grunt.loadNpmTasks( "grunt-bake" );
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');  
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'compass:dev', 'bake:dev', 'watch']); 

  grunt.registerTask('demo', ['jshint', 'compass:demo', 'concat:demo', 'cssmin', 'bake:demo']);   

  grunt.registerTask('dist', ['jshint', 'compass:dist']);     


};
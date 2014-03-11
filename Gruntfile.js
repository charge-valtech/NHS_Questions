module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
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
        dist: {
          options: { 
            sassDir: 'www/_assets/scss',
            cssDir: 'www/_assets/css',
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
      
    watch: {
            css: {
                files: ['www/_assets/scss/**/*.scss'],
                tasks: ['compass:dev']
            },
            js: { // Just watches JavaScript files
                files: ['www/_assets/js/**/*.js'],
                tasks: ['jshint']
            }          
    } 
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');  
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'compass:dev', 'watch']); 

};
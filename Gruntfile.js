module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    concat: {
      options: {
        separator: ';'
      },
      dev: {

      },
      demo: {
        src: ['www/_assets/js/plugins/*.js'],
        dest: 'demo/_assets/js/plugins.js'
      },
      sprint: {
        src: ['www/_assets/js/plugins/*.js'],
        dest: 'sprint/_assets/js/plugins.js'
      },
      dist: {
        src: ['www/_assets/js/plugins/*.js'],
        dest: 'dist/_assets/js/plugins.js'
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
      sprint: {
        options: {
          sassDir: 'www/_assets/scss',
          cssDir: 'sprint/_assets/css',
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
    assemble: {
      options: {
        flatten: false,
        expand: true,

        assets: 'www/_assets',

        layout: 'default.hbs',
        layoutdir: 'www/_templates/layouts',

        partials: ['www/_templates/partials/*.hbs'],
        data: ['www/_templates/data/*.json']
      },

      dev: {
        files: [
          {expand: true, cwd: 'www/_templates/pages/', src: '**/*.hbs', dest: 'www/', ext: '.html'}
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['www/_assets/scss/**/*.scss'],
        tasks: ['compass:dev']
      },
      js: {
        files: ['www/_assets/js/**/*.js'],
        tasks: ['jshint']
      },
      html: {
        files: ['www/_templates/{,*/}*.hbs', 'www/_templates/{,*/*/}*.hbs'],
        tasks: ['assemble']
      }
    },
    connect: {
      server: {
        options: {
          port: 7000,
          base: 'www',
          livereload: true
        }
      }
    },
    copyto: {
      sprint: {
        files: [
          {cwd: 'www/', src: ['**/*'], dest: 'sprint/'}
        ],
        options: {
          ignore: [
            'www/_assets/scss{,/**/*}',
            'www/_templates{,/**/*}'
          ]
        }
      },
    },
    clean: {
      sprint: {
        src: [ 'sprint/' ]
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint', 'compass:dev', 'assemble', 'connect', 'watch']);

  grunt.registerTask('demo', ['jshint', 'concat:demo', 'connect', 'watch']);

  grunt.registerTask('sprint', ['clean:sprint', 'copyto:sprint']);

  grunt.registerTask('dist', ['jshint', 'compass:dist']);


};
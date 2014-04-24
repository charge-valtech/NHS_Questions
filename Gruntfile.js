module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dev: {
        src: ['www/_assets/js/plugins/*.js', 'www/_assets/js/*.js', '!www/_assets/js/scripts.min.js'],
        dest: 'www/_assets/js/scripts.min.js'
      }
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
      files: ['Gruntfile.js'],
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
    modernizr: {
      dist: {
        // [REQUIRED] Path to the build you're using for development.
        "devFile" : "www/_assets/js/vendor/modernizr-2.7.1.js",

        // [REQUIRED] Path to save out the built file.
        "outputFile" : "www/_assets/js/vendor/modernizr-custom.js"
      }
    },
    imageoptim: {
      dev: {
        src: ['www/_assets/img']
      }
    },
    sass: {
      dev: {
        options: {
          includePaths: ['www/_assets/scss'],
          outputStyle: 'compressed',
          sourceComments: 'map'
        },
        files: {
          'www/_assets/css/main.css' : 'www/_assets/scss/main.scss',
          'www/_assets/css/main-ie8.css' : 'www/_assets/scss/main-ie8.scss'
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
        tasks: ['sass']
      },
      js: {
        files: ['www/_assets/js/**/*.js', '!www/_assets/js/scripts.min.js'],
        tasks: ['jshint', 'concat:dev']
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
          livereload: true,
          open: true
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
            'www/_templates{,/**/*}',
            'www/z-backups{,/**/*}',
            'www/_assets/css/*.map'
          ]
        }
      },
      demo: {
        files: [
          {cwd: 'sprint/', src: ['**/*'], dest: 'demo/'}
        ]
      },
      dist: {
        files: [
          {cwd: 'sprint/', src: ['**/*'], dest: 'dist/'}
        ],
        options: {
          ignore: [
            'sprint/_assets/scss{,/**/*}',
            'sprint/_assets/video{,/**/*}',
            'sprint/_templates{,/**/*}',
            'sprint/z-backups{,/**/*}',
            'sprint/employer-role-submission{,/**/*}',
            'sprint/find-an-apprenticeship{,/**/*}',
            'sprint/*.html',
            '!sprint/index.html',
          ]
        }
      }
    },
    clean: {
      sprint: {
        src: [ 'sprint/' ]
      },
      demo: {
        src: [ 'demo/' ]
      },
      dist: {
        src: [ 'dist/' ]
      }
    },
    replace: {
      map: {
        src: ['www/_assets/css/*.css'],
        overwrite: true,
        replacements: [{
          from: 'sourceMappingURL=main.css.map',
          to: 'Map removed'
        },{
          from: 'sourceMappingURL=main-ie8.css.map',
          to: 'Map removed'
        }]
      }
    }

  });

  [
    'assemble',
    'grunt-modernizr',
    'grunt-contrib-imagemin',
    'grunt-imageoptim',
    'grunt-contrib-uglify',
    'grunt-contrib-jshint',
    'grunt-sass',
    'grunt-contrib-concat',
    'grunt-text-replace',
    'grunt-contrib-watch',
    'grunt-contrib-connect',
    'grunt-copy-to',
    'grunt-contrib-clean',
    'grunt-contrib-compress'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });


  grunt.registerTask('imageoptim', ['imageoptim']);

  grunt.registerTask('default', ['modernizr', 'jshint', 'concat:dev', 'sass', 'assemble', 'connect', 'watch']);

  grunt.registerTask('sprint', ['replace:map', 'clean:sprint', 'copyto:sprint']);

  grunt.registerTask('demo', ['clean:demo', 'copyto:demo']);

  grunt.registerTask('dist', ['clean:dist', 'copyto:dist']);


};
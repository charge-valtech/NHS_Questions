module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dev: {
        src: ['www/_assets/js/*.js', '!www/_assets/js/scripts.min.js', '!www/_assets/js/scripts.js'],
        dest: 'www/_assets/js/scripts.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'www/_assets/js/scripts.min.js': ['www/_assets/js/scripts.js']
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
        files: ['www/_assets/js/**/*.js', '!www/_assets/js/scripts.min.js', '!www/_assets/js/scripts.js'],
        tasks: ['jshint', 'concat:dev']
      },
      html: {
        files: ['www/_templates/{,*/}*.hbs', 'www/_templates/{,*/*/}*.hbs'],
        tasks: ['assemble']
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
          {cwd: 'www/', src: ['**/*'], dest: 'dist/'}
        ],
        options: {
          ignore: [
            'www/_assets/scss{,/**/*}',
            'www/_assets/css/*.map',
            'www/_assets/video{,/**/*}',
            'www/_assets/js/plugins{,/**/*}',
            'www/_assets/js/interactions.js',
            'www/_assets/js/scripts.js',
            'www/_templates{,/**/*}',
            'www/z-backups{,/**/*}',
            'www/employer/{,/**/*}',
            'www/find-an-apprenticeship{,/**/*}',
            'www/apprentice-profile{,/**/*}',
            'www/*.html',
            '!www/index.html',
          ]
        }
      },
      fe_toolkit: {
        files: [
          {
            cwd: 'node_modules/govuk_frontend_toolkit/govuk_frontend_toolkit/stylesheets',
            src: ['**/*'],
            dest: 'www/_assets/scss/fe_toolkit/'
          }
        ]
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
      },
      scripts: {
        src: ['www/index.html'],
        overwrite: true,
        replacements: [{
          from: 'scripts.js',
          to: 'scripts.min.js'
        }]
      }
    },
    pngmin: {
      compile: {
        options: {},
        files: [
          {
            src: 'path/to/image.png',
            dest: 'dest/'
          }
        ]
      }
    },
    devUpdate: {
      main: {
        options: {
          updateType: 'report', //just report outdated packages
          reportUpdated: false, //don't report already updated packages
          semver: true, //use package.json semver rules when updating
          packages: { //what packages to check
            devDependencies: true, //only devDependencies
            dependencies: false
          },
          packageJson: null //find package.json automatically
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'www/_assets/css/*.css',
            'www/_assets/js/scripts.js',
            'www/**/*.html'
            ]
        },
        options: {
          ghostMode: {
            clicks: true,
            scroll: true,
            links: true,
            forms: true
            },
          watchTask: true,
          server: {
            baseDir: "www"
          }
        }
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
    'grunt-copy-to',
    'grunt-contrib-clean',
    'grunt-contrib-compress',
    'grunt-pngmin',
    'grunt-browser-sync',
    'grunt-dev-update',
    'grunt-contrib-connect'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });

  grunt.registerTask('copytoolkit', ['devUpdate', 'copyto:fe_toolkit']);

  grunt.registerTask('imageoptim', ['imageoptim']);

  grunt.registerTask('default', ['modernizr', 'jshint', 'concat:dev', 'sass', 'assemble', 'connect', 'watch']);

  grunt.registerTask('sync', ['modernizr', 'jshint', 'concat:dev', 'sass', 'assemble', 'browserSync', 'watch']);

  grunt.registerTask('sprint', ['replace:map', 'clean:sprint', 'copyto:sprint']);

  grunt.registerTask('demo', ['clean:demo', 'copyto:demo']);

  grunt.registerTask('dist', ['uglify:dist', 'replace:map', 'replace:scripts', 'clean:dist', 'copyto:dist']);


};
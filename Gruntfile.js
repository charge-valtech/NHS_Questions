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
    imageoptim: {
      dev: {
        src: ['www/_assets/img']
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: 'www/_assets/scss',
          cssDir: 'www/_assets/css'
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'www/_assets/css/main.css': ['www/_assets/css/main.css']
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
            'www/_templates{,/**/*}',
            'www/z-backups{,/**/*}'
          ]
        },
      },
      demo: {
        files: [
          {cwd: 'www/', src: ['**/*'], dest: 'demo/'}
        ],
        options: {
          ignore: [
            'www/_assets/scss{,/**/*}',
            'www/_templates{,/**/*}',
            'www/z-backups{,/**/*}'
          ]
        },
      },
      dist: {
        files: [
          {cwd: 'www/', src: ['**/*'], dest: 'dist/'}
        ],
        options: {
          ignore: [
            'www/_assets/scss{,/**/*}',
            'www/_templates{,/**/*}',
            'www/z-backups{,/**/*}',
            'www/employer-role-submission{,/**/*}',
            'www/find-an-apprenticeship{,/**/*}',
            'www/*.html',
            '!www/index.html',
          ]
        },
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
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('imageoptim', ['imageoptim']);

  grunt.registerTask('default', ['jshint', 'concat:dev', 'compass:dev', 'assemble', 'connect', 'watch']);

  grunt.registerTask('sprint', ['cssmin:dist', 'clean:sprint', 'copyto:sprint']);

  grunt.registerTask('demo', ['cssmin:dist', 'clean:demo', 'copyto:demo']);

  grunt.registerTask('dist', ['cssmin:dist', 'clean:dist', 'copyto:dist']);


};
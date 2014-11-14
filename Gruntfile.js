module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Simple but very effective cleaning
    clean: {
      dev: [
        'development/'
      ],
      dist: [
        'distribution/'
      ]
    },
    // Minify JavaScript (only)
    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        preserveComments: 'some'
      },
      // For distribution only
      dist: {
        options: {
          compress: {
            drop_console: true
          }
        },
        files: {
          'distribution/assets/main.js': [
            'source/assets/vendor/jquery/*.js',
            'source/assets/vendor/bootstrap/*.js',
            'source/assets/scripts/helpers.js',
            'source/assets/scripts/main.js'
          ]
        }
      },
      // For development just minify the vendors and save to 'build/'
      dev: {
        files: {
          'build/assets/vendor/vendors.min.js': [
            'source/assets/vendor/jquery/*.js',
            'source/assets/vendor/bootstrap/*.js'
          ]
        }
      }
    },
    // minify css
    cssmin: {
      // Distribution minies all
      dist: {
        files: {
          'distribution/assets/main.css': [
            'source/assets/vendor/**/*.css',
            'source/assets/styles/base.css',
            'source/assets/styles/components/*.css',
            'source/assets/styles/views/*.css'
          ]
        }
      },
      // Development needs minied vendors
      dev: {
        files: {
          'build/assets/vendor/vendors.min.css': [
            'source/assets/vendor/**/*.css'
          ]
        }
      }
    },
    concat: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        stripBanners: true
      },
      styles: {
        files: {
          // css files
          'development/assets/main.css': [
            'build/assets/vendor/vendors.min.css',
            'source/assets/styles/base.css',
            'source/assets/styles/components/*.css',
            'source/assets/styles/views/*.css'
          ]
        }
      },
      scripts: {
        files: {
          // js files
          'development/assets/main.js': [
            'build/assets/vendor/vendors.min.js',
            'source/assets/scripts/app/namespaces.js',
            'source/assets/scripts/app/helpers.js',
            'source/assets/scripts/app/config/*.js',
            'source/assets/scripts/app/model/*.js',
            'source/assets/scripts/app/view/*.js',
            'source/assets/scripts/app/controller/*.js',
            'source/assets/scripts/app/main.js'
          ]
        }
      }
    },
    // to just copy the html files
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'source/assets/views/',
            src: ['*.html','**/*.html'],
            dest: 'development/'
          },
          {
            expand: true,
            cwd: 'source/assets/',
            src: ['fonts/*.*','vendor/**/fonts/*.*'],
            dest: 'development/assets/fonts/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'source/assets/images',
            src: ['*.png','*.jpg'],
            dest: 'development/images/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'source/assets/views/',
            src: ['*.html','**/*.html'],
            dest: 'distribution/'
          },
          {
            expand: true,
            cwd: 'source/assets/',
            src: ['fonts/*.*','vendor/**/fonts/*.*'],
            dest: 'distribution/assets/fonts/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'source/assets/images',
            src: ['*.png','*.jpg'],
            dest: 'distribution/images/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      }
    },
    watch: {
      scripts: {
        files: [
          'source/assets/scripts/**/*.js'
        ],
        tasks: [
          'uglify:dev',
          'concat:scripts'
        ]
      },
      styles: {
        files: [
          'source/assets/styles/**/*.css'
        ],
        tasks: [
          'cssmin:dev',
          'concat:styles'
        ]
      },
      html: {
        files: [
          'source/assets/views/*.html'
        ],
        tasks: [
          'copy:dev'
        ]
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('develop', ['clean:dev','uglify:dev','cssmin:dev','concat','copy:dev','watch']);
  grunt.registerTask('distribute', ['clean:dist','uglify:dist','cssmin:dist','copy:dist']);
  grunt.registerTask('default', ['develop']);

};
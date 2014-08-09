module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), 
    serve: {
      options: {
        port: 9000
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
              'assets/js/app.js',
              'assets/js/app/main.js',
              'assets/vendor/highlight.pack.js',
              'assets/vendor/scribe/scribe.min.js'
             ],
        dest: 'dist/<%= pkg.name %>.js'
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
      files: ['Gruntfile.js', 'assets/js/**/*.js'],
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
    cssmin: {
      minify: {
        expand: true,
        cwd: 'assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-serve');

  grunt.registerTask('dev', ['jshint', 'concat', 'uglify', 'cssmin']);

  grunt.registerTask('server', ['serve']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);

};
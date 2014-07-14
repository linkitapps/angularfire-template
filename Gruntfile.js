module.exports = function (grunt) {

  // Load Npm tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');

  // Default task.
  grunt.registerTask('default', ['jshint','build']);
  grunt.registerTask('build',   ['clean-rel','html2js','jshint','concat','less:development','copy:assets']);
  grunt.registerTask('release', ['clean:dist','html2js','uglify','jshint','concat:index','less:development','cssmin:minify','copy:assets','clean:templates']);
  // grunt.registerTask('release', ['clean','html2js','uglify','jshint','karma:unit','concat:index', 'recess:min','copy:assets']);
  // grunt.registerTask('test-watch', ['karma:watch']);

  grunt.registerTask('development', ['clean:dev', 'copy:dev', 'concat:dev-app', 'html2js', 'concat:dev-index']);

  // Print a timeStamp
  grunt.registerTask('timeStamp', function() {
    grunt.log.subhead(Date());
  });

  // Project configuration.
  grunt.initConfig({
    devDir: 'dev',
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner:
      '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
      ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      js: ['src/**/*.js'],
      jsTpl: ['<%= distDir %>/templates/**/*.js'],
      html: ['src/index.html'],
      tpl: {
        app: ['src/app/**/*.tpl.html'],
        common: ['src/common/**/*.tpl.html']
      },
      less: ['src/less/stylesheet.less'],
      lessWatch: ['src/less/**/*.less']
    },

    clean: {
      dev: ['<%= devDir %>/*'],
      dist: ['<%= distDir %>/*'],
      templates: ['<%= distDir %>/templates']
    },

    copy: {
      dev: {
        files: [
          { dest: '<%= devDir %>/vendor', src : ['jquery.js','jquery.min.js','jquery.min.map'], expand: true, cwd: 'bower_components/jquery/dist/' },
          { dest: '<%= devDir %>/vendor', src : ['angular.js','angular.min.js','angular.min.js.map'], expand: true, cwd: 'bower_components/angular' },
          { dest: '<%= devDir %>/vendor', src : ['angular-route.js','angular-route.min.js','angular-route.min.js.map'], expand: true, cwd: 'bower_components/angular-route' },
          { dest: '<%= devDir %>/vendor', src : ['ui-bootstrap-tpls.js','ui-bootstrap-tpls.min.js'], expand: true, cwd: 'bower_components/angular-ui-bootstrap-bower' },
          { dest: '<%= devDir %>', src : '**', expand: true, cwd: 'src/assets/' }
        ]
      },
      assets: {
        files: [{ dest: '<%= distDir %>', src : '**', expand: true, cwd: 'src/assets/' }]
      }
    },
    html2js: {
      app: {
        options: {
          base: 'src/app'
        },
        src: ['<%= src.tpl.app %>'],
        dest: '<%= devDir %>/js/app.tpl.js',
        module: 'templates.app'
      },
      common: {
        options: {
          base: 'src/common'
        },
        src: ['<%= src.tpl.common %>'],
        dest: '<%= devDir %>/js/common.tpl.js',
        module: 'templates.common'
      }
    },
    concat:{
      'dev-app': {
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>'],
        dest:'<%= devDir %>/js/<%= pkg.name %>.js'
      },
      'dev-index': {
        src: ['src/index.dev.html'],
        dest: '<%= devDir %>/index.html',
        options: {
          process: true
        }
      },

      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>', '<%= src.jsTpl %>'],
        dest:'<%= distDir %>/js/<%= pkg.name %>.js'
      },
      index: {
        src: ['src/index.html'],
        dest: '<%= distDir %>/index.html',
        options: {
          process: true
        }
      },
      angular: {
        src:['vendor/angular/angular.js', 'vendor/angular/angular-route.js'],
        dest: '<%= distDir %>/js/angular.js'
      },
      UIBootstrap: {
        src:['vendor/angular-ui/ui-bootstrap/*.js'],
        dest: '<%= distDir %>/js/ui-bootstrap.js'
      },
      jquery: {
        src:['vendor/jquery/*.js'],
        dest: '<%= distDir %>/js/jquery.js'
      }
    },
    uglify: {
      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>' ,'<%= src.jsTpl %>'],
        dest:'<%= distDir %>/js/<%= pkg.name %>.js'
      },
      angular: {
        src:['<%= concat.angular.src %>'],
        dest: '<%= distDir %>/js/angular.js'
      },
      bootstrap: {
        src:['vendor/angular-ui/ui-bootstrap/*.js'],
        dest: '<%= distDir %>/js/ui-bootstrap.js'
      },
      jquery: {
        src:['vendor/jquery/*.js'],
        dest: '<%= distDir %>/js/jquery.js'
      }
    },
    less: {
      development: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        files: {
          '<%= distDir %>/css/<%= pkg.name %>.css': '<%= src.less %>'
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '<%= distDir %>/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= distDir %>/css/',
        ext: '.min.css'
      }
    },
    jshint:{
      files:['gruntFile.js', '<%= src.js %>', '<%= src.jsTpl %>'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    },
    watch: {
      js: {
        files: ['<%= src.js %>'],
        tasks: ['concat:dist']
      },
      less: {
        files: ['<%= src.lessWatch %>'],
        tasks: ['less:development']
      }
      // tpl: {
      //   files: ['<%= src.tpl %>'],
      //   tasks: ['html2js','concat:dist']
      // },
      // less: {
      //   files: ['<%= src.lessWatch %>'],
      //   tasks: ['less']
      // }
    }
  });

};

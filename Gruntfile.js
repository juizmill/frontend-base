module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: {
                    'deploy/css/main.css': 'deploy/css/main.css',
                },
            },
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/materialize-css/dist/css/',
                        src: 'materialize.min.css',
                        dest: 'deploy/css/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/materialize-css/dist/js/',
                        src: 'materialize.min.js',
                        dest: 'deploy/js/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/vue/dist/',
                        src: 'vue.min.js',
                        dest: 'deploy/js/'
                    },
                    {
                        expand: true,
                        cwd: 'source/',
                        src: 'vendor/*',
                        dest: 'deploy/'
                    },
                    {
                        expand: true,
                        cwd: 'source/',
                        src: 'index.html',
                        dest: 'deploy/'
                    }
                ]
            }
        },
        clean: {
            dist: {
                src: ["deploy"]
            }
        },
        cssmin: {
            dist: {
                files: {
                    'deploy/css/main.min.css': 'deploy/css/main.min.css'
                }
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            dist: {
                files: {
                    'deploy/js/customer.min.js': [
                        'source/javascript/main.js'
                    ]
                }
            },
        },
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'deploy/css/main.min.css': 'source/sass/main.scss',
                },
            },
        },
        watch: {
            refresh : {
                options :{
                    livereload: '<%= connect.options.livereload %>'
                },
                files : ['deploy/**/*.js','deploy/**/*.css','deploy/*.html'],
            },
            css: {
              files: ['source/sass/*.scss'],
              tasks: ['sass'],
            },
            js: {
                files: ['source/javascript/*.js'],
                tasks: ['uglify'],
            },
        },
        connect: {
            options: {
                //keepalive: true,
                livereload: 35729,
                port: 8000,
                hostname: '*',
                base: 'deploy/'
            },
            livereload : {
                options: {
                    open: false,
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('deploy', ['clean', 'sass', 'autoprefixer', 'cssmin', 'uglify', 'copy']);
    grunt.registerTask('serve', ['connect:livereload', 'deploy', 'watch']);    
}
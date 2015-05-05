'use strict';

module.exports = function (grunt) {

    // Automatyczne ładowanie tasków Grunt'a
    require('jit-grunt')(
        grunt,
        {
            buildcontrol: 'grunt-build-control'
        }
    );

    // Konfiguracja dla wszystkich tasków
    grunt.initConfig(
        {
            yeoman: {
                dist: 'dist'
            },
    
            // Czyszczenie dystybucji i plików tymczasowych serwera
            clean: {
                dist: {
                    files: [
                        {
                            dot: true,
                            src: [
                                '.tmp',
                                '<%= yeoman.dist %>/*',
                                '!<%= yeoman.dist %>/.git*',
                            ]
                        }
                    ]
                },
                server: '.tmp'
            },

            // Kopia plików na potrzeby dystrybucji
            copy: {
                dist: {
                    files: [
                        {
                            expand: true,
                            dest: '<%= yeoman.dist %>',
                            src: [
                                'package.json',
                                'server/**/*'
                            ]
                        },
                        {
                            expand: true,
                            dest: '<%= yeoman.dist %>',
                            dot: true, // Pozwala na używanie nazw plików i katalogów rozpoczynjących się od kropki (ukryte pliki i katalogi)
                            src: [
                                '.openshift/**/*'
                            ]
                        }
                    ]
                }
            },

            buildcontrol: {
                options: {
                    dir: 'dist',
                    commit: true,
                    push: true,
                    connectCommits: false,
                    message: 'Built %sourceName% z commita %sourceCommit% na gałęzi %sourceBranch%'
                },
                openshift: {
                    options: {
                        remote: 'openshift',
                        branch: 'master'
                    }
                }
            },
        }
    );

    grunt.registerTask(
        'build', [
            'clean:dist',
            'copy:dist',
            // 'buildcontrol:openshift' // deploy na openshift
        ]
    );
};

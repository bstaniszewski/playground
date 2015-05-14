'use strict';

angular
    .module(
        'playgroundApp',
        [
            'ngResource',
            'ngSanitize',
            'ui.router'
        ]
    )
    .config(
        function($urlRouterProvider, $locationProvider, $httpProvider) {
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('AuthInterceptor');
            }
    )
    .run(
        [
            '$rootScope',
            '$location',
            '$window',
            'AuthService',
            function ($rootScope, $location, $window, AuthService) {
                /*
                $rootScope.online = true;
                
                $window
                    .addEventListener(
                        'offline',
                        function () {
                            $rootScope
                                .$apply(
                                    function() {
                                        $rootScope.online = false;
                                    }
                                );
                        },
                        false
                    );
                    
                $window
                    .addEventListener(
                        'online',
                        function () {
                            $rootScope
                                .$apply(
                                    function() {
                                        $rootScope.online = true;
                                    }
                                );
                        },
                        false
                    );
                */
                
                $rootScope
                    .$on(
                        '$stateChangeStart',
                        function (event, next) {
                            console.log("Przejście do stanu: " + next.name);
                            
                            // Czy żądany stan wymaga uwierzytelnienia a użytkownik nie jest uwierzytelniony?
                            if (next.authenticate && !AuthService.isAuthenticated()) {
                                // Tak! - Przekieruj do strony uwierzytelniania.
                                $location.path('/login');
                            };
                        }
                    );
            }
        ]
    );
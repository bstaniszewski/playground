'use strict';

angular
    .module('playgroundApp')
    .config(
        function ($stateProvider) {
            $stateProvider
                .state(
                    'login',
                    {
                        url: '/login',
                        templateUrl: 'app/account/login/login.view.html',
                        controller: 'LoginCtrl'
                    }
                )
                .state(
                    'signup',
                    {
                        url: '/signup',
                        templateUrl: 'app/account/signup/signup.view.html',
                        controller: 'SignupCtrl'
                    }
                );
                /*
                .state(
                    'settings',
                    {
                        url: '/settings',
                        templateUrl: 'app/account/settings/settings.html',
                        controller: 'SettingsCtrl',
                        authenticate: true
                    }
                );
                */
        }
    );
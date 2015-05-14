'use strict';

angular
    .module('playgroundApp')
    .config(
        function ($stateProvider) {
            $stateProvider
                .state(
                    'welcome',
                    {
                        url: '/',
                        templateUrl: 'app/welcome/welcome.view.html',
                        controller: 'WelcomeCtrl'
                    }
                );
        }
    );
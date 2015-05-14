'use strict';

angular
    .module('playgroundApp')
    .config(
        function ($stateProvider) {
            $stateProvider
                .state(
                    'secured',
                    {
                        url: '/secured',
                        templateUrl: 'app/secured/secured.view.html',
                        controller: 'SecuredCtrl'
                    }
                );
        }
    );
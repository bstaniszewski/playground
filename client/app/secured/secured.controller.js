'use strict';

angular
    .module('playgroundApp')
        .controller(
            'SecuredCtrl',
            [
                '$scope',
                '$http',
                '$location',
                'DocumentService',
                'AuthService',
                function ($scope, $http, $location, DocumentService, AuthService) {
                    $scope.docs = DocumentService.query();
                    
                    $scope.logout = function() {
                        AuthService.logout();
                        $location.path('/');
                    };
                }
            ]
        );

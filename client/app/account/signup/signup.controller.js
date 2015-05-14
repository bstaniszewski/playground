'use strict';

angular
    .module('playgroundApp')
    .controller(
        'SignupCtrl',
        [
            '$scope',
            '$location',
            'UserService',
            function ($scope, $location, UserService) {
                $scope.user = {
                    username: "test",
                    email: "test@test.com",
                    password: "test"
                };
                $scope.error = null;
                $scope.submitted = false;
                
                $scope.register = function(form) {
                    $scope.error = null;
                    $scope.submitted = true;
                    
                    if(form.$valid) {
                        UserService
                            .save(
                                $scope.user,
                                function(data) {
                                    // Przekieruj do widoku logowania
                                    $location.path('/login');
                                },
                                function(err) {
                                    $scope.submitted = false;
                                    $scope.error = err.data;
                                }
                            );
                    }
                };
            }
        ]
    );

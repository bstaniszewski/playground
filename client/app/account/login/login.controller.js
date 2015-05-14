'use strict';

angular
    .module('playgroundApp')
    .controller(
        'LoginCtrl',
        [
            '$scope',
            '$location',
            'AuthService',
            function ($scope, $location, AuthService) {
                
                /**
                 * Tymczasowo
                 */
                $scope.user = {
                    username: "test",
                    password: "test"
                };
                
                $scope.error = null;
                $scope.submitted = false;
      
                $scope.login = function(form) {
                    $scope.error = null;
                    $scope.submitted = true;
                    
                    if(form.$valid) {
                        AuthService
                            .authenticate(
                                {
                                    username: $scope.user.username,
                                    password: $scope.user.password
                                }
                            )
                            .then(
                                function() {
                                    // Po zalogowaniu przekieruj do ...
                                    $location.path('/secured');
                                }
                            )
                            .catch(
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

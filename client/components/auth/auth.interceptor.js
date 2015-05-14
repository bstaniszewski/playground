'use strict';
    
/**
 * Interceptor uwierzytelniania - dołącza do żądań nagłówek z tokenem uwierzytelniania
 */
    
angular
    .module(
        'playgroundApp'
    )
    .factory(
        'AuthInterceptor',
        [
            '$rootScope',
            '$q',
            '$location',
            '$injector',
            function ($rootScope, $q, $location, $injector) {
                return {
                    request: function (config) {
                        config.headers = config.headers || {};
                        
                        var AuthService = $injector.get('AuthService');
                       
                        var authToken = AuthService.getAuthToken();
                        if (authToken) {
                            config.headers.Authorization = 'Bearer ' + authToken;
                        }
                        
                        return config;
                    },
                    responseError: function (rejection) {
                        if (rejection.status === 401) {
                            $location.path('/login');
                        };
                        
                        return $q.reject(rejection);
                    }
               };
            }
        ]
    );
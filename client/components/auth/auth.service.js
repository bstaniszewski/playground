'use strict';

/* Usługi */

angular
    .module(
        'playgroundApp'
    )
    /**
     * Provider usługi uwierzytelniania
     */
    .provider(
        'AuthService',
        function() {
            /**
             * Ustawienie usługi - do ustalenia podczas configuracji providera 
             * @type {object}
             */
            var _settings = {
                // URL usługi uwierzytelniania
                url: '/api/auth/local',
                
                // Przekierowanie po pomyślnym uwierzytelnieniu
                redirection: {          
                    to: 'secured.applications',
                    params: null
                }
            };
    
            /**
             * Konfigurator usługi
             * @param {object} config - ustawienia usługi
             */
            this.setup = function(config) {
                _settings = angular.extend(_settings, config);
            };
    
            /**
             * return Singleton AuthService
             * @type {Array}
             */
            this.$get = [
                '$rootScope',
                '$http',
                '$q',
                function($rootScope, $http, $q) {
                    var _authenticated  = false,     // Czy użytkownik został uwierzytelniony
                        _authToken      = null,      // Token uwierzytelniający
                        _identity       = undefined, // Tożsamość użytkownika
                        _redirection    = undefined; // Parametry przekierownia po pomyslnym uwierzytelnieniu
                    
                    // Weryfikacja czy określony został url usługi uwierzytelnienia
                    if(!angular.isDefined(_settings.url)) {
                        throw 'AuthService nie jest prawidłowo skonfigurowany - brak URL serwisu uwierzytelniania.';
                    };
                    
                    // Weryfikacja czy serwis został prawidłowo skonfigurowany
                    if(!angular.isDefined(_settings.redirection)) {
                        throw 'AuthService nie jest prawidłowo skonfigurowany - brak wskazania przekierowania.';
                    } else {
                        _redirection = _settings.redirection;
                    }
             
                    // Definicja serwisu
                    var authService = {
                        
                        /**
                         * Uwierzytelnienie
                         * @param {Object} credentials Dane uwierzytelniające użytkownika
                         * @returns {Object} Token uwierzytelniający 
                         */
                        authenticate: function(credentials) {
                            var deferred = $q.defer();
                            
                            // Wywołanie usługi uwierzytelniania
                            $http
                                .post(
                                    _settings.url,
                                    credentials
                                )
                                .success(
                                    function (data, status, headers, config) {
                                        var encodedToken = data.token.split('.')[1];
                                        
                                        _authToken = data.token; // JSON.parse(url_base64_decode(encodedToken));
       
                                        _identity = {
                                            roles: [] 
                                        };
                                        
                                        _authenticated = _identity != null;
  
                                        deferred
                                            .resolve(
                                                {
                                                    success: true,
                                                    data: _identity
                                                }
                                            );
                                    }
                                )
                                .error(
                                    function (data, status, headers, config) {
                                        _authenticated = false;
                                        _authToken = null;
                                        _identity = null;
                                        
                                        deferred
                                            .reject(
                                                {
                                                    status: status,
                                                    data: data,
                                                    headers: headers,
                                                    config: config
                                                }
                                            );
                                    }
                                );
                            
                            return deferred.promise;
                        },
                        
                        /**
                         * Czy użytkownik został uwierzytelniony?
                         */
                        isAuthenticated: function() {
                            return _authenticated;
                        },
                        
                        /**
                         * Pobierz token uwierzyteniania 
                         */
                        getAuthToken: function() {
                            return _authToken;    
                        },
                        
                        /**
                         * Wyloguj użytkownika
                         */
                        logout: function() {
                            _authToken = null;
                            _authenticated = false;
                            _redirection = _settings.redirection;
                        },
                        
                        /**
                         *
                         */
                        setRedirection: function(to, params) {
                            _redirection = {
                                to: to,
                                params: params
                            };
                        },
                        
                        /**
                         *
                         */
                        getRedirection: function() {
                            return _redirection;
                        }
                    };
             
                    return authService;
                }
            ];
        }
    )
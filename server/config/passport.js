/**
 * Konfiguracja middleware obsługującego uwierzytelnianie.
 * Skonfigurowane zostały 2 strategie uwierzytelniania:
 * 1. 'local'
 *  - obsługująca uwierzytelnianie za pomocą identfikatora użytkownika (username) i hasła,
 *  - wykorzystywana przy werfikacji danych pochodzących z formularza logowania w aplikacji klienckiej;
 * 2. 'bearer'
 *  - obsługująca uwierzytelnianie za pomocą tokenu (jwt) - służąca do weryfikacji wywołań API;
 * W przypadku strategii 'local' użyty został plugin 'passport-local-mongoose' pozwalający na rozszerzenie modelu mongoose o interfejs konieczny do obsługi uwierzytelniania
 */

'use strict';

var passport            = require('passport');
var BearerStrategy      = require('passport-http-bearer');
//var LocalStrategy     = require('passport-local').Strategy; // Zastąpiona przez passport-local-mogoose i wpięta w Model User
var authHelper          = require('../utils/authhelper');

module.exports = function(app, config) {
    var env = app.get('env');
    var logger = app.get('logger');
    
    app.use(passport.initialize());
    
    /**
     * Konfiguracja strategi uwierzytelniania
     */
    
    // 'local' - logowanie użytkownika
    var User = require('../models/user.model');
    passport.use(User.createStrategy());
    
    // 'bearer' - wywołania API
    passport.use(
        new BearerStrategy(
            function(token, cb) {
                authHelper.verifyToken(
                    token,
                    function(err, decodedToken) {
                        if(err) {
                            return cb(err, null, {});
                        } else {
                            User
                                .findOne(
                                    {
                                        username: decodedToken.username
                                    },
                                    '-salt -hash', // Bez pól obsługujących hasło
                                    function (err, user) {
                                        if (err) {
                                            return cb(err);
                                        }
                                        
                                        if (!user) {
                                            return cb(null, false);
                                        }
                                        
                                        return cb(null, user);
                                    }
                                );
                        };
                    }
                );
            }
        )
    ); 
    
    logger.debug("Konfiguracja passport dla środowiska wykonawczego w trybie: " + env);
};
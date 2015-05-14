/**
 * Jsonwebtoken - moduł do obsługi JWT - https://github.com/auth0/node-jsonwebtoken
 */

'use strict';

var jwt                 = require('jsonwebtoken');
var config              = require('../config/enviroment');

/**
 * Tworzenie i podpisywanie tokenu
 */
function signToken(payload, expiresInMinutes) {
    
    // Czas ważności tokenu
    expiresInMinutes = expiresInMinutes || config.api.jwt.expiresInMinutes;  
    
    var token = jwt
        .sign(
            payload,
            config.api.jwt.secretKey,
            {
                expiresInMinutes: expiresInMinutes // Uwaga! Opcja expiresInSeconds nie działa
            }
        )
   
    return token;
};

/**
 * Weryfikacja tokenu
 */
function verifyToken(token, cb) {
    jwt
        .verify(
            token,
            config.api.jwt.secretKey,
            cb
        );
};

module.exports.signToken = signToken;
module.exports.verifyToken = verifyToken;

/**
 * Auth - Controller
 */

'use strict';

var _                       = require('lodash');
var passport                = require('passport');
var authHelper              = require('../utils/authhelper');

/**
 * Callback po udanym uwierzytelnieniu, w którym:
 * - generowany jest token uwierzytelniający z domyślnym terminem ważności (z konfiguracji) ...
 * - ... i odsyłany do klienta.
 */
module.exports.authenticate = function(req, res, next) {
    passport
        .authenticate(
            'local',
            function(err, user, info) {
                if (err) {
                    return next(err);
                } else if (!user) {
                    res
                        .status(401)
                        .json(
                            {
                                name:       "AuthenticationError",
                                message:    info.message,
                                status:     401,
                                errors:     []
                            }   
                        );
                } else {
                    var payload = _.pick(req.body, ['username']);
   
                    res
                        .status(200) // domyślnie - 200 OK 
                        .json(
                            {
                                token: authHelper.signToken(payload)
                            }
                        );
                }
            }
        )(req, res, next);
}
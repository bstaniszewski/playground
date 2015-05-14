/**
 * User - Controller
 */

'use strict';

var _                       = require('lodash');

var User                    = require('../models/user.model');
var authHelper              = require('../utils/authhelper');
var dbError                 = require('../utils/dberror');

var publicAttributes        = ['username', 'email', 'name'];

/**
 * Create User
 */
module.exports.createUser = function(req, res, next) {
    
    var newUser = new User(_.pick(req.body, publicAttributes));
    
    User
        .register(
            newUser,
            req.body.password,
            function(err, userData) {
                if (err) {                    
                    return next(err);
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
        );
};

/**
 * Read (index) Users
 */
module.exports.readUsers = function(req, res, next) {
    User.find(
        {},
        '-salt -hash',
        function (err, users) {
            if(err) {
                return next(err);
            }
    
            res.json(200, users);    
        }
    )
};

/**
 * Read (show) User
 */
module.exports.readUser = function(req, res, next) {
    var userId = req.params.id;

    User.findById(
        userId,
        '-salt -hash',
        function (err, user) {
            if (err) return next(err);
            if (!user) return res.send(401);
            res.json(user);
        }
    );
};
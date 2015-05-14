'use strict';

var express                 = require('express'),
    passport                = require('passport');

var userController          = require('../controllers/user.controller');

var router                  = express.Router();

/**
 * Create (create) - POST
 */
router 
    .route('/users')
        .post(userController.createUser);

/**
 * Read (index) - GET
 */
router 
    .route('/users')
        .get(
            passport.authenticate('bearer', {session: false}),
            userController.readUsers
        );
        
/**
 * Read (show) - GET
 */
router 
    .route('/users/:id')
        .get(
            passport.authenticate('bearer', {session: false}),
            userController.readUser
        );

module.exports = router;
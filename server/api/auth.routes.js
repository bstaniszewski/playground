'use strict';

var express                 = require('express');

var authController          = require('../controllers/auth.controller');

var router                  = express.Router();

/** 
 * Authenticate - POST
 */
router 
    .route('/auth/local')
        .post(
            authController.authenticate
        );

module.exports = router;
'use strict';

var express                 = require('express'),
    passport                = require('passport');

var documentController      = require('../controllers/document.controller');

var router                  = express.Router();

/**
 * Create (create) - POST
 */
router 
    .route('/documents')
        .post(documentController.createDocument);

/**
 * Read (index) - GET
 */
router 
    .route('/documents')
        .get(
            passport.authenticate('bearer', {session: false}),
            documentController.readDocuments
        );
        
/**
 * Read (show) - GET
 */
router 
    .route('/documents/:id')
        .get(
            passport.authenticate('bearer', {session: false}),
            documentController.readDocument
        );

module.exports = router;
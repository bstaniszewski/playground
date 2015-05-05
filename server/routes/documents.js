/**
 * API - dokument
 */

'use strict';

var _                   = require('lodash');
var express             = require('express');
var router              = express.Router();

var Document            = require('../models/document');

/**
 * Create (create) - POST
 */
router 
    .route('/documents')
        .post(
            function(req, res, next) {
                /**
                 * @lodash (aka _)
                 * _.pick pozwala pobrać i (ewentualnie przetworzyć) wskazane atrybuty, użyteczne gdy chcemy odfiltrować część atrybutów 
                 */
                var document = new Document(_.pick(req.body, ['name']));
                document.save(
                    function(err, documentData) {
                        if (err) {
/*  --------------------------------------------------------------------------------------------
    TODO: Przetworzyć i przekazać dalej w dół rury obsługi błędów - BEGIN
    -------------------------------------------------------------------------------------------*/
                            // Czy błąd jest błędem walidacji danych?
                            if (err.name == "ValidationError") {
                                res
                                    .status(422) // 422 Unprocessable Entity
                                    .send(
                                        {
                                            errors: ['nieprawidłowe dane']
                                        }
                                    );
/*  --------------------------------------------------------------------------------------------
    TODO: Przetworzyć i przekazać dalej w dół rury obsługi błędów - END
    -------------------------------------------------------------------------------------------*/
                            } else {
                                next(err);
                            }
                        } 
 
                        // Udało się utworzyć zasób
                        res
                            .status(201) // 201 Created
                            .json(documentData);
                    }
                );
            }
        );

/**
 * Read (index) - GET
 */
router
    .route('/documents')
        .get(
            function(req, res, next) {
                Document.find(
                    function(err, documents) {
                        if (err) {
                            return next(err);
                        }
       
                        res
                            // .status(200) // domyślnie - 200 OK
                            .json(documents);
                    }
                );
            }
        );
/**
 * Read (show) - GET
 */
router
    .route('/documents/:id')
        .get(
            function(req, res, next) {
                Document.findOne(
                    {
                        _id: req.params.id
                    },
                    function(err, document) {
                        if (err) {
                            return next(err);
                        }
                        
                        res
                            // .status(200) // domyślnie - 200 OK 
                            .json(document);
                    }
                );
            }
        );
        
/**
 * Update (update) - PUT
 */
router
    .route('/documents/:id')
        .put(
            function (res, req, next) {
/*  --------------------------------------------------------------------------------------------
    TODO: Zaimplementować - BEGIN - END
    -------------------------------------------------------------------------------------------*/               
            }
        )

/**
 * Update (partaial update) - PATCH
 */
router
    .route('/documents/:id')
        .patch(
            function (res, req, next) {
/*  --------------------------------------------------------------------------------------------
    TODO: Zaimplementować - BEGIN - END
    -------------------------------------------------------------------------------------------*/               
            }
        )

/**
 * Delete (remove) - DELETE
 */
router
    .route('/documents/:id')
        .delete(
            function (res, req, next) {
/*  --------------------------------------------------------------------------------------------
    TODO: Zaimplementować - BEGIN - END
    -------------------------------------------------------------------------------------------*/               
            }
        )

module.exports = router;
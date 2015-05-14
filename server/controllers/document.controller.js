/**
 * Document - Controller
 */

'use strict';

var _                   = require('lodash');
var express             = require('express');
var router              = express.Router();

var Document            = require('../models/document.model');

/**
 * Create (create) - POST
 */
module.exports.createDocument = function createDocument(req, res, next) {
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
};

/**
 * Read (index) - GET
 */
module.exports.readDocuments = function readDocuments(req, res, next) {
    Document.find(
        function(err, documents) {
            if (err) {
                return next(err);
            }

            res
                .status(200) // domyślnie - 200 OK
                .json(documents);
        }
    );
};

/**
 * Read (show) - GET
 */
module.exports.readDocument = function readDocument(req, res, next) {
    Document.findOne(
        {
            _id: req.params.id
        },
        function(err, document) {
            if (err) {
                return next(err);
            }
            
            res
                .status(200) // domyślnie - 200 OK 
                .json(document);
        }
    );
};
        
/**
 * Update (update) - PUT
 */
module.exports.updateDocument = function updateDocument(req, res, next) {
/*  --------------------------------------------------------------------------------------------
    TODO: Zaimplementować - BEGIN - END
    -------------------------------------------------------------------------------------------*/
    next(new Error('Niezaimplementowane'));
};

/**
 * Update (partaial update) - PATCH
 */
module.exports.patchDocument = function patchDocument(req, res, next) {
/*  --------------------------------------------------------------------------------------------
    TODO: Zaimplementować - BEGIN - END
    -------------------------------------------------------------------------------------------*/
    next(new Error('Niezaimplementowane'));
};

/**
 * Delete (remove) - DELETE
 */
module.exports.deleteDocument = function deleteDocument(req, res, next) {
/*  --------------------------------------------------------------------------------------------
    TODO: Zaimplementować - BEGIN - END
    -------------------------------------------------------------------------------------------*/
    next(new Error('Niezaimplementowane'));
};
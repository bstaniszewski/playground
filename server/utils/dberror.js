/**
 * Helper do obsługi błędów walidacji - wpięty w rurę obsługi błędów na poziomie definicji routingu w pliku z definicją routingu app.js
 * https://github.com/niftylettuce/igloo/blob/master/lib/boot/error-handler.js
 */

'use strict';

var _                       = require('lodash');

module.exports = function(err, req, res, next) {
    
    var vError = {
        name:       "ValidationError",
        message:    "Nieprawidłowe dane",
        status:     422,
        errors:     []
    };
    
    // Ustal kod błędu
    vError.status = (_.isNumber(err.status)) ? err.status : 422;
    
    // Błąd Walidacji - poziom MongoDB, duplikacja klucza
    if (_.isObject(err) && _.isNumber(err.code) && err.code === 11000) {
        var path = getDuplicateKeyField(err.message);
        if (path){
            vError.errors.push(
                {
                    path: path,
                    message: "Wprowadzona wartość " + path + " została już zarejestrowana"
                }
            );
        }
    // Błąd Walidacji - poziom Mongoose 
    } else if (err.name == 'ValidationError') {
        if (_.isObject(err.errors) && !_.isEmpty(err.errors)) {
            _.forEach(
                err.errors,
                function(err, path) {
                    vError.errors.push(
                        {
                            path: path,
                            message: err.message
                        }
                    );
                }
            );
        };
    // PROBLEM! Nie ma informacji o ścieżce (polu), w którym nastąpił błąd
    } else if (err.name == 'BadRequestError') {
        vError.message = err.message;
    } else {
        return next(err);
    }
    
    res
        .status(vError.status)
        .json(vError);
};

/**
 * Wyciąga informację o polu dla którego wystąpił błąd duplikacji klucza
 * 
 * Spodziewany komunikat błędu (MongoDB) ma postać:
 * message: 'insertDocument :: caused by :: 11000 E11000 duplicate key error index: DB_NAME.COLLECTION_NAME.$FIELD_1 dup key: { : "KLUCZ" }'
 * Z komunikatu należy wyciąć informację o polu.
 * 
 * Rozwiązanie z: https://github.com/Automattic/mongoose/issues/2129
 */ 
function getDuplicateKeyField (errMessage) {
    
    var field = errMessage.split('index: ')[1].split('.$')[1];
    field = field.split(' dup key')[0];
    field = field.substring(0, field.lastIndexOf('_'));
    
    return field;
}
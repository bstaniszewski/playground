/**
 * Struktura i model dokumentu w oparciu o bibliotekę Mongoose
 */

'use strict';

var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var nameValidator = [
    validate(
        {
            validator: 'isLength',
            arguments: [3, 256],
            message: 'Nazwa powinna mieć od 3 do 256 znaków!'
        }
    ),
    validate(
        {
            validator: 'isAlphanumeric',
            passIfEmpty: true,
            message: 'Nazwa powinna zawierać tylko znaki alfanumeryczne!'
        }
    )
];

// Definicja struktury dokumentu
var Document = new Schema(
    {
        name: {
            type: String,
            required: true,
            validate: nameValidator
        }
    }
);

// Utworzenie modelu dokumentu
module.exports = mongoose.model('Document', Document);
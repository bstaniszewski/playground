/**
 * Struktura i model użytkownika (User) w oparciu o bibliotekę Mongoose
 */

'use strict';

var mongoose                = require('mongoose');
var validate                = require('mongoose-validator');            // Plugin walidatora
var passportLocalMongoose   = require('passport-local-mongoose');       // Plugin uwierzytelniania

var Schema                  = mongoose.Schema;
var ObjectId                = Schema.ObjectId;

mongoose.Error.messages.general.required = "Pole `{PATH}` jest wymagane."; // http://mongoosejs.com/docs/api.html#error_messages_MongooseError-messages

// Walidator nazwy użytkownika
var usernameValidator = [
    validate(
        {
            validator: 'isLength',
            arguments: [3, 256],
            message: 'Identyfikator użytkownika powinien mieć od 3 do 256 znaków.'
        }
    ),
    validate(
        {
            validator: 'isAlphanumeric',
            passIfEmpty: true,
            message: 'Identyfikator użytkownika powinien zawierać tylko znaki alfanumeryczne.'
        }
    )
];

var User = new Schema(
    {
        username: {
            type: String,
            required: 'Wprowadź wymagany identyfikator użytkownika', // http://mongoosejs.com/docs/api.html#schematype_SchemaType-required
            unique: true,
            validate: usernameValidator
        },
        email: {
            type: String,
            required: 'Wprowadź wymagany adres email',
            unique: true
        }
    }
);

/*  --------------------------------------------------------------------------------------------
    TODO: Dopracować konfigurację ze zlokalizowanymi komunkatami błędów - BEGIN
    -------------------------------------------------------------------------------------------*/

// Podłączenie pluginu uwierzytelniania - https://github.com/saintedlama/passport-local-mongoose
User
    .plugin(
        // Plugin
        passportLocalMongoose,
        // Konfiguracja pluginu
        {
            incorrectPasswordError: 'Wprowadzono nieprawidłowe hasło',
            incorrectUsernameError: 'Użytkownik o podanym identyfikatorze (%s) nie został zarejestrowany',
            missingUsernameError:   'Identyfikator użytkownika (%s) jest wymagany',
            missingPasswordError:   'Hasło jest wymagane',
            userExistsError:        'Podany identyfikator jest już używany - identyfikator użytkownika (%s) = %s',
            //noSaltValueStored:      'Authentication not possible. No salt value stored in mongodb collection!'
        }
    );

/*  --------------------------------------------------------------------------------------------
    TODO: Dopracować konfigurację ze zlokalizowanymi komunkatami błędów - END
    -------------------------------------------------------------------------------------------*/

module.exports = mongoose.model('User', User);
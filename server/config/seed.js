/**
 * Zalążek obsługi wsadu do bazy danych.
 */

'use strict';

var User            = require('../models/user.model');
var Document        = require('../models/document.model');

User
    .find(
        {}
    )
    .remove(
        function() {
            User
                .register(
                    {
                        username: 'test',
                        email: 'test@test.com'
                    },
                    'test',
                    function(err, userData) {
                        console.log('Użytkownik testowy dodany');
                    }
                );
        }
    );
    
Document
    .find(
        {}
    )
    .remove(
        function() {
            Document
                .create(
                    {
                        name: 'Development Tools',
                    },
                    {
                        name: 'Server and Client integration',
                    },
                    {
                        name: 'Smart Build System',
                    },
                    function(err, docsData) {
                        console.log('Dokumenty dodane');
                    }
                );
        }
    );
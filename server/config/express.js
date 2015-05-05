/**
 * Konfiguracja aplikacji Express - Patrz: http://expressjs.com/api.html
 * Usunięta (prymitywna) obsługa logowania żądań na konsoli
 * Dodana obsługa logowania za pomocą loggera Winston
 */

'use strict';

var bodyParser          = require('body-parser');           // Middleware do przetwarzania danych przesłanych w żądaniach - https://github.com/expressjs/body-parser
var express             = require('express');
var path                = require('path');
var winston             = require('winston');               // Obsługa logowania

module.exports = function(app, config) {
    var env = app.get('env');

    // Inicjalizacja loggera
    var logger          = require('../utils/logger')(config);
    
    // Zapamiętanie referencji do loggera
    app.set('logger', logger);
    
    // Podłączenie middleware loggera żądań w oparciu o logger na Winstonie, które zostanie wpięte w pipeline obsługi żądań   
    var reqLogger = function(req, res, next) {
        logger.info("req.url " + req.url);
        next(); // Przekazanie żądania do następnego handlera na stosie
    };
    
    // Wpięcie middleware loggera
    app.use(reqLogger);
    
    // Wpięcie middleware do parsowania żądań
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    
    if (env == 'production') {
        // app.set('appPath', config.root + '/public');
    } else {
        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'client')));
    };    
    
    logger.debug("Konfiguracja express dla środowiska wykonawczego w trybie: " + env);
};
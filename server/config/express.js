/**
 * Konfiguracja aplikacji Express - Patrz: http://expressjs.com/api.html
 * Usunięta (prymitywna) obsługa logowania żądań na konsoli
 * Dodana obsługa logowania za pomocą loggera Winston
 */

'use strict';

// Obsługa logowania
var winston             = require('winston');

module.exports = function(app, config) {
    var env = app.get('env');

    // Inicjalizacja loggera
    var logger      = require('../utils/logger')(config);
    
    // Zapamiętanie referencji do loggera
    app.set('logger', logger);
    
    // Podłączenie middleware loggera żądań w oparciu o logger na Winstonie, które zostanie wpięte w pipeline obsługi żądań   
    var reqLogger = function(req, res, next) {
        logger.info("req.url " + req.url);
        next(); // Przekazanie żądania do następnego handlera na stosie
    };
    
    // Wpięcie middleware loggera
    app.use(reqLogger);
    
    logger.debug("Konfiguracja express dla środowiska wykonawczego w trybie: " + env);
};
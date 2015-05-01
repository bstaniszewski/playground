/**
 * Konfiguracja aplikacji Express - Patrz: http://expressjs.com/api.html
 * Dodana (prymitywna) obsługa logowania żądań na konsoli
 */

'use strict';

module.exports = function(app, config) {
    var env = app.get('env');

    // Middleware loggera żądań, które zostanie wpięte w pipeline obsługi żądań    
    var logger = function(req, res, next) {
        console.log("reg.url:  " + req.url);
        next(); // Przekazanie żądania do następnego handlera na stosie
    };

    // Wpięcie middleware loggera
    app.use(logger);

    console.log("Konfigurujemy express dla środowiska wykonawczego w trybie: " + env);
};
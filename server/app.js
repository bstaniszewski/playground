#!/bin/env node

/**
 * Main app
 */

'use strict';

// Wymuszenie inicjalizacji zmiennej określającej środowisko uruchomieniowe. Domyślnie ustawiane na develoment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express             = require('express'),
    mongoose            = require('mongoose');  // Biblioteka do modelowania dokumentów i interakcji z MongoDB

// Załaduj konfigurację zależną od środowiska wykonawczego
var config              = require('./config/enviroment');

// Utwórz aplikację i serwer ...
var app = express();
var server = require('http').createServer(app);

// Podłącz do bazy danych
mongoose.connect(config.mongo.uri, config.mongo.options);

// ... skonfiguruj aplikację. Patrz http://expressjs.com/api.html
require('./config/express')(app, config);

var logger = app.get('logger');

/*  --------------------------------------------------------------------------------------------
    Routing - BEGIN
    -------------------------------------------------------------------------------------------*/

// Informacja o wersji node, na której odpalona została aplikacja
app
    .route('/')
        .get(
            function(req, res, next) {
                res.json({node_version: process.version});
            }
        );

/**
 * Po to by wywołać błąd! Co powinno się wydarzyć?
 * Błąd powinien zostać przekazany do middleware obsługi błędów - next(err), które zostanie podłączone po zakończeniu konfiguracji routingu
 */ 
app
    .route('/blad')
        .get(
            function(req, res, next) {
                notExistingFunction(); // Nieistniejąca funkcja - wywołanie spowoduje błąd!
            }
        );

/**
 * Ścieżki API
 * - do ścieżek z prefixem '/api' dodaje routing zdefiniowany w modułach
 * - na początek tylko dokumenty ale w przyszłości także inne zasoby ...
 */
app.use('/api', require('./routes/documents'));

/*  --------------------------------------------------------------------------------------------
    Routing - END
    -------------------------------------------------------------------------------------------*/

/**
 * Podłącz obsługę błędów - Dlaczego tu i teraz a nie podczas konfiguracji express?
 * Otóż tu i teraz bo powinno być podłączone PO skonfigurowaniu routingu.
 */
require('./config/handleErrors')(app, config);

// Uruchom serwer
server.listen(config.port, config.hostname, function () {
    logger.info('Serwer pod adresem ' + config.hostname + ':' + config.port + ', środowisko w trybie ' + app.get('env'));
});

// Opublikuj aplikację
exports = module.exports = app;
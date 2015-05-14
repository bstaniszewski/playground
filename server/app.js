#!/bin/env node

/**
 * Main app
 */

'use strict';

// Wymuszenie inicjalizacji zmiennej określającej środowisko uruchomieniowe. Domyślnie ustawiane na develoment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express             = require('express'),
    mongoose            = require('mongoose'),  // Biblioteka do modelowania dokumentów i interakcji z MongoDB
    passport            = require('passport');

// Załaduj konfigurację zależną od środowiska wykonawczego
var config              = require('./config/enviroment');

// Utwórz aplikację i serwer ...
var app = express();
var server = require('http').createServer(app);

// Podłącz do bazy danych
mongoose.connect(config.mongo.uri, config.mongo.options);

// ... skonfiguruj aplikację. Patrz http://expressjs.com/api.html
require('./config/express')(app, config);

// ... skonfiguruj middleware uwierzytelniania.
require('./config/passport')(app, config);

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
 */
app.use('/api', require('./api/auth.routes'));
app.use('/api', require('./api/user.routes'));
app.use('/api', require('./api/document.routes'));

app.use('/api', require('./utils/dberror'));

/**
 * Dostęp do klienta
 */
app
    .route('/*')
        .get(
            function(req, res, next) {
                console.log(app.get('appPath'));
                
                res.sendFile(app.get('appPath') + '/index.html');
            }
        );

/*  --------------------------------------------------------------------------------------------
    Routing - END
    -------------------------------------------------------------------------------------------*/

/**
 * Podłącz obsługę błędów - Dlaczego tu i teraz a nie podczas konfiguracji express?
 * Otóż tu i teraz bo powinno być podłączone PO skonfigurowaniu routingu.
 */
require('./config/handleErrors')(app, config);

// Populate DB with sample data
if(config.seedDB) {
    require('./config/seed');
};

// Uruchom serwer
server.listen(config.port, config.hostname, function () {
    logger.info('Serwer pod adresem ' + config.hostname + ':' + config.port + ', środowisko w trybie ' + app.get('env'));
});

// Opublikuj aplikację
exports = module.exports = app;
#!/bin/env node

/**
 * Main app
 */

'use strict';

// Wymuszenie inicjalizacji zmiennej określającej środowisko uruchomieniowe. Domyślnie ustawiane na develoment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express         = require('express');

// Załaduj konfigurację zależną od środowiska wykonawczego
var config          = require('./config/enviroment');

// Utwórz aplikację i serwer ...
var app = express();
var server = require('http').createServer(app);

// ... skonfiguruj aplikację. Patrz http://expressjs.com/api.html
require('./config/express')(app, config);

// Routing - jedna ścieżka dopasowana do wszystkich żądań
app
    .route('/*')
        .get(
            function(req, res) {
                res.json({node_version: process.version});
            }
        );

// Uruchom serwer
server.listen(config.port, config.hostname, function () {
    console.log('Serwer pod adresem ' + config.hostname + ':' + config.port + ' , środowisko w trybie ' + app.get('env'));
});

// Opublikuj aplikację
exports = module.exports = app;
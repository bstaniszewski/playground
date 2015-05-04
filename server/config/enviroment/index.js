'use strict';

var path        = require('path');
var _           = require('lodash');

/**
 * Przygotowanie konfiguracji przez złączenie obiektu konfiguracji bazowej z konfiguracją dla środowiska wykonawczego
 */
function prepareConfig(env) {
    var mergedConf = {};
    
    try {
        var envConf =  require('./' + env + '.js');
        mergedConf = _.merge(
            baseConf,
            envConf
        );
    } catch (err) {
        // Nie udało się znaleźć lub wczytać pliku z konfiguracją! Przyjmujemy domyślną konfigurację ...
        mergedConf = baseConf;
    };
 
    return mergedConf;
}

// Bazowa konfiguracja, która zostanie rozszerzona i/lub przykryta przez konfigurację dla środowiska wykonawczego
var baseConf = {
    env:        process.env.NODE_ENV,

    // Ścieżka do roota serwera
    root:       path.normalize(__dirname + '/../../..'), 
    
    // Domyślna nazwa hosta
    hostname:   'localhost',
    
    // Domyślny port
    port:       process.env.PORT || 9000,
    
    // Plik logu
    logPath:    './logs/log.log'
};

// Opublikuj konfigurację zależną od środowiska wykonawczego
module.exports = prepareConfig(process.env.NODE_ENV);


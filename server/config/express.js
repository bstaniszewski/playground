/**
 * Konfiguracja aplikacji Express - Patrz: http://expressjs.com/api.html
 * Kompletne podstawy - w zasadzie nic się tu na razie nie dzieje ...
 */

'use strict';

module.exports = function(app, config) {
    var env = app.get('env');
        
    console.log("Konfigurujemy express dla środowiska wykonawczego w trybie: " + env);
};
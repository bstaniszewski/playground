/**
 * Podłączenie obsługi błędów:
 * 5xx - obsługa błędów wykonania
 * 404 - obsługa niezdefiniowanych ścieżek
 */

'use strict';

var asyncEach               = require('async-each')
var errTo                   = require('errto');
var niceErr                 = require('nice-error');
var fs                      = require('fs');
var stackTrace              = require('stack-trace');

module.exports = function(app, config) {
    var env = app.get('env');

    // Zwiększenie zagłębienia w stosie wywołań dla informacji o błedzie
    Error.stackTraceLimit = 25;
    
    // Pobieranie instancji loggera
    var logger = app.get('logger');
    
    // 5xx - Obsługa błędów wykonania
    app.use(
        function(err, req, res, next){
            /*
                // Przekazanie obsługi do standardowej procedury obsługi błędów - wyświetli stos wywołań
                next(err);
            */
            
            // Pobierz stos wywołań
            var stack = stackTrace.parse(err);        
            
            err.status = err.status || 500;
            
            // Zaloguj błąd:
            // - nazwa,
            // - wiadomość,
            // - stos wywołań.
            logger.error(niceErr(err));
            
/*  --------------------------------------------------------------------------------------------
    TODO: Poprawić odpowiedź: kod błędu, format komunikatu - BEGIN
    -------------------------------------------------------------------------------------------*/

            res
                .status(500) // 500 Internal Server Error
                .send(
                    {
                        errors: [
                            {
                                name: err.name,
                                message: err.message,
                                status: err.status
                            }
                        ]
                    }
                );
            
/*  --------------------------------------------------------------------------------------------
    TODO: Poprawić odpowiedź: kod błędu, format komunikatu - END
    -------------------------------------------------------------------------------------------*/
        }
    );
    
    // 404 - W przypadku gdy żądanie nie zostało dopasowane do żadnej ścieżki
    app.use(
        function(req, res){
            logger.error('404 - nie znaleziono zasobu ' + req.url);
            res
                .status(404) // 404 Not Found
                .send(
                    {
                        errors: ['404 - nie znaleziono zasobu']
                    }
                );
        }
    );   
    
    logger.debug("Konfiguracja obsługi błędów dla środowiska w trybie: " + env);
};
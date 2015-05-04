'use strict';

// Do obs³ugi logowania wykorzystujê Winstona
var winston         = require('winston');

var logger;

module.exports = function(config) {
    if (!logger) {
        winston.emitErrs = true;
        
        logger = new winston.Logger(
            {
                // Koñcówki log'a
                transports: [
                    new winston.transports.File(
                        {
                            level: 'info',
                            filename: config.logPath,
                            handleExceptions: true,
                            json: true,
                            maxsize: 5242880, //5MB
                            maxFiles: 5,
                            colorize: false,
                            timestamp: true
                        }
                    ),
                    new winston.transports.Console(
                        {
                            level: 'debug',
                            handleExceptions: true,
                            json: false,
                            colorize: true,
                            timestamp: true
                        }
                    )
                ],
                exitOnError: false  
            }
        );
    
        logger.stream = {
            write: function(message, encoding){
                logger.info(message);
            }
        };
    }
    
    return logger;
}
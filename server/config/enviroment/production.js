'use strict';

module.exports = {
    // Nazwa lub ip hosta 
    hostname:   process.env.OPENSHIFT_NODEJS_IP ||
                process.env.IP ||
                undefined,

    // Port
    port:       process.env.OPENSHIFT_NODEJS_PORT ||
                process.env.PORT ||
                8080
};
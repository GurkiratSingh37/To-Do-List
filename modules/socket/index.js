'use strict';
const startup = require('./start');

const initialize = async(apiReference, server) => {
    global.socket = startup.initializeSocket(apiReference, server);
}

exports.initialize = initialize;
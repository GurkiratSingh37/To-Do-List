const envProperties = require('../properties/envProperties');
const database = require('../database');
const socket = require('../modules/socket');
const serverLib = require('../services/serverService');
const logging = require('../logging/logging');

const apiReferenceModule = 'startup';

const initializeServer = async()=>{
    let apiReference={
        module  : apiReferenceModule,
        api     : "initialize"
    }
    try{
        // server initialization
        const server = await serverLib.startAppServer(envProperties.port);

        // Databases Initialization
        const selectedDb = `${envProperties.selectedDb}`;
        await database.initialize(apiReference, selectedDb);

        // Sockets Initialization
        // await socket.initialize(apiReference, server);
    }
    catch(error){
        logging.logError(apiReference, {EVENT: "initializeServer", ERROR: error});
        throw new Error(error);
    }
}

exports.initializeServer = initializeServer;
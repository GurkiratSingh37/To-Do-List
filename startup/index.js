const envProperties = require('../properties/envProperties');
const database = require('../database');
const logging = require('../logging/logging');

const apiReferenceModule = 'startup';

const initializeServer = async()=>{
    let apiReference={
        module  : apiReferenceModule,
        api     : "initialize"
    }
    try{
        app.listen(envProperties.port,()=>{
            console.log(`Server Running on Port ${envProperties.port}`);
        });
        
        // Databases Initialization
        const selectedDb = `${envProperties.selectedDb}`;
        await database.initialize(apiReference, selectedDb);
    }
    catch(error){
        logging.logError(apiReference, {EVENT: "initializeServer", ERROR: error});
        throw new Error(error);
    }
}

exports.initializeServer = initializeServer;
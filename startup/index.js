const envProperties = require('../properties/envProperties');
const database = require('../database');

const initializeServer = async()=>{
    try{
        app.listen(envProperties.port,()=>{
            console.log(`Server Running on Port ${envProperties.port}`);
        });
    
        const selectedDb = `${envProperties.selectedDb}`;
        await database.initialize(selectedDb);
    }
    catch(error){
        throw new Error(error);
    }
}

exports.initializeServer = initializeServer;
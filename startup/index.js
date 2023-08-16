const envProperties = require('../properties/envProperties');
const database = require('../database');

const initializeServer = async()=>{
    app.listen(envProperties.port,()=>{
        console.log(`Server Running on Port ${envProperties.port}`);
    });

    const selectedDb = `${envProperties.selectedDb}`;
    await database.initialize(selectedDb);
}

exports.initializeServer = initializeServer;
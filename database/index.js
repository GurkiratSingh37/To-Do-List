
const mysqllib = require('./mysqllib');
const mongoCon = require('./mongodlib');
const dbProperties = require('./dbProperties');

async function initialize(selectedDb) {
        // global.mysqlCon = await mysqllib.initialize(dbProperties.mysql.master);
        global.mongoCon = await mongoCon.mongoConnect(dbProperties.mongodb.master);
}

exports.initialize                  = initialize;
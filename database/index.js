
const mysqllib = require('./mysqllib');
const mongolib = require('./mongolib');
const redislib = require('./redislib');
const dbProperties = require('./dbProperties');

async function initialize(apiReference, selectedDb) {
        global.mysqlCon = await mysqllib.initialize(apiReference, dbProperties.mysql.master);
        // global.mongolib = await mongolib.mongoConnect(dbProperties.mongodb.master);

        global.redisCon = await redislib.initialize(apiReference, dbProperties.redisdb);
}

exports.initialize                  = initialize;
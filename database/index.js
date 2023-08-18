
const mysqllib = require('./mysqllib');
const mongolib = require('./mongolib');
const redislib = require('./redislib');
const dbProperties = require('./dbProperties');

async function initialize(selectedDb) {
        global.mysqlCon = await mysqllib.initialize(dbProperties.mysql.master);
        // global.mongolib = await mongolib.mongoConnect(dbProperties.mongodb.master);

        global.redisCon = await redislib.initialize(dbProperties.redisdb.master);
}

exports.initialize                  = initialize;
const asyncredis = require('async-redis');
const dbProperties = require('./dbProperties');
const logging = require('../logging/logging');

// let PREFIX = dbProperties.redisdb.master.prefix;
PREFIX = "DEV-";

const initialize = async(apiReference, config)=>{
    const client = asyncredis.createClient({
        port: 6379,
        host: "localhost",
        password: '',
        socket_keepalive    : true
    });

    // to check if it connected change error to connect
    client.on("error",(error)=>{
        logging.logError(apiReference, {EVENT : "REDIS ERROR OCCURRED",  ERROR : error});
    });

    // PREFIX = config.prefix;
    
    logging.log(apiReference, "REDIS CONNECTED @ ");
    return client;
}

// return the value stored in Redis.
const get = async (apiReference, key)=>{
    logging.log(apiReference, {EVENT: "GET VALUE FROM REDIS ", KEY: PREFIX + key });
    return await redisCon.get((PREFIX)+key);
}

// setting/creating a key-value in Redis.
const set = async(apiReference, key, value)=>{
    logging.log(apiReference, {EVENT: "SET VALUE IN REDIS ", KEY: PREFIX + key });
    return await redisCon.set((PREFIX+key), value);
}

// deleting a key in Redis.
const del = async(apiReference, key, value)=>{
    logging.log(apiReference, {EVENT: "DELETE VALUE IN REDIS ", KEY: PREFIX + key });
    return await redisCon.del(PREFIX+key);
}

exports.initialize = initialize;
exports.get = get;
exports.set = set;
exports.del = del;
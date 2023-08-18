'use strict';

const config = require('config');

exports.mysql = {
    master:{
        host                : process.env.DB_HOST               || config.get('databaseSettings.mysql.master.host'),
        user                : process.env.DB_USERNAME           || config.get('databaseSettings.mysql.master.user'),
        password            : process.env.DB_PASSWORD           || config.get('databaseSettings.mysql.master.password'),
        database            : process.env.DB_NAME               || config.get('databaseSettings.mysql.master.database'),
        namedPlaceholders   : process.env.NAMED_PLACEHOLDERS    || config.get('databaseSettings.mysql.master.namedPlaceholders')
    }
}

exports.mongodb = {
    master:{
        url         : process.env.MONGO_URL         || config.get('databaseSettings.mongodb.master.url'),
        database    : process.env.MONGO_DATABASE    || config.get('databaseSettings.mongodb.master.database')
    }
}

exports.redisdb = {
    master:{
        host        : process.env.REDIS_PORT  || config.get('databaseSettings.redis.master.host'),
        port        : process.env.REDIS_HOST  || config.get('databaseSettings.redis.master.port'),
        password    : process.env.REDIS_PWD   || config.get('databaseSettings.redis.master.password'),
        prefix      : process.env.REDIS_PFIX  || config.get('databaseSettings.redis.master.prefix')
    }
}
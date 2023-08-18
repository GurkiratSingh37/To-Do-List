'use strict';

const jwtService = require('../../../services/jwtService');
const redisService = require('../../../database/redislib');
const logging = require('../../../logging/logging');

exports.setupJwtToken = async(apiReference, opts, time)=>{
    logging.log(apiReference, { EVENT: "fetchingDetails >> setupJWTToken :: ", OPTS: opts });
    /**
     * Creating New JWT Token
     */

    time = time || "30 days";

    const accessToken = await module.exports.generateJwt(apiReference, opts.fetchResponse, time);
    await module.exports.saveToCache(apiReference, opts.tokenKey, accessToken);
    return accessToken;
}

exports.generateJwt = async(apiReference, userData, expiryTime)=>{
    return await jwtService.createJWT(apiReference, userData, expiryTime);
}

exports.saveToCache = async (apiReference, key, val)=>{
    let result = await redisService.set(apiReference, key, val);
    logging.log(apiReference, { EVENT: "saveToCache", VAL: result });
    return result;
}
'use strict';

const jwt = require('jsonwebtoken');
const logging = require("../logging/logging");

const key = 'zmqBdy5UmQe4DMhuOnTcTBA';

const createJWT = (apiReference, opts, expiryTime)=>{
    logging.log(apiReference, {
        EVENT: "!! CREATING JWT !! ",
        OPTS:  opts
    });
    return jwt.sign(opts, key, {expiresIn: expiryTime || "2 days"});
}

const verifyJwt = (apiReference, tokenValue)=>{
    logging.log(apiReference, {EVENT: "!! Verifying JWT !! ",TOKEN:  tokenValue});
    let decoded;
    try{
        decoded = jwt.verify(tokenValue, key);
    } catch(error) {
        console.error("Invalid token!!", tokenValue, error);
    }
    logging.log(apiReference, { EVENT: "!! DECODED JWT !! ", OPTS:  decoded });
    return decoded;
    
}

exports.createJWT         = createJWT;
exports.verifyJwt         = verifyJwt;
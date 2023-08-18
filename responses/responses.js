'use strict';

const responseConstants = require('./responseConstants');

const success = (res, data, message) =>{
    let response = {
        message : message || responseConstants.responseMessages.SUCCESS,
        status : responseConstants.responseStatus.SUCCESS,
        data: data || {}
    }
    this.sendResponse(res, response);
}

const failure = (res, data, message) =>{
    let response = {
        message : message || responseConstants.responseMessages.FAILURE,
        status : responseConstants.responseStatus.FAILURE,
        data: data || {}
    }
    this.sendResponse(res, response);
}

const invalidAuthKey = (res, data, message)=>{
    let response = {
        message: responseConstants.responseMessages.INVALID_AUTH_KEY,
        status: responseConstants.responseStatus.SESSION_EXPIRED,
        data: data || {}
    };
    this.sendResponse(res, response);
}

const sendResponse = (res, data)=>{
    let response = JSON.stringify({
        message: data.message,
        status: data.status,
        data: data.data
    });

    res.status(data.status).send(response);
}


exports.success                   = success;
exports.failure                   = failure;
exports.sendResponse              = sendResponse;
exports.invalidAuthKey            = invalidAuthKey;
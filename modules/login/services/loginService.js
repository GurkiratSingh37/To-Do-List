'use strict';

const passwordService = require('../../../services/pwdServices');
const logging = require('../../../logging/logging');
const registerDao = require('../../register/dao/registerDao');

const constants = require('../../../responses/responseConstants');
const responses = require('../../../responses/responses');

const loginDao = require('../dao/loginDao');
const loginTokenService = require('../services/loginTokenService');

const jwt=require('jsonwebtoken');

exports.login = async(apiReference, values)=>{
    let response = {success: false};
    logging.log(apiReference, { EVENT: "Login User Service", OPTS: values });

    // 1. Checking for duplicate user.
    const queryValues={email: values.email}; // to pass only email for query

    let loginInfo = await registerDao.fetchDetails(apiReference, queryValues);

    console.log(loginInfo.data[0]);

    if (!loginInfo.success) {
        return loginInfo;
    }

    // Not Found!
    if(_.isEmpty(loginInfo.data[0])){
        response.error = constants.responseMessages.USER_NOT_FOUND;
        return response;
    }

    loginInfo = loginInfo.data[0][0];
    console.log(loginInfo);

    if(loginInfo.activity_status_code == 90){
        response.error = constants.responseMessages.USER_INACTIVE;
        return response;
    }

    const passwordComparison = await passwordService.compare(values.password, loginInfo.password);

    if(!passwordComparison){
        response.error = constants.responseMessages.INVALID_CREDENTIALS;
        return response;
    }

    // const tokenResponse = jwt.sign(loginInfo, 'secret', {expiresIn: "1h"});
    const tokenResponse = await module.exports.createJwtToken(apiReference, loginInfo);

    console.log(tokenResponse);

    loginInfo['access-token']=tokenResponse;

    response.success = true;
    response.data = {...tokenResponse};
    return response;

}

exports.createJwtToken = async(apiReference, userDetails, time)=>{
    logging.log(apiReference, { EVENT: "createJwtToken service", userDetails, time });
    let response = {success: false};

    let tokenKey=userDetails.email;
    console.log(tokenKey);
    let tokenResponse = await loginTokenService.setupJwtToken(apiReference, { fetchResponse: userDetails, tokenKey}, time);

    response.success = true;
    response.data = tokenResponse;
    return response;
}
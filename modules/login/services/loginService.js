'use strict';

const passwordService = require('../../../services/pwdServices');
const logging = require('../../../logging/logging');
const registerDao = require('../../Register/dao/registerDao');
const constants = require('../../../responses/responseConstants');

const loginDao = require('../dao/loginDao');
const loginTokenService = require('../services/loginTokenService');

const jwt=require('jsonwebtoken');

exports.login = async(apiReference, values)=>{
    let response = {success: false};
    logging.log(apiReference, { EVENT: "Login User Service", OPTS: values });

    let loginInfo = await registerDao.fetchDetails(apiReference, values);

    if (!loginInfo.success) {
        return loginInfo;
    }

    loginInfo = loginInfo.data[0][0];
    // console.log(loginInfo);

    const passwordComparison = await passwordService.compare(values.password, loginInfo.USER_PASSWORD);

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

    let tokenKey=userDetails.USER_EMAIL_ID;

    let tokenResponse = await loginTokenService.setupJwtToken(apiReference, { fetchResponse: userDetails, tokenKey}, time);

    response.success = true;
    response.data = tokenResponse;
    return response;
}
'use strict';

const logging = require('../../../logging/logging');
const passwordService = require('../../../services/pwdServices');
const registerDao = require('../dao/registerDao');
const constants = require('../../../responses/responseConstants');

exports.register = async(apiReference, values)=>{
    let response = {
        success: false
    };
    logging.log(apiReference, {EVENT: "Register User Service", opts: values});

    // 1 - Check for duplicate email

    let fetchObj={
        emailId:values.emailId
    }

    let fetchUserResponse = await registerDao.fetchDetails(apiReference, fetchObj);
    logging.log(apiReference, { EVENT: "Fetch User Details", RESPONSE: fetchUserResponse });

    console.log(fetchUserResponse.data[0].length)
    // 1.1 - if already present
    if(fetchUserResponse.data[0].length !== 0){
        response.error = constants.responseMessages.USER_ALREADY_REGISTERED;
        return response;
    }

    // 2 - Encrypting password
    values.password = passwordService.encrypt(values.password);

    const insertDaoResponse = await registerDao.register(apiReference, values);
    logging.log(apiReference, {EVENT: "Insert User Details", RESPONSE: insertDaoResponse});

    if (!insertDaoResponse.success) {
        response.is_duplicate = insertDaoResponse.is_duplicate;
        return response;
    }
    
    response.success = true;
    return response;
}
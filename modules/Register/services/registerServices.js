'use strict';

const logging = require('../../../logging/logging');
const passwordService = require('../../../services/pwdServices');
const registerDao = require('../dao/registerDao');
const constants = require('../../../responses/responseConstants');

const sendingMails = require('../../../services/mailService');

exports.register = async(apiReference, values)=>{
    let response = {
        success: false
    };
    logging.log(apiReference, {EVENT: "Register User Service", opts: values});

    // 1 - Check for duplicate email

    let fetchObj={
        email:values.email // to pass only email for query
    }

    let fetchUserResponse = await registerDao.fetchDetails(apiReference, fetchObj);
    logging.log(apiReference, { EVENT: "Fetch User Details", RESPONSE: fetchUserResponse });

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

    sendingMails.sendingMails(values.email_id, values.first_name, values.last_name);
    
    response.success = true;
    return response;
}



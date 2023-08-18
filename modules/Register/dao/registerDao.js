'use strict';

const logging = require('../../../logging/logging');
const dbHandler = require('../../../database/mysqllib');

exports.fetchDetails = async(apiReference, valuesObj) =>{
    let response = {success: false};
    logging.log(apiReference, {"EVENT" : "fetchDetails DAO", valuesObj});

    let query = `SELECT * FROM users WHERE USER_EMAIL_ID = ?`;
    let values=[];

    values.push(valuesObj.emailId);

    let queryResponse = await dbHandler.executeQuery(apiReference, "Fetch Credentials", query, values);

    if (queryResponse.ERROR){
        response.success = false;
        response.error   = queryResponse.ERROR;
        return response;
      }
    
      response.success = true;
      response.data    = queryResponse;
      return response;
}

exports.register = async(apiReference, valuesObj) => {
    let response = {success: false};
    logging.log(apiReference, {"EVENT" : "insertDetails DAO", valuesObj});

    let query = `INSERT INTO users (USER_EMAIL_ID, USER_PASSWORD) VALUES (?, ?)`;
    let values = [];

    values.push(valuesObj.emailId);
    values.push(valuesObj.password); // In 

    let queryResponse = await dbHandler.executeQuery(apiReference, "Fetch Credentials", query, values);

    if (queryResponse.ERROR){
        response.success = false;
        response.error   = queryResponse.ERROR;
        return response;
      }
    
      response.success = true;
      response.data    = queryResponse;
      return response;
}
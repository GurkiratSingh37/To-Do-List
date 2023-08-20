'use strict';

const logging = require('../../../logging/logging');
const dbHandler = require('../../../database/mysqllib');

exports.fetchDetails = async(apiReference, valuesObj) =>{
    let response = {success: false};
    logging.log(apiReference, {"EVENT" : "fetchDetails DAO", valuesObj});

    let query = `SELECT * FROM users WHERE ?`;
    let values=[valuesObj];

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

    console.log('');

    let query = `INSERT INTO users SET ?`;
    
    
    /** let values = Object.values(valuesObj); */ // Can use this but the ordering should be right in the database
    // OR i can map the key of the object with the column name of the database (means column names == keys of the object).

    let values=[valuesObj];

    // let values=[];
    // values.push(valuesObj.emailId);
    // values.push(valuesObj.password);
    // values.push(valuesObj.firstName);
    // values.push(valuesObj.lastName);

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
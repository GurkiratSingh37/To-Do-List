'use strict';

const logging = require('../../../logging/logging');
const dbHandler = require('../../../database/mysqllib');

exports.fetchDetails = async(apiReference, opts) =>{
    let response = {success: false};
    logging.log(apiReference, {"EVENT" : "fetchDetails DAO", OPTS: opts});

    let columns = opts.columns || "u.id, u.email, u.password";

    let joinString = "";

    let query = `SELECT ${columns} FROM todo_users u ${joinString} WHERE u.activity_status__code = '30'`;
    
    let values=[];
    if(opts.email){
      query+=` AND u.email = ?`
      values.push(opts.email);
    }

    let queryResponse = await dbHandler.executeQuery(apiReference, "Fetch Credentials", query, values);

    if (queryResponse.ERROR){
      if(queryResponse.ERROR=="ER_DUP_ENTRY"){
        response.success = false;
        response.error   = queryResponse.ERROR;
        
      }
      return response;
    }
    
      response.success = true;
      response.data    = queryResponse;
      return response;
}

exports.register = async(apiReference, opts, table) => {
    let response = {success: false};
    logging.log(apiReference, {"EVENT" : "insertDetails DAO", opts});

    let query = `INSERT INTO ${table || 'todo_users'} SET ?`;

    let values=[opts];

    let queryResponse = await dbHandler.executeQuery(apiReference, "Fetch Credentials", query, values);

    if (queryResponse.ERROR){
      if(queryResponse.ERROR=="ER_DUP_ENTRY"){
        response.success = false;
        response.error   = queryResponse.ERROR;
        
      }
      return response;
    }
    
    response.success = true;
    response.data    = queryResponse;
    return response;
}

const dbHandler = require('../../../database/mysqllib');
const logging = require('../../../logging/logging');
const constants = require('../../../responses/responseConstants')

exports.getList= async(apiReference, values) => {
    let response = { success : false };
    const query = `SELECT * FROM list_data WHERE ACTIVITY_STATUS_CODE = '30' ORDER BY id LIMIT ? OFFSET ?`;

    const val=[];

    val.push(parseFloat(values.limit));
    val.push(parseFloat(values.offset));

    let queryResponse = await dbHandler.executeQuery(apiReference, 'getList- fetch list', query, val);
    if(queryResponse.ERROR){
        response.data    = queryResponse.ERROR;
    
        return response;
    }
    logging.log(apiReference, {EVENT: "get List - mysqlDao", RESPONSE: queryResponse[0]});

    response.success = true;
    response.data    = queryResponse[0];

    return response;
}

// To create a task
exports.checkIfPresent= async(apiReference, values) => {
    let response = { success : false };
    logging.log(apiReference, {EVENT: 'checkIfPresent DAO'})

    const query="SELECT list_name FROM list_data where list_name=?";
    const val=[values];

    let queryResponse = await dbHandler.executeQuery(apiReference, 'checkIfPresent', query, val);
    logging.log(apiReference, {EVENT: "todoDao check if present Item", RESPONSE: queryResponse});

    if(queryResponse.ERROR){
        response.success = false;
        response.error = queryResponse.ERROR;
        return response;
    }

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.createItem= async(apiReference, values) => {
    let response = { success : false };

    const query=`insert into list_data (list_name, ACTIVITY_STATUS_CODE) values(?, '30')`;
    const val=[values];

    let queryResponse = await dbHandler.executeQuery(apiReference, 'createItem', query, val);
    logging.log(apiReference, {EVENT: "todoDao Create Item", RESPONSE: queryResponse});

    if(queryResponse.ERROR){
        // if(queryResponse.ERROR === 'ER_DUP_ENTRY'){
        //     response.success = false,
        //     response.is_duplicate = true,
        //     response.error   = constants.responseMessages.USER_ALREADY_REGISTERED;
        // }
        return response
    }

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.updateItem= async(apiReference, values) => {
    let response = { success : false };
    const query=`UPDATE list_data SET list_name=? WHERE list_name=? and ACTIVITY_STATUS_CODE='30';`;
    // const values=[value];

    let queryResponse = await dbHandler.executeQuery(apiReference, 'updateItem', query, values);
    logging.log(apiReference, {EVENT: "Update Item - todoDao", RESPONSE: queryResponse});

    if(queryResponse.ERROR){
        response.success = false;
        response.error = queryResponse.ERROR;
        return response;
    }

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.deleteItem = async (apiReference, values) =>{
    let response = { success : false };

    const query=`Update list_data SET ACTIVITY_STATUS_CODE='90' WHERE list_name=?;`;
    const val=[values];

    let queryResponse = await dbHandler.executeQuery(apiReference, 'deleteItem', query, val);
    logging.log(apiReference, {EVENT: "todoDao delete Item - mysqlDao", RESPONSE: queryResponse});

    if(queryResponse.ERROR){
        response.success = false;
        response.error = queryResponse.ERROR;
        return response;
    }

    response.success = true;
    response.data    = queryResponse;

    return response;
}
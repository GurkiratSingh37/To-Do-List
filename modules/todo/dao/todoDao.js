
const dbHandler = require('../../../database/mysqllib');

exports.getList= async(apiReference) => {
    let response = { success : false };
        const query = `SELECT * FROM list_data`;

        let queryResponse = await dbHandler.executeQuery(query, '');
        logging.log(apiReference, {EVENT: "get List - mysql", RESPONSE: queryResponse});
        // console.log(queryResponse);
    
        response.success = true;
        response.data    = queryResponse[0];
    
        return response;
}

// To create a task
exports.checkIfPresent= async(apiReference, item) => {
    let response = { success : false };
    logging.log(apiReference, {EVENT: 'checkIfPresent DAO'})

    const query="SELECT list_name FROM list_data where list_name=?";
    const values=[item];

    let queryResponse = await dbHandler.executeQuery(query, values);
    logging.log(apiReference, {EVENT: "todoDao check if present Item", RESPONSE: queryResponse});
    // console.log("todoDao check if present Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.createItem= async(apiReference, item) => {
    let response = { success : false };

    const query=`insert into list_data (list_name) values(?)`;
    const values=[item];

    let queryResponse = await dbHandler.executeQuery(query, values);
    logging.log(apiReference, {EVENT: "todoDao Create Item", RESPONSE: queryResponse});
    // console.log("todoDao Create Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.updateItem= async(value) => {
    let response = { success : false };
    const query=`UPDATE list_data SET list_name=? WHERE list_name=?;`;
    // const values=[value];

    let queryResponse = await dbHandler.executeQuery(query, value);
    logging.log(apiReference, {EVENT: "Update Item - todoDao", RESPONSE: queryResponse});
    // console.log("Update Item - todoDao:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.deleteItem = async (value) =>{
    let response = { success : false };

    const query=`delete from list_data WHERE list_name=?;`;
    const values=[value];

    let queryResponse = await dbHandler.executeQuery(query, values);
    logging.log(apiReference, {EVENT: "todoDao delete Item - mysqlDao", RESPONSE: queryResponse});
    // console.log("todoDao delete Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}

const dbHandler = require('../../../database/mysqllib');

exports.getList= async() => {
    let response = { success : false };
        const query = `SELECT * FROM list_data`;

        let queryResponse = await dbHandler.executeQuery(query, '');
        // console.log(queryResponse);
    
        response.success = true;
        response.data    = queryResponse[0];
    
        return response;
}

// To create a task
exports.checkIfPresent= async(item) => {
    let response = { success : false };
    const query="SELECT list_name FROM list_data where list_name=?";
    const values=[item];

    let queryResponse = await dbHandler.executeQuery(query, values);
    console.log("todoDao check if present Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;

}

exports.createItem= async(item) => {
    let response = { success : false };

    const query=`insert into list_data (list_name) values(?)`;
    const values=[item];

    let queryResponse = await dbHandler.executeQuery(query, values);
    console.log("todoDao Create Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.updateItem= async(value) => {
    let response = { success : false };
    const query=`UPDATE list_data SET list_name=? WHERE list_name=?;`;
    // const values=[value];

    let queryResponse = await dbHandler.executeQuery(query, value);
    console.log("todoDao Update Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.deleteItem = async (value) =>{
    let response = { success : false };

    const query=`delete from list_data WHERE list_name=?;`;
    const values=[value];

    let queryResponse = await dbHandler.executeQuery(query, values);
    console.log("todoDao delete Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}
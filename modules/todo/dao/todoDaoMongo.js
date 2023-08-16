const { getDb } = require('../../../database/mongodlib');
const logging = require('../../../logging/logging');

exports.getList= async(apiReference) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.find({}).toArray();
    logging.log(apiReference, {EVENT: "get List - mongodb", RESPONSE: queryResponse});
    // console.log(queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.checkIfPresent= async(apiReference, item) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');

    let queryResponse=await collection.find({'list_name':item}).toArray();
    logging.log(apiReference, {EVENT: "To check if it is present in the list already. MongoDao", RESPONSE: queryResponse});
    // console.log("To check if it is present in the list already: ",queryResponse);

    if(queryResponse.length === 0){
        return response;
    }
    else{
        response.success = true;
        response.data    = queryResponse;

        return response;
    }

}

exports.createItem= async(apiReference, item) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.insertOne({'list_name':item});
    logging.log(apiReference, {EVENT: "todoDao Create Item MongoDao", RESPONSE: queryResponse});
    // console.log("todoDao Create Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}


exports.updateItem= async(apiReference, values) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.updateOne({'list_name':values[1]},{$set:{'list_name':values[0]}});
    logging.log(apiReference, {EVENT: "todoDao Update Item MongoDao", RESPONSE: queryResponse});
    // console.log("todoDao Update Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.deleteItem = async (apiReference, value) =>{
    let response = { success : false };

   let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.deleteOne({'list_name':value});
    logging.log(apiReference, {EVENT: "todoDao delete Item MongoDao", RESPONSE: queryResponse});
    // console.log("todoDao delete Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}
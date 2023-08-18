const { getDb } = require('../../../database/mongolib');
const logging = require('../../../logging/logging');

exports.getList= async(apiReference) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.find({'ACTIVITY_STATUS_CODE': '30'}).toArray();
    logging.log(apiReference, {EVENT: "get List - mongodb", RESPONSE: queryResponse});

    if(queryResponse.ERROR){
        response.success = false;
        response.error = queryResponse.ERROR;
        return response;
    }

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.checkIfPresent= async(apiReference, values) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');

    let queryResponse=await collection.find({'list_name':values, 'ACTIVITY_STATUS_CODE': '30'}).toArray();
    logging.log(apiReference, {EVENT: "To check if it is present in the list already. MongoDao", RESPONSE: queryResponse});

    if(queryResponse.length === 0){
        return response;
    }
    else{
        response.success = true;
        response.data    = queryResponse;

        return response;
    }

}

exports.createItem= async(apiReference, values) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.insertOne({'list_name':values, 'ACTIVITY_STATUS_CODE':"30"});
    logging.log(apiReference, {EVENT: "todoDao Create Item MongoDao", RESPONSE: queryResponse});

    if(queryResponse.ERROR){
        response.success = false;
        response.error = queryResponse.ERROR;
        return response;
    }

    response.success = true;
    response.data    = queryResponse;

    return response;
}


exports.updateItem= async(apiReference, values) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.updateOne({'list_name':values[1], 'ACTIVITY_STATUS_CODE': '30'},{$set:{'list_name':values[0]}});
    logging.log(apiReference, {EVENT: "todoDao Update Item MongoDao", RESPONSE: queryResponse});

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

   let db=getDb();
    let collection=db.collection('list_data');
    
    // let queryResponse=await collection.deleteOne({'list_name':values});
    let queryResponse=await collection.updateOne({'list_name':values, 'ACTIVITY_STATUS_CODE': '30'},{$set:{'ACTIVITY_STATUS_CODE':'90'}});
    logging.log(apiReference, {EVENT: "todoDao delete Item MongoDao", RESPONSE: queryResponse});

    if(queryResponse.ERROR){
        response.success = false;
        response.error = queryResponse.ERROR;
        return response;
    }

    response.success = true;
    response.data    = queryResponse;

    return response;
}
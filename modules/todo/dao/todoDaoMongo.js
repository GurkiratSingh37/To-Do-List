const { getDb } = require('../../../database/mongodlib');

exports.getList= async() => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.find({}).toArray();

    console.log(queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.checkIfPresent= async(item) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');

    let queryResponse=await collection.find({'list_name':item}).toArray();
    console.log("To check if it is present in the list already: ",queryResponse);

    if(queryResponse.length === 0){
        return response;
    }
    else{
        response.success = true;
        response.data    = queryResponse;

        return response;
    }

}

exports.createItem= async(item) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.insertOne({'list_name':item});
    console.log("todoDao Create Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}


exports.updateItem= async(values) => {
    let response = { success : false };

    let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.updateOne({'list_name':values[1]},{$set:{'list_name':values[0]}});
    console.log("todoDao Update Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}

exports.deleteItem = async (value) =>{
    let response = { success : false };

   let db=getDb();
    let collection=db.collection('list_data');
    
    let queryResponse=await collection.deleteOne({'list_name':value});
    console.log("todoDao delete Item:",queryResponse);

    response.success = true;
    response.data    = queryResponse;

    return response;
}
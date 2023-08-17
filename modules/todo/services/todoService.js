
const todoDao = require('../dao/todoDao');
const todoDaoMongo = require('../dao/todoDaoMongo');
const envProperties = require('../../../properties/envProperties');
const logging = require('../../../logging/logging');

const selectedDb=envProperties.selectedDb;

exports.getList= async(apiReference, values) => {
    let response = { success: false };

    if(selectedDb === 'mysql'){
        let getResponse = await todoDao.getList(apiReference);

        if(!getResponse.success){
            return getResponse;
        }

        logging.log(apiReference, {EVENT: "getList - todoService-mysql", RESPONSE: getResponse});

        //------------- PAGINATION ---------------------
        const totalItems = getResponse.data.length;
        const page = values.page;
        const limit = values.limit;

        // calculating the starting and ending index
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        let results={};

        results=getResponse.data.slice(startIndex, endIndex);
        
        response.success = true;
        response.data = results;
        return response; 
    }
    else{
        let getResponse = await todoDaoMongo.getList(apiReference);
        logging.log(apiReference, {EVENT: "getList - todoService-mongodb", RESPONSE: getResponse});
        
        //------------- PAGINATION ---------------------
        const totalItems = getResponse.data.length;
        const page = values.page;
        const limit = values.limit;

        // calculating the starting and ending index
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        let results={};

        results=getResponse.data.slice(startIndex, endIndex);
        
        response.success = true;
        response.data = results;
        return response; 
    }
       
}

exports.createItem= async(apiReference, values) => {
    let response = { success: false };
    logging.log(apiReference, {EVENT: 'Inserting a task/item', ITEM: values});

    if(selectedDb === 'mysql'){
        
        let createItem=await todoDao.createItem(apiReference, values);
        logging.log(apiReference, {EVENT: 'Item Created - todoService mysql', RESPONSE: createItem});

        if(!createItem.success){
            return response;
        }

        response.success = true;
        response.message = `Added Sucessfully`;
        return response;
    }
    /* ---------Mongo-DB-------- */
    else{

        let createItem = await todoDaoMongo.createItem(apiReference, values);
        logging.log(apiReference, {EVENT: "Created Item- todoService-mongodb", RESPONSE: createItem});

        if(!createItem.success){
            return response;
        }

        response.success = true;
        response.message = `Added Sucessfully`;
        return response;
        
    }    
}


exports.updateItem= async(apiReference, values) => {
    let response = { success: false };

    if(selectedDb === 'mysql'){
        let getResponse = await todoDao.updateItem(apiReference, values);
    
        getResponse = getResponse.data[0];
        logging.log(apiReference, {EVENT: "updateList Item- todoService-mysql", RESPONSE: getResponse});
        
        response.success = true;
        response.data = getResponse;
        return response;  
    }
    else{
        let getResponse = await todoDaoMongo.updateItem(apiReference, values); 
        logging.log(apiReference, {EVENT: "updateList Item- todoService-mongodb", RESPONSE: getResponse});   

        response.success = true;
        response.data = getResponse;
        return response;  

    }
    
}

exports.deleteItem = async(apiReference, values) =>{
    let response = { success:false };

    if(selectedDb === 'mysql'){
        let getResponse = await todoDao.deleteItem(apiReference, values);
        logging.log(apiReference, {EVENT: "delete Item - todoService-mysql", RESPONSE: getResponse});
    
        response.success = true;
        response.message = `Deleted Sucessfully`;
        return response;
    }
    else{
        let getResponse = await todoDaoMongo.deleteItem(apiReference, values);
        logging.log(apiReference, {EVENT: "delete Item- todoService-mongodb", RESPONSE: getResponse});
    
        response.success = true;
        response.message = `Deleted Sucessfully`;
        return response;
    }
}
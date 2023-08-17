
const todoDao = require('../dao/todoDao');
const todoDaoMongo = require('../dao/todoDaoMongo');
const envProperties = require('../../../properties/envProperties');
const logging = require('../../../logging/logging');

const selectedDb=envProperties.selectedDb;

exports.getList= async(apiReference, queryParams) => {
    let response = { success: false };

    if(selectedDb === 'mysql'){
        let getResponse = await todoDao.getList(apiReference);

        if(!getResponse.success){
            return getResponse;
        }

        logging.log(apiReference, {EVENT: "getList - todoService-mysql", RESPONSE: getResponse});
        // console.log('getResponse - todoService', getResponse);

        //------------- PAGINATION ---------------------
        const totalItems = getResponse.data.length;
        const page = queryParams.page;
        const limit = queryParams.limit;

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
        // console.log('getResponse - todoService', getResponse);
        
        //------------- PAGINATION ---------------------
        const totalItems = getResponse.data.length;
        const page = queryParams.page;
        const limit = queryParams.limit;

        // calculating the starting and ending index
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results={};

        results=getResponse.data.slice(startIndex, endIndex);
        
        response.success = true;
        response.data = results;
        return response; 
    }
       
}

exports.createItem= async(apiReference, item) => {
    let response = { success: false };
    logging.log(apiReference, {EVENT: 'Inserting a task/item', ITEM: item});

    if(selectedDb === 'mysql'){
        let checkIfPresent = await todoDao.checkIfPresent(apiReference, item);
        logging.log(apiReference, {EVENT: 'Details of check If item is Present', RESPONSE: checkIfPresent});
        // console.log("-----------------",checkIfPresent.data[0].length);
    
        if(checkIfPresent.data[0].length>0){
            response.success = true;
            response.data='Already present in the list';
            return response;
        } 
        else{
            let createItem=await todoDao.createItem(apiReference, item);
            logging.log(apiReference, {EVENT: 'Item Created - todoService mysql', RESPONSE: createItem});
            // console.log("In else, createItem:",createItem);
    
            const affectedRows=createItem.data[0].affectedRows;
            // console.log(affectedRows);
            if(affectedRows === 1){
                response.data=`Task added in the list`;
            } else{
                response.data=`Error in adding`;
            }
        }
    
        console.log('getResponse - todoService', response);
        
        response.success = true;
        return response;
    }
    /* ---------Mongo-DB-------- */
    else{
        let checkIfPresent = await todoDaoMongo.checkIfPresent(apiReference, item);

        if(!checkIfPresent.success){
            let createItem = await todoDaoMongo.createItem(apiReference, item);
            logging.log(apiReference, {EVENT: "Created Item- todoService-mongodb", RESPONSE: createItem});

            response.success = true;
            response.data = `Added Sucessfully`;
            return response;
        }
        else{
            return response;
        }
        
    }    
}


exports.updateItem= async(apiReference, values) => {
    let response = { success: false };

    if(selectedDb === 'mysql'){
        let getResponse = await todoDao.updateItem(apiReference, values);
    
        getResponse = getResponse.data[0];
        logging.log(apiReference, {EVENT: "updateList Item- todoService-mysql", RESPONSE: getResponse});
        // console.log('getResponse - todoService', getResponse);
        
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
        // console.log('getResponse - todoService', response);
    
        response.success = true;
        return response;
    }
    else{
        let getResponse = await todoDaoMongo.deleteItem(apiReference, values);
        logging.log(apiReference, {EVENT: "delete Item- todoService-mongodb", RESPONSE: getResponse});
        // console.log('getResponse - todoService', response);
    
        response.success = true;
        return response;
    }
}
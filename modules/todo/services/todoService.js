
const todoDao = require('../dao/todoDao');
const todoDaoMongo = require('../dao/todoDaoMongo');
const envProperties = require('../../../properties/envProperties');

const selectedDb=envProperties.selectedDb;

exports.getList= async() => {
    let response = { success: false };

    if(selectedDb === 'mysql'){
        let getResponse = await todoDao.getList();
    
        getResponse = getResponse;
        console.log('getResponse - todoService', getResponse);
        
        response.success = true;
        response.data = getResponse;
        return response; 
    }
    else{
        let getResponse = await todoDaoMongo.getList();

        getResponse = getResponse;
        console.log('getResponse - todoService', getResponse);
        
        response.success = true;
        response.data = getResponse;
        return response; 
    }
       
}

exports.createItem= async(item) => {
    let response = { success: false };

    if(selectedDb === 'mysql'){
        let checkIfPresent = await todoDao.checkIfPresent(item);
        // console.log("-----------------",checkIfPresent.data[0].length);
    
        if(checkIfPresent.data[0].length>0){
            response.success = true;
            response.data='Already present in the list';
            return response;
        } 
        else{
            let createItem=await todoDao.createItem(item);
    
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
        let checkIfPresent = await todoDaoMongo.checkIfPresent(item);

        if(!checkIfPresent.success){
            let createItem = await todoDaoMongo.createItem(item);

            response.success = true;
            response.data = `Added Sucessfully`;
            return response;
        }
        else{
            return response;
        }
        
    }    
}


exports.updateItem= async(values) => {
    let response = { success: false };

    if(selectedDb === 'mysql'){
        let getResponse = await todoDao.updateItem(values);
    
        getResponse = getResponse.data[0];
        console.log('getResponse - todoService', getResponse);
        
        response.success = true;
        response.data = getResponse;
        return response;  
    }
    else{
        let getResponse = await todoDaoMongo.updateItem(values);    

        response.success = true;
        response.data = getResponse;
        return response;  

    }
    
}

exports.deleteItem = async(values) =>{
    let response = { success:false };

    if(selectedDb === 'mysql'){
        let getResponse = await todoDao.deleteItem(values);

        console.log('getResponse - todoService', response);
    
        response.success = true;
        return response;
    }
    else{
        let getResponse = await todoDaoMongo.deleteItem(values);

        console.log('getResponse - todoService', response);
    
        response.success = true;
        return response;
    }
}
'use strict';

const moment = require('moment');

const fileSwitches = {
    startup : true,
    todo    : true
};

const modules = {
    startup : {
        initialize : true
    },
    todo : {
        getList     : true,
        createItem  : true,
        updateItem  : true,
        deleteItem  : true
    }
}

const log = (apiReference, log) =>{
    // console.log('--------------------------');
    // console.log(apiReference);
    // console.log(apiReference.module);
    // console.log(apiReference.api);
    // console.log(modules[apiReference.module]);
    // console.log(modules[apiReference.module][apiReference.api]);
    // console.log(modules[apiReference.module][apiReference.api]==true);
    // console.log('--------------------------');

    if(apiReference && apiReference.module && apiReference.api && fileSwitches && fileSwitches[apiReference.module] == true 
        && modules && modules[apiReference.module] && modules[apiReference.module][apiReference.api] == true){

        // console.log("YESDDASssssss loggg");
        try{
            log = JSON.stringify(log);
        }
        catch(exception){
            console.error('>>>>> EXCEPTION <<<<', exception);
        }

        console.log("-->" + moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS') + " :----: " +
        apiReference.module + " :=: " + apiReference.api + " :=: " + log);
    }
}

const logError = (apiReference, log) => {
  if (apiReference
    && apiReference.module
    && apiReference.api) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.error("-->" + moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS') + " :----: " +
      apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
};


exports.log      = log;
exports.logError = logError;

const mysql = require('mysql2');
const logging = require('../logging/logging');

const initialize = async (apiReference, config) => {
    let numConnectionsInPool = 0;

    logging.log(apiReference, "STARTING MYSQL CONNECTION @ ");
    let conn=mysql.createPool(config).promise();

    conn.on('connection', function (connection) {
        numConnectionsInPool++;
        console.log('CONNECTION IN POOL : ', numConnectionsInPool);
    });

    conn.on('error', function(error){
        logging.logError(apiReference, {EVENT : "MYSQL_CONN_ERROR",  ERROR : error});
        return initialize(apiReference, config); // Try again!!!
    })

    return conn;
}

const executeQuery = async(apiReference, event, queryString, params) => {
    let sqlQuery = await mysqlCon.format(queryString, params);
    try{
        let sqlResult = await mysqlCon.query(queryString, params);

        logging.log(apiReference, { EVENT     : "Executing query " + event, QUERY: sqlQuery,
        SQL_RESULT: sqlResult, SQL_RESULT_LENGTH: sqlResult && sqlResult.length });

        return sqlResult;
    }
    catch(sqlError){
        logging.logError(apiReference, {EVENT: " Error in executing while " + event, SQL_ERROR: sqlError, QUERY: sqlQuery});

        // If a deadlock or query interruption error occurs, retry the query after a delay.
        if (sqlError.code === 'ER_LOCK_DEADLOCK' || sqlError.code === 'ER_QUERY_INTERRUPTED') {
            setTimeout(executeQuery.bind(null, apiReference, event, queryString, params), 50);
          }
          else if (sqlError.code == "ER_DUP_ENTRY") {
            // If a duplicate entry error occurs, return an object indicating the error.
            return {
              success: false,
              ERROR: "ER_DUP_ENTRY"
            }
          } 
          else {
            // For other errors, return an object with detailed error information.
            return {success: false, ERROR: sqlError.message, QUERY: queryString, PARAMS: params, EVENT: event};
          }
    }
    
}

exports.initialize                  = initialize;
exports.executeQuery                = executeQuery;

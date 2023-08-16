
const mysql = require('mysql2');

const initialize = async (config) => {
    let numConnectionsInPool = 0;
    let conn=mysql.createPool(config).promise();

    conn.on('connection', function (connection) {
        numConnectionsInPool++;
        console.log('CONNECTION IN POOL : ', numConnectionsInPool);
    });

    return conn;
}

const executeQuery = async(queryString, params) => {
    // let sqlQuery = await mysqlCon.format(queryString, params);

    let sqlResult = await mysqlCon.query(queryString, params);

    return sqlResult;
}

exports.initialize                  = initialize;
exports.executeQuery                = executeQuery;

/*
const mysql = require('mysql2');

const pool=mysql.createPool({  // i want pool of connections to run multiple queries cause each query needs it's own connection
        host: '',
        user: '',
        password: '',
        database: '',
        namedPlaceholders: true
});
    
exports.pool=pool.promise();
*/

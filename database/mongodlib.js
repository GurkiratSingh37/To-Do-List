const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;


const mongoConnect = async (config) => {
    try{
        const client = await MongoClient.connect(config.url);
        // await client.connect();
        console.log('Connected');
        
        _db = client.db(config.database);
        console.log('Database connected:', config.database);
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error);
    }
}

const getDb=()=>{
    if(_db){
        return _db;
    }
    throw 'No Database found!!!'
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;
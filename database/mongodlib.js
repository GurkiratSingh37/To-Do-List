const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// const client = new MongoClient('');
// const database = 'to_do_list';

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



/*
const url = '';
const database = '';
const client = new MongoClient(url);

const mongoConnect = callback => {
    MongoClient.connect('')
    .then(result => {
        console.log('Connected');
        _db=result.db('');
        callback(result);
    })
    .catch(err=>{
        console.log(err);
    });

    mongoConnect() // Call the function here to connect to MongoDB
  .then(() => {
    console.log('YESSSsss');
  })
  .catch(error => {
    console.error('Error:', error);
  });

mongoConnect( ()=>{
    console.log('YESSSsss');
})
*/




/*
    let result = await client.connect();
    console.log('Connected');

    let db=result.db(database);
    let collection=db.collection('');

    return collection;
    
    let response=await collection.find({'list_name':'Playing Basketball'}).toArray();
    console.log(response);
    */





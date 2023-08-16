// const mongoose = require('mongoose');

// const uri = 'mongodb+srv://sgurkirat3788:Qwertyasd123@cluster0.x3yrlvl.mongodb.net/';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const url = 'mongodb+srv://sgurkirat3788:Qwertyasd123@cluster0.x3yrlvl.mongodb.net/';
const database = 'to_do_list';
const client = new MongoClient(url);

const mongoConnect = callback => {

    MongoClient.connect('mongodb+srv://sgurkirat3788:Qwertyasd123@cluster0.x3yrlvl.mongodb.net/')
    .then(result => {
        console.log('Connected');
        _db=result.db('to_do_list');
        callback(result);
    })
    .catch(err=>{
        console.log(err);
    });
}

const getDb=()=>{
    if(_db){
        return _db;
    }
    throw 'No Database found!!!'
}

mongoConnect( ()=>{
    console.log('YESSSsss');
})

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;






/*
    let result = await client.connect();
    console.log('Connected');

    let db=result.db(database);
    let collection=db.collection('list_data');

    return collection;
    
    let response=await collection.find({'list_name':'Playing Basketball'}).toArray();
    console.log(response);
    */





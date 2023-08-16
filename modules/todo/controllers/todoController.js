"use strict";

const { getDb } = require('../../../database/mongodlib');
const db = require('../../../util/database');
const todoService = require('../services/todoService');
const mongoDb=require('../../../database/mongodlib').getDb;

exports.getList = async (req, res, next) => {
    try{
        const response = await todoService.getList();

        if(response.success){
            // return {res}
            res.status(200).send(response.data);
            // res.send(res, response.data);
        }
        
    } 
    catch(error){
        console.log(error);
    }
}

exports.createItem = async (req, res, next) => {
    
    try{
        const item=req.body.item;
        const response = await todoService.createItem(item);
        if(response.success){
            res.status(201).send(response);
        }
        else{
            res.status(401).send(response);
        }
        
    }
    catch(error){
        console.log(error);
    }
    
}

exports.updateItem = async (req, res, next) => {
    const present= req.body.item;
    const changed_item= req.body.changed_item;

    try{

        const values = [changed_item, present];

        const response = await todoService.updateItem(values);
        if(response.success){
            res.status(200).send(response);
        }
    }
    catch(error){
        console.log(error);
    }
}

exports.deleteItem = async (req, res, next) => {
    try{
        const present= req.body.item;

        const response = await todoService.deleteItem(present);

        if(response.success){
            res.status(200).send(response);
        }
    }
    catch(error){
        console.log(error);
    }
}





/*
exports.getList = (req, res, next) => {
    db.pool.execute('SELECT * FROM list_data').then(
        result=>{
            return res.send(result[0].map(list=>list.item_name));
        }
    ).catch(err=>{
        console.log(err);
    });
}
*/

/*
exports.createItem = async (req, res, next) => {
    const item=req.body.item;

    const query="SELECT item_name FROM list_data where item_name=?";
    const values=[item];
    console.log(values)

    await db.pool.execute(query, values).then(result=>{
        // console.log(result[0]);
        if(result[0].length>0){
            return res.send('Already present in the list');
        } 
        else{
            db.pool.execute(`insert into list_data (item_name) values(?)`, values).then(result=>{
                const affectedRows=result[0].affectedRows;
                if(affectedRows === 1){
                    res.send(`Task added in the list`);
                } else{
                    res.send(`Error in adding`);
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    }).catch(err=>{
        console.log(err);
    });
}
*/
/*
exports.updateItem = (req, res, next) => {
    const present= req.body.item;
    const changed_item= req.body.changed_item;

    const query="UPDATE list_data SET item_name=? WHERE item_name=?;";
    const values = [changed_item, present];

    db.pool.execute(query, values)
    .then(result=>{
        const affectedRows=result[0].affectedRows;
        if(affectedRows === 1){
            res.send(`List Updated...!!!`);
        } else{
            res.send(`Not present in the list`);
        }

        // res.send(`List Updated...!!!`);

    }).catch(err=>{
        console.log(err);
    });
}
*/

/*
exports.deleteItem = (req, res, next) => {
    const present= req.body.item;

    const query="delete from list_data WHERE item_name=?;";
    const values=[present];
    console.log(values);

    db.pool.execute(query, values).then(result=>{
        const affectedRows=result[0].affectedRows;
        if(affectedRows === 1){
            res.send(`Deleted Successfully...!!!`);
        } else{
            res.send(`Not present in the list`);
        }
        // res.send('Deleted Successfully');
    }).catch(err=>{
        console.log(err);
    });
}
*/
"use strict";

const todoService = require('../services/todoService');
const responses = require('../../../responses/responses');

exports.getList = async (req, res, next) => {
    let apiReference = req.apiReference;

    try{
        let queryParams   = { ...req.query }; // params: limit & page

        const response = await todoService.getList(apiReference, queryParams);

        if(response.success){
            return responses.success(res, response.data);
            // res.status(200).send(response.data);
        }
        
    } 
    catch(error){
        console.log(error);
    }
}

exports.createItem = async (req, res, next) => {
    let apiReference = req.apiReference;
    
    try{
        const requestBody=req.body.item;
        const response = await todoService.createItem(apiReference, requestBody);
        if(response.success){
            return responses.success(res, response.data, response.message);
        }
            return responses.failure(res, response.error);
        
    }
    catch(error){
        console.log(error);
    }
    
}

exports.updateItem = async (req, res, next) => {
    const present= req.body.item;
    const changed_item= req.body.changed_item;

    let apiReference = req.apiReference;

    try{

        const requestBody = [changed_item, present];

        const response = await todoService.updateItem(apiReference, requestBody);
        if(response.success){
            return responses.success(res, response.data);
        }
    }
    catch(error){
        console.log(error);
    }
}

exports.deleteItem = async (req, res, next) => {
    let apiReference = req.apiReference;
    
    try{
        const requestBody= req.body.item;

        const response = await todoService.deleteItem(apiReference, requestBody);

        if(response.success){
            return responses.success(res, response.data, response.message);
        }
    }
    catch(error){
        console.log(error);
    }
}
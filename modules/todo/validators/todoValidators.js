const Joi = require('joi');
const validators=require('../../../validators/joiValidators');

const constants = require('../../../responses/responseConstants');
const apiReferenceModule = constants.modules.TODO;

const getList= async (req, res, next)=>{
    req.apiReference={
        module: apiReferenceModule,
        api: 'getList'
    }

    const schema = Joi.object({
        page: Joi.number().optional(),
        limit: Joi.number().optional()
    });

    let reqBody = {...req.query};
    let request = {...req};

    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    if(validFields){
        next();
    }
}

const createItem = async(req, res, next)=>{
    req.apiReference = {
        module: apiReferenceModule,
        api: 'createItem'
    }

    const schema = Joi.object({
        item: Joi.string().max(30).required()
    });    

    let reqBody = { ... req.body };
    let request = { ... req }; // for validating headers

    let validFields=await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    if (validFields) {
        next();
    }
}

const updateItem = async(req, res, next)=>{
    req.apiReference={
        module: apiReferenceModule,
        api: 'updateItem'
    }

    const schema = Joi.object({
        item: Joi.string().required(),
        changed_item: Joi.string().required()
    });

    let reqBody = { ... req.body };
    let request = { ... req }; // for validating headers

    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    if(validFields){
        next();
    }
}

const deleteItem = async(req, res, next) =>{
    req.apiReference={
        module: apiReferenceModule,
        api: 'deleteItem'
    }

    const schema = Joi.object({
        item: Joi.string().required()
    });

    let reqBody = {...req.body};
    let request = {...req};

    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    if(validFields){
        next();
    }
}

exports.createItem=createItem;
exports.updateItem=updateItem;
exports.deleteItem=deleteItem;
exports.getList=getList;
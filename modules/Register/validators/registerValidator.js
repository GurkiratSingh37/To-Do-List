'use strict';

const Joi = require('joi');
const validators = require('../../../validators/joiValidators');

const constants=require('../../../responses/responseConstants');
const apiReferenceModule = constants.modules.REGISTER;

const register = async (req, res, next)=>{
    req.apiReference={
        module: apiReferenceModule,
        api: 'register'
    }

    let schema = Joi.object({
        first_name  : Joi.string().required(),
        last_name   : Joi.string().required(),
        email       : Joi.string().required(),
        password    : Joi.string().required()
    })

    const reqBody = {...req.body};
    const request = {...req};

    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    if(validFields){
        next();
    }

    return 
}

exports.register = register;
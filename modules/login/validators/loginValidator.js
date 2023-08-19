'use strict';

const Joi = require('joi');

const validators = require('../../../validators/joiValidators');
const constants = require('../../../responses/responseConstants');
const moduleReference = constants.modules.LOGIN;

const login = async(req, res, next)=>{
    req.apiReference = {
        module: moduleReference,
        api: 'login'
    }

    const schema = Joi.object({
        email_id: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const reqBody = {...req.body};
    const request = {...req};

    const validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);

    if(validFields){
        next();
    }

}

exports.login = login;
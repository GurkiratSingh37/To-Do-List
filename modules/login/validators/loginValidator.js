'use strict';

const Joi = require('joi');

const validators = require('../../../validators/joiValidators');
const constants = require('../../../responses/responseConstants');
const moduleReference = constants.modules.LOGIN;

const loginWithPassword = async(req, res, next)=>{
    req.apiReference = {
        module: moduleReference,
        api: 'loginWithPassword'
    }

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const reqBody = {...req.body};
    const request = {...req};

    const validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);

    if(validFields){
        next();
    }

}

const sendOtp = (req, res, next)=>{
    req.apiReference = {
        module: constants.modules.LOGIN,
        api: 'sendOtp'
    }

    let reqBody = {...req.body};

    const schema = Joi.object({
        country_code: Joi.string().required(),
        phone_number: Joi.string().required()
    })
}

exports.loginWithPassword = loginWithPassword;
exports.sendOtp = sendOtp;
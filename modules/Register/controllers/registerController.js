'use strict';

const registerService = require('../services/registerServices');
const logging = require('../../../logging/logging');
const responses = require('../../../responses/responses');
const constants = require('../../../responses/responseConstants');

exports.register = async (req, res, next)=>{
    const apiReference = req.apiReference;
    const reqBody = {...req.body};

    try{
        const response = await registerService.register(apiReference, reqBody);

        logging.log(apiReference, { serviceResponse: response});

        if(response.success){
            return responses.success(res, response.data, constants.responseMessages.REGISTER_SUCCESS);
        }
        return responses.failure(res, {}, response.error);
    }
    catch(error){
        console.log(error);
    }
}
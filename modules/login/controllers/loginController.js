'use strict';

const loginService = require('../services/loginService');
const responses = require('../../../responses/responses');
const logging = require('../../../logging/logging');

exports.login = async (req, res, next)=>{
    const apiReference = req.apiReference;
    const reqBody = {...req.body};

    try{
        const response = await loginService.login(apiReference, reqBody);
        logging.log(apiReference, { finalResponse: response });

        if(response.success){
            return responses.success(res, response.data);
        }

        return responses.failure(res, response.data || {}, response.error);
    }
    catch(error){
        console.log(error);
    }
}
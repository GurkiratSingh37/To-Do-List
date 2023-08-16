const Joi = require('joi');

const logging = require('../logging/logging');

const joiValidate = async(apiReference, body, schema, res) => {
    logging.log(apiReference, {EVENT: 'validateFields', BODY: body})

    try{
        let validation = await schema.validateAsync(body);
        logging.log(apiReference, {validationResp: validation});
        // console.log('Validation:',validation);
        return true;
    }
    catch(error){
        logging.logError(apiReference, error);
        return false;
    }
}

const validateFields = async (apiReference, req, body, res, schema) =>{
    return await joiValidate(apiReference, body, schema, res);
}

exports.validateFields = validateFields;
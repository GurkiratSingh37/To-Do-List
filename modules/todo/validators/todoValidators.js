const Joi = require('joi');
const validators=require('../../../validators/joiValidators')

const getList = async(req, res, next)=>{
    const schema = Joi.object({
        item: Joi.string().required()
    });

    let reqBody = { ... req.body };
    let request = { ... req };

    let validFields=await validators.validFields(request, reqBody, res, schema);
    if (validFields) {
        next();
    }
}

exports.getList=getList;
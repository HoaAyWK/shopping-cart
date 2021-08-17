var Joi = require('joi');

module.exports.validation = data => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    });
    return schema.validate(data);
};

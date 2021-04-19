const joi = require('@hapi/joi');

 const schema = joi.object({
    Name: joi.string().min(3).max(10).pattern(new RegExp("^[A-Z]{1}[a-z]{2,}$")).required(),
    GreetingMessage: joi.string().required()
})


module.exports = {schema,}
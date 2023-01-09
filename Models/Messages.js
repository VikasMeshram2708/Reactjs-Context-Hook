
// Create a Schema For Messages 

const Joi = require('joi');

const MsgSchema = Joi.object({
  title:Joi.string().trim().min(2).max(150).required(),
  answer:Joi.string().trim().min(2).max(300).required(),
});

module.exports = MsgSchema;
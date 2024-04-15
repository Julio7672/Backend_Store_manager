const Joi = require('joi');

const productValidate = Joi.string().min(5);

module.exports = {
  productValidate,
};

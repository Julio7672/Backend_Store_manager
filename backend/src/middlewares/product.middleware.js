const { productValidate } = require('../services/schemas/products.schema');

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  const { error } = productValidate.validate(name);
  if (error) {
    return res.status(422).json({ 
      message: '"name" length must be at least 5 characters long', 
    }); 
  }
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const inputValidate = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

module.exports = {
  nameValidation,
  inputValidate,
};

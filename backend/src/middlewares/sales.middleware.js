const { products } = require('../models');

const inputValidate = (req, res, next) => {
  const product = req.body;
  const checkQuantity = product.some(
    (item) => item.quantity < 1,
  );
  if (checkQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const emptyField = (req, res, next) => {
  const product = req.body;
  const checkQuantity = product.some(
    (item) => item.quantity === undefined,
  );
  if (checkQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  const checkProductId = product.some(
    (item) => item.productId === undefined,
  );
  if (checkProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const productExist = async (req, res, next) => {
  const product = req.body;
  const getProduct = await Promise.all(product.map(
    async (item) => products.findById(item.productId),
  ));
  const checkProductId = getProduct.some(
    (item) => item === undefined,
  );
  if (checkProductId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  inputValidate,
  emptyField,
  productExist,
};

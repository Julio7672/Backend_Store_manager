const route = require('express').Router();
const { nameValidation, inputValidate } = require('../middlewares/product.middleware');
const { productsController } = require('../controllers');

route.get('/', productsController.findAll);
route.get('/:id', productsController.findById);
route.post('/', inputValidate, nameValidation, productsController.create);
route.put('/:id', inputValidate, nameValidation, productsController.update);
route.delete('/:id', productsController.remove);

module.exports = route;

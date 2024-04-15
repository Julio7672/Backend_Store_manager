const route = require('express').Router();
const { inputValidate, emptyField,
  productExist } = require('../middlewares/sales.middleware');
const { salesController } = require('../controllers');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);
route.post('/', emptyField, inputValidate, productExist, salesController.create);

module.exports = route;

const { salesService } = require('../services');
const StatusHTTP = require('../utils/StatusHTTP');

const findAll = async (_req, res) => {
  const products = await salesService.findAll();
  return res.status(StatusHTTP[products.status]).json(products.data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await salesService.findById(id);
  return res.status(StatusHTTP[product.status]).json(product.data);
};

const create = async (req, res) => {
  const sale = req.body;
  const { status, data } = await salesService.create(sale);
  return res.status(StatusHTTP[status]).json(data);
};

module.exports = {
  findAll,
  findById,
  create,
};

const { productService } = require('../services');
const StatusHTTP = require('../utils/StatusHTTP');

const findAll = async (_req, res) => {
  const products = await productService.findAll();
  return res.status(StatusHTTP[products.status]).json(products.data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  return res.status(StatusHTTP[product.status]).json(product.data);
};

const create = async (req, res) => {
  const product = req.body;
  const created = await productService.create(product);
  res.status(StatusHTTP[created.status]).json(created.data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const updated = await productService.update(id, product);
  res.status(StatusHTTP[updated.status]).json(updated.data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await productService.remove(id);
  if (deleted.status === 'SUCCESSFUL') return res.status(204).end();
  res.status(StatusHTTP[deleted.status]).json(deleted.data);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};

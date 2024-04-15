const { products } = require('../models');

const findAll = async () => {
  const Products = await products.findAll();
  return { status: 'SUCCESSFUL', data: Products };
};

const findById = async (id) => {
  const product = await products.findById(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  } 
  return { status: 'SUCCESSFUL', data: product };
};

const create = async (product) => {
  const id = await products.create(product);
  const newProduct = {
    id,
    name: product.name,
  };
  return { status: 'CREATED', data: newProduct };
};

const update = async (id, product) => {
  const updatedProduct = await products.update(id, product);
  const newProduct = {
    id: Number(id),
    name: product.name,
  };
  if (!updatedProduct) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: newProduct };
};

const remove = async (id) => {
  const deletedProduct = await products.remove(id);
  if (!deletedProduct) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: { message: 'Product deleted successfully' } };
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};

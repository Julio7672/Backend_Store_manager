const { sales } = require('../models');

const findAll = async () => {
  const Sales = await sales.findAll();
  return { status: 'SUCCESSFUL', data: Sales };
};

const findById = async (id) => {
  const sale = await sales.findById(id);
  if (sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const create = async (sale) => {
  const newSaleId = await sales.create();
  await Promise.all(await sale.map((product) => sales.insertSale(product, newSaleId)));
  return { status: 'CREATED', data: { id: newSaleId, itemsSold: sale } };
};

module.exports = {
  findAll,
  findById,
  create,
};

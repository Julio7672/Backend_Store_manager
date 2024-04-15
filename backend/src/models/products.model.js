const conn = require('./connection');

const findAll = async () => {
  const [products] = await conn.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};

const findById = async (id) => {
  const [[product]] = await conn.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const create = async (product) => {
  const { name } = product;
  const [{ insertId }] = await conn.execute('INSERT INTO products(name) VALUES(?)', [name]);
  return insertId;
};

const update = async (id, product) => {
  const { name } = product;
  const [{ affectedRows }] = await conn
    .execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return affectedRows;
};

const remove = async (id) => {
  const [{ affectedRows }] = await conn.execute('DELETE FROM products WHERE id = ?', [id]);
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};

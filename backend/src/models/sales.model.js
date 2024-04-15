const conn = require('./connection');

const findAll = async () => {
  const [sales] = await conn.execute(
    `SELECT
    sales_products.sale_id AS "saleId",
    sales.date,
    sales_products.product_id AS "productId",
    sales_products.quantity
    FROM sales
    INNER JOIN sales_products
    ON sales.id = sales_products.sale_id
    ORDER BY sales_products.sale_id ASC;`,
  );
  return sales;
};

const findById = async (id) => {
  const [sale] = await conn.execute(`SELECT
  sales.date,
  sales_products.product_id AS "productId",
  sales_products.quantity
  FROM sales
  INNER JOIN sales_products
  ON sales.id = sales_products.sale_id
  WHERE sales.id = ?
  ORDER BY sales_products.sale_id ASC;
  `, [id]);
  return sale;
};

const create = async () => {
  const [{ insertId }] = await conn.execute(`INSERT INTO 
  sales (date) 
  VALUES (CURRENT_TIMESTAMP())`);
  return insertId;
};

const insertSale = async (product, id) => {
  await conn.execute(`
  INSERT INTO sales_products(sale_id, product_id, quantity)
  VALUES (?, ?, ?)`, [id, product.productId, product.quantity]);
  return 'CREATED';
};

module.exports = {
  findAll,
  findById,
  insertSale,
  create,
};

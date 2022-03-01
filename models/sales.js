const BD = require('./connection');

const getAll = async () => {
  const [sales] = await BD.execute(`
    SELECT
      s.id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM StoreManager.sales AS s
    JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id`);
  return sales;
};

const getById = async (id) => {
  const [sale] = await BD.execute(`
  SELECT
    s.date,
    sp.product_id AS productId,
    sp.quantity AS quantity
  FROM StoreManager.sales AS s
  JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
  WHERE s.id = ?;`,
  [id]);
  return sale;
};

module.exports = {
  getAll,
  getById,
};
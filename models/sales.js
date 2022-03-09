const DB = require('./connection');

const getAll = async () => {
  const [sales] = await DB.execute(`
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
  const [sale] = await DB.execute(`
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

const update = async (id, productId, quantity) => {
  const query = `
    UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?;
  `;
  const [result] = await DB.execute(query, [productId, quantity, id]);

  if (result.affectedRows === 0) return undefined;

  return {
    saleId: id,
    itemUpdated: [{
      productId,
      quantity,
      },
    ],
  };
};

module.exports = {
  getAll,
  getById,
  update,
};
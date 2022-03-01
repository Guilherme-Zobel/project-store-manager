const BD = require('./connection');

const getAll = async () => {
  const [products] = await BD.execute(
    'SELECT  * FROM StoreManager.products;',
);
  return products;
};

const getById = async (id) => {
  const [product] = await BD.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return product;
};

module.exports = {
  getAll,
  getById,
};
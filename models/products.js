const DB = require('./connection');

const getAll = async () => {
  const [products] = await DB.execute(
    'SELECT  * FROM StoreManager.products;',
);
  return products;
};

const getById = async (id) => {
  const [product] = await DB.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return product;
};

const create = async ({ name, quantity }) => {
  const query = `
    INSERT INTO StoreManager.products
      (name, quantity)
    VALUES
      (?, ?);
  `;
  const [product] = await DB.execute(query, [name, quantity]);

  if (!product) {
    return false;
  }
  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const update = async (name, quantity, id) => {
  await DB.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );

  return { name, quantity, id };
}; 

const exclude = async (id) => {
  await DB.execute(
      'DELETE FROM StoreManager.products WHERE id = ?;', [id],
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
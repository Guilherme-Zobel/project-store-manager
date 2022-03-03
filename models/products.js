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

// const create = async ({ name, quantity }) => {
//   const query = `
//     INSERT INTO StoreManager.products
//       (name, quantity)
//     VALUES
//       (?, ?);
//   `;
//   const [product] = await DB.execute(query, [name, quantity]);
//   return {
//     id: product.insertId,
//     name,
//     quantity,
//   };
// };

module.exports = {
  getAll,
  getById,
  // create,
};
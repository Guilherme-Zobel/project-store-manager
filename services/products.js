const ModelProducts = require('../models/products');

const getAll = async () => {
  const products = await ModelProducts.getAll();
  return products;
};

const getById = async (id) => {
  const product = await ModelProducts.getById(id);
  if (!product.length) {
    return [{
      code: 404,
      err: 'Product not found',
    }];
  } return product;
};

const create = async ({ name, quantity }) => {
  const createProduct = await ModelProducts.create({ name, quantity });

  if (!createProduct) {
  return false;
}

  return createProduct;
};

const update = async (name, quantity, id) => {
  const result = await ModelProducts.update(name, quantity, id);

  return result;
}; 
module.exports = {
  getAll,
  getById,
  create,
  update,
};
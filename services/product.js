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

module.exports = {
  getAll,
  getById,
};
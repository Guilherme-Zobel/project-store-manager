const ModelSales = require('../models/sales');

const getAll = async () => {
  const sales = await ModelSales.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await ModelSales.getById(id);
  return sale;
};

const update = async (id, productId, quantity) => {
  const result = await ModelSales.update(id, productId, quantity);
  return result;
};

module.exports = {
  getAll,
  getById,
  update,
};
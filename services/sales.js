const ModelSales = require('../models/sales');

const getAll = async () => {
  const sales = await ModelSales.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await ModelSales.getById(id);
  return sale;
};

module.exports = {
  getAll,
  getById,
};
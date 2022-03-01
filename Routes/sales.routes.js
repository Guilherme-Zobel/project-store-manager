const express = require('express');
const controllersSales = require('../controllers/sales');

const sales = express.Router();

sales.get('/', controllersSales.getAll);

sales.get('/:id', controllersSales.getById);

module.exports = sales;
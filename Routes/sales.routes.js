const express = require('express');
const controllersSales = require('../controllers/sales');
const validate = require('../middlewares/validate');

const sales = express.Router();

sales.get('/', controllersSales.getAll);
sales.get('/:id', controllersSales.getById);

sales.post('/', validate.validationProductId, validate.valiadationQuantitySales);

sales.put('/:id', validate.validationProductId, validate.valiadationQuantitySales);

module.exports = sales;
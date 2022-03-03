const express = require('express');
const controllersProducts = require('../controllers/products');

const products = express.Router();

products.get('/', controllersProducts.getAll);

products.get('/:id', controllersProducts.getById);

module.exports = products;
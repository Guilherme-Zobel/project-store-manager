const ServiceProduct = require('../services/products');

const getAll = async (_req, res, next) => {
 try {
    const products = await ServiceProduct.getAll();

    return res.status(200).json(products);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [product] = await ServiceProduct.getById(id);
  
    if (product.code) {
      return res.status(product.code).json({ message: product.err });
    } 
    
    return res.status(200).json(product);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
};
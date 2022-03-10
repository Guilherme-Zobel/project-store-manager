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
      return res.status(product.code).json({
        message: product.err,
      });
    } 
    
    return res.status(200).json(product);
  } catch (e) {
    next(e);
  }
};

  const create = async (req, res, next) => {
    try {
      const { name, quantity } = req.body;
      const ListProducts = await ServiceProduct.getAll();
      // console.log(req.body);
      // console.log(ListProducts);
      console.log(ListProducts[0]);
      if (ListProducts.some((p) => p.name === name)) {
        return res.status(409).json({
          message: 'Product already exists',
        });
      }

      const createProduct = await ServiceProduct.create({ name, quantity });
      
      return res.status(201).json(createProduct);
    } catch (e) {
      next(e);
    }
  };

  const update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;
  
      const [product] = await ServiceProduct.getById(id);    
  
      if (product.code) {
        return res.status(product.code).json({
          message: product.err,
        });
      } 
  
      await ServiceProduct.update(name, quantity, id);    
  
      return res.status(200).json({ name, quantity, id });
    } catch (e) {
      next(e);
    }
  }; 

  const exclude = async (req, res, _next) => {
    const { id } = req.params;
    const excludeProduct = await ServiceProduct.exclude(id);
    if (!excludeProduct) return res.status(404).json({ message: 'Product not found' });
    return res.status(204).end();
  };
module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
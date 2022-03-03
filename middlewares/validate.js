const Joi = require('joi');

const validationName = (req, res, next) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({
        message: '"name" is required',
    }); 
}
    
    if (name.length < 5) {
      return res.status(422).json({
        message: '"name" length must be at least 5 characters long',
      });
    }
    
    next();
  } catch (e) {
    next(e);
  }
};

const validationProductId = (req, res, next) => {
  try {
    const productId = Joi.number().required();
    if (req.body.find((obj) => productId.validate(obj.productId).error)) {
      return res.status(400).json({
        message: '"productId" is required',
      });
    }
    return next();
  } catch (e) {
    next(e);
  }
};

const validationQuantityProduct = (req, res, next) => {
  try {
    const { quantity } = req.body;
  
    const quantityNumber = Joi.number().integer().required();
    const quantityMin = Joi.number().min(1).required(); 
    
    if (quantityNumber.validate(quantity).error) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    
    if (quantityMin.validate(quantity).error) {
      return res.status(422).json({
        message: '"quantity" must be greater than or equal to 1',
      });
    }
    
    return next();
  } catch (e) {
    next(e);
  }
};
const valiadationQuantitySales = (req, res, next) => {
  try {
    const quantityNumber = Joi.number().integer().required();
    const quantityMin = Joi.number().min(1).required(); 
    
    if (req.body.find((obj) => quantityNumber.validate(obj.quantity).error)) {
      return res.status(400).json({
        message: '"quantity" is required',
    });
    }
    
    if (req.body.find((obj) => quantityMin.validate(obj.quantity).error)) {
      return res.status(422).json({
        message: '"quantity" must be greater than or equal to 1',
      });
    }
    
    return next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  validationName,
  validationProductId,
  validationQuantityProduct,
  valiadationQuantitySales,
}; 
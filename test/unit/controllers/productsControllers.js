const { expect } = require('chai');
const  sinon = require('sinon');

const ProductsController = require('../../../controllers/products');
const products = require('../../../Routes/products.routes');
const ProductsService = require('../../../services/products');

describe('Controller - Usando a função getAll', () => {
  describe('Quando é retornada com sucesso', () => {
    const request = {}
    const response = {}
    let next = {}

    const mockResult = {
      id: 1,
      name: 'capa do Batman',
      quantity: 10
    };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'getAll').resolves(mockResult)
    });
  
    after(() => {
      ProductsService.getAll.restore();
    })

    it('retorna status 200', async () => {
      await ProductsController.getAll(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true)
    })
    it('json é retornado com iformações', async () => {
      await ProductsController.getAll(request, response, next);
      
      expect(response.json.calledWith(mockResult)).to.be.deep.equal(true)
    });
  });
});

describe('Controller - Usando a função getById', () => {  
  describe('ID localizado com sucesso', () => {
    const request = {}
    const response = {}
    let next = {}

    const mockResult = {
      code: 200,
      id: 1,
      name: 'capa do Batman',
      quantity: 10
    };

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'getById').resolves(mockResult);
    });
    
    after(() => {
      ProductsService.getById.restore();
    });

    it('retorna status 200', async () => {
      await ProductsController.getById(request, response, next);
      expect(response.status.calledWith(200)).to.be.false;
    });
  })
})

describe('Controller - Usando a função create', () => {  
  describe('Produto criado com sucesso', () => {
    const request = {}
    const response = {}
    let next = {}

    const newProduct = {
      name: 'capa do Batman',
      quantity: 10
    };

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'create').resolves(newProduct);
    });
    
    after(() => {
      ProductsService.create.restore();
    });

    it('retorna objeto adicionado', async () => {
      await ProductsController.create(request, response, next);
      expect(response.json.calledWith(newProduct)).to.be.equal(false);
    });

    it('retorna status 201', async () => {
      await ProductsController.create(request, response, next);
      expect(response.status.calledWith(201)).to.be.false;
    });
  })
  describe('Produto não criado com sucesso', () => {
    const request = {}
    const response = {}
    let next = {}

    const newProduct = {
      name: 'capa do Batman',
      quantity: 10
    };

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'create').resolves(newProduct);
    });
    
    after(() => {
      ProductsService.create.restore();
    });

    it('retorna status 409', async () => {
      await ProductsController.create(request, response, next);
      expect(response.json.calledWith(409)).to.be.equal(false);
    });

    it('retorna status com erro', async () => {
      await ProductsController.create(request, response, next);
      expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(false);
    });
  })
})


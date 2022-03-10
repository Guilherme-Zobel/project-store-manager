const { expect } = require('chai');
const  sinon = require('sinon');

const ProductsController = require('../../../controllers/products');
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
      id: 1,
      name: 'capa do Batman',
      quantity: 10
    };

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'getById').resolves([mockResult]);
    });
    
    after(() => {
      ProductsService.getById.restore();
    });

    it('retorna status 200', async () => {
      await ProductsController.getById(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
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
      request.body = newProduct;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(ProductsService, 'getAll').resolves([]);
      sinon.stub(ProductsService, 'create').resolves(newProduct);
    });
    
    after(() => {
      ProductsService.getAll.restore();
      ProductsService.create.restore();

    });

    it('retorna objeto adicionado', async () => {
      await ProductsController.create(request, response, next);
      expect(response.json.calledWith(newProduct)).to.be.equal(true);
    });

    it('retorna status 201', async () => {
      await ProductsController.create(request, response, next);
      expect(response.status.calledWith(201)).to.be.equal(true);
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
      request.body = newProduct;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();
      sinon.stub(ProductsService, 'getAll').resolves([newProduct]);
      sinon.stub(ProductsService, 'create').resolves(newProduct);
    });
    
    after(() => {
      ProductsService.create.restore();
    });

    it('retorna status 409', async () => {
      await ProductsController.create(request, response, next);
      expect(response.status.calledWith(409)).to.be.equal(true);
    });

    it('retorna status com erro', async () => {
      await ProductsController.create(request, response, next);
      expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
    });
  })
})


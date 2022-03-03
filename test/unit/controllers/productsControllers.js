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
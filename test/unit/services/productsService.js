const { expect } = require('chai');
const  sinon = require('sinon');

const ProductModel = require('../../../models/products');
const ProductService = require('../../../services/products');

describe('SERVICE - PRODUCTS TEST', () => {
  describe('Verificação quando o ID existe', () => {
    before(() => {
      sinon.stub(ProductModel, 'getAll').resolves({
        id: 1,
        name: 'Martelo de Thor',
        quantity:  10
      })
    });

    after(() => {
      ProductModel.getAll.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await ProductService.getAll();
      
      expect(response).to.be.an('object')
    })
    it('Verificação do objeto se existe as propriedades "id", "name", "quantity"', async () => {
      const response = await ProductService.getAll();
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    })
    it('verifica se o objeto não está vazio', async () => {
      const response = await ProductService.getAll();

      expect(response).to.be.not.empty;
    })
  })
})
describe('SERVICE - PRODUCTS ID TEST', () => {
  describe('Verificação do objeto na camada Service', () => {
    before(() => {
      sinon.stub(ProductModel, 'getById').resolves({
        id: 1,
        name: 'Martelo de Thor',
        quantity:  10
      })
    });

    after(() => {
      ProductModel.getById.restore();
    });
    
    it('Retorna um objeto', async () => {
      const response = await ProductService.getById();
      expect(response).to.be.an('array')
    })

    it('verifica se o objeto não está vazio', async () => {
      const response = await ProductService.getById(1);
      expect(response).to.be.not.empty;
    })
  })
  describe('Verificação do objeto na camada Service', () => {
    describe('verifica as propriedades', () => {
      const mockExecute = {
        id: 1,
        name: 'Martelo de Thor',
        quantity:  10
      }
      before(() => {
        sinon.stub(ProductService, 'getById').resolves(mockExecute);
      })
      after(() => {
        ProductService.getById.restore();
      })

      it('verifica se o objeto tem as propriedades "id", "name", "quantity"', async () => {
        const response = await ProductService.getById(1);
        expect(response).to.include.all.keys('id', 'name', 'quantity');
      });
      it('verifica se o retorna um objeto', async () => {
        const response = await ProductService.getById(1);
        expect(response).to.be.an('object');
      });
    })
  })
})
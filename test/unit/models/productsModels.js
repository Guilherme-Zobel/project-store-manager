const { expect } = require('chai');
const  sinon = require('sinon');

const DB = require('../../../models/connection');
const productModel = require('../../../models/products');

describe('MODEL - PRODUCTS TEST', () => {
  describe('Lista de Produtos do Banco de Dados', () => {
    describe('Retorna todos os produtos', () => {
      const productMock = [{
          id: 1,
          name: 'Martelo de Thor',
          quantity: 10
      }]
      before(() => {
        const mockExecute = [[{
          id: 1,
          name: 'Martelo de Thor',
          quantity: 10
        }]]
        sinon.stub(DB, 'execute').resolves(mockExecute)
      })
  
      after(() => {
        DB.execute.restore();
      })
  
      it('retorna um array de objetos', async () => {
        const list = await productModel.getAll();
  
        expect(list).to.be.an('array');
      })
      it('produto retornado com sucesso', async() => {
        const response = await productModel.getAll();
        expect (response).to.be.deep.equal(productMock)
        
      })
      it('retorna um array de objetos com informações', async () => {
        const response = await productModel.getAll();
        expect(response).to.be.an('array')
        expect(response).to.be.not.empty;
      })
      it('verifica se o objeto tem as propriedades "id", "name", "quantity', async() => {
        const response = await productModel.getAll();
        expect(response[0]).to.be.include.all.keys('id','name','quantity');
      });
    });
  
    describe('Quando não existe produtos cadastrados', () => {
      before(() => {
        const mockExecute = [[], []]
        sinon.stub(DB, 'execute').resolves(mockExecute);
      });
  
      after(() => {
        DB.execute.restore();
      });
  
      it('retorna um array vazio', async () => {
        const response = await productModel.getAll();
     
        expect(response).to.be.an('array');
        expect(response).to.be.empty;
      });
    });
  });
  
  describe('Retorna produto por ID no Banco de Dados', () => {
    describe('ID existente', () => {
      before(() => {
        const productMock = [{
          id: 1,
          name: 'Martelo de Thor',
          quantity: 10
      }];
  
      sinon.stub(DB, 'execute').resolves(productMock);
      });
  
      after(() => {
        DB.execute.restore();
      })
      it('verifica se o objeto tem as propriedades "id", "name", "quantity', async() => {
        const response = await productModel.getById(1);
        expect(response).to.be.include.all.keys('id','name','quantity');
      });
      it('Retorna um objeto', async () => {
        const response = await productModel.getById(1);
        expect(response).to.be.an('object');
      })
      it('Não retorna vazio', async () => {
        const response = await productModel.getById(1);
        expect(response).to.be.not.empty;
      })
    })
    describe('ID não existe', () => {
      const mockExecute = [[], []]
      before(() => {
        sinon.stub(DB, 'execute').resolves(mockExecute);
      });
  
      after(() => {
        DB.execute.restore();
      });
  
      it('retorna um array vazio', async () => {
        const ID = -1
        const response = await productModel.getById(ID);
        expect(response).to.be.an('array')
        expect(response).to.be.empty
      })
    })
  })
  describe('Criando produtos no Banco de Dados', () => {
  
  
    const mockProductData = {
      name: 'capa do Batman',
      quantity: 10,
    };
    
  
    describe('Adicionando um novo produto com sucesso', () => {
      const mockExecute = [{ insertId: 1}]
      before(() => {
        sinon.stub(DB, 'execute').resolves(mockExecute);
      })
      after(() => {
        DB.execute.restore();
      })
      it('Retorna um objeto com as propriedades "id", "name",e "quantity"', async () => {
        const response = await productModel.create(mockProductData.name, mockProductData.quantity);
  
        expect(response).to.be.include.all.keys('name','quantity');
      })
      it('retorna um objeto', async () => {
        const response = await productModel.create(mockProductData)
        
        expect(response).to.be.an('object')
      })
    })
  })
})

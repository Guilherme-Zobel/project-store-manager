const { expect } = require('chai');
const  sinon = require('sinon');
const DB = require('../../../models/connection');
const salesModel = require('../../../models/sales');


describe('MODEL - SERVICE TEST', () => {
  
  describe('Lista de Vendas do Banco de Dados', () => {
    describe('Retorna todas as vendas', () => {
      const mockResult = [
        {
          "sale_id": 1,
          "date": '2022-02-23 14:00:00',
          "product_id": 1,
          "quantity": 5
        },
        {
          "sale_id": 1,
          "date": '2022-02-23 14:00:00',
          "product_id": 2,
          "quantity": 10
        },
        {
          "sale_id": 2,
          "date": '2022-02-24 14:00:00',
          "product_id": 3,
          "quantity": 15
        }
      ];
      before(() => {
        const mockExecute = [[
          {
            sale_id: 1,
            date: '2022-02-23 14:00:00',
            product_id: 1,
            quantity: 5
          },
          {
            sale_id: 1,
            date: '2022-02-23 14:00:00',
            product_id: 2,
            quantity: 10
          },
          {
            sale_id: 2,
            date: '2022-02-24 14:00:00',
            product_id: 3,
            quantity: 15
          }
        ], []];
        sinon.stub(DB, 'execute').resolves(mockExecute)
      })
  
      after(() => {
        DB.execute.restore();
      })
  
      it('retorna um array de objetos', async () => {
        const list = await salesModel.getAll();
  
        expect(list).to.be.an('array');
      })
  
      it('Retorna um objeto com as propriedades  "sale_id", "date", "product_id" e "quantity"', async () => {
        const response = await salesModel.getAll();
        expect(response[0]).to.be.include.all.keys('sale_id','date','product_id', 'quantity');
      })
      it('o objeto é identico ao que deve ser o return', async () => {
        const result = await salesModel.getAll();
        expect(result).to.be.deep.equal(mockResult);
      });
    });
  
    describe('quando não há vendas no Banco de Dados', () => {
  
      before(() => {
        const executeMock = [[],[]];
  
        sinon.stub(DB, 'execute').resolves(executeMock);
      });
  
      after(() => {
        DB.execute.restore();
      });
  
      it('retorna um array vazio', async () => {
        const response = await salesModel.getAll();
        expect(response).to.be.an('array');
        expect(response).to.be.empty;
      });
    });
  });
  
  describe('Lista vendas por ID', () => {
    describe('ID inexistente', () => {
      const ID = -1;
  
      const returnMock = [
      {
        date: '2022-02-23 14:00:00',
        product_id: 1,
        quantity: 5
      },
      {
        date: '2022-02-23 14:00:00',
        product_id: 2,
        quantity: 10
      }
    ];
  
    before(() => {
      const mockExecute = [[
        {
          date: '2022-02-23 14:00:00',
          product_id: 1,
          quantity: 5
        },
        {
          date: '2022-02-23 14:00:00',
          product_id: 2,
          quantity: 10
        }], []];
  
      sinon.stub(DB, 'execute').resolves(mockExecute);
    });
  
    after(() => {
      DB.execute.restore();
    });
  
    it('retorna um array', async () => {
      const response = await salesModel.getById(ID);
      expect(response).to.be.an('array');
    });
  
    it('retorna os dados do objeto com sucesso', async () => {
      const response = await salesModel.getById(ID);
      expect(response).to.be.deep.equal(returnMock)
    })
  
    it('verfica se o objeto tem as propriedades "date", "product_id", "quantity"', async () => {
      const response = await salesModel.getById(ID);
      response.forEach((resp) => {
        expect(resp).to.have.property('date');
        expect(resp).to.have.property('product_id');
        expect(resp).to.have.property('quantity');
      });
    })
    })
  })
})  

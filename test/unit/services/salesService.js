const { expect } = require('chai');
const  sinon = require('sinon');

const SalesModel = require('../../../models/sales');
const SalesService = require('../../../services/sales');

describe('SERVICE - PRODUCTS TEST', () => {
  describe('Lista de vendas', () => {
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
          date: "2022-02-24T19:09:06.000Z",
          product_id: 3,
          quantity: 15
        }], []];
      sinon.stub(SalesModel, 'getAll').resolves(mockExecute)
    })
  after(() => {
    SalesModel.getAll.restore();
  });

  it('retorna um array com todas vendas', async () => {
    const response = await SalesService.getAll();
    
    expect(response).to.be.an('array');
  })
  it('o objeto não pode estar vazio', async () => {
    const response = await SalesService.getAll();

    expect(response).to.be.not.empty;
  });

  it('verifica se o objeto tem as propriedades "sale_id", "date", "product_id", "quantity"', async () => {
    const response = await SalesService.getAll();

    expect(response[0][0]).to.include.all.keys('sale_id', 'date', 'product_id', 'quantity');
    expect(response[0][1]).to.include.all.keys('sale_id', 'date', 'product_id', 'quantity');
    expect(response[0][2]).to.include.all.keys('sale_id', 'date', 'product_id', 'quantity');
  });
  })

describe('Lista de vendas por ID', () => {
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
      date: "2022-02-24T19:09:06.000Z",
      product_id: 3,
      quantity: 15
    }], []];

    before(() => {
      sinon.stub(SalesModel, 'getById').resolves(mockExecute)
    });
  
    after(() => {
      SalesModel.getById.restore()
    })

    it('retorna um array', async () => {
      const response = await SalesService.getById(1);
      expect(response).to.be.an('array');
    });
    it('retorna as propriedaes "date", "sale_id,"product_id","quantity"', async () => {
      const response = await SalesService.getById(1);
      expect(response[0][0]).to.be.include.all.keys('date','sale_id','product_id','quantity');
      expect(response[0][1]).to.be.include.all.keys('date','sale_id','product_id','quantity');
      expect(response[0][2]).to.be.include.all.keys('date','sale_id','product_id','quantity');
    }); 
  })
});
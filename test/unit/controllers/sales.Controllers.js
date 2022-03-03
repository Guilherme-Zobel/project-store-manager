const { expect } = require('chai');
const  sinon = require('sinon');

const SalesController = require('../../../controllers/sales');
const SalesService = require('../../../services/sales');

describe('Sales Controller - Usando a função getAll', () => {
  describe('quando é chamado com sucesso', () => {

    const request = {};
    const response = {};
    let next = {}

    const resultMock = [{
      id: 1,
      date: '2022-02-23 14:00:00',
    }]

    before(() => {
      
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub().returns();

      sinon.stub(SalesService, 'getAll').resolves(resultMock);
    });

    after(() => {
      SalesService.getAll.restore();
    })

    it('status 200', async () => {
      await SalesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    describe('getById no salesController', () => {
      describe('quando o id é encontrado com sucesso', () => {
    
        const request = {};
        const response = {};
    
        const serviceMock = [
          {
            date: "2021-09-09 14:00:00",
            productId: 1,
            quantity: 2
          },
          {
            date: "2021-09-09 14:00:00",
            productId: 2,
            quantity: 2
          }
        ];
    
        before(() => {
          request.params = { id: 1 };
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();
    
          sinon.stub(SalesService, 'getById').resolves(serviceMock);
        });
    
        after(() => {
          SalesService.getById.restore();
        });
    
        it('é chamado com status 200', async () => {
          await SalesController.getById(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });
    
        it('é chamado json com os dados corretos', async () => {
          await SalesController.getById(request,response);
          expect(response.json.calledWith(serviceMock)).to.be.equal(true);
        });
      });
  })
})
});

const { expect } = require('chai');
const sinon = require('sinon');
const { salesList, salesId } = require('../mocks/sales.mock');
const { salesService } = require('../../src/services');
const { sales } = require('../../src/models');

describe('Realizando testes no Service', function () { 
  it('Buscando sales', async function () {
    sinon.stub(sales, 'findAll').resolves(salesList);

    const sale = await salesService.findAll();
    expect(sale.status).to.deep.equal('SUCCESSFUL');
    expect(sale.data).to.deep.equal(salesList);
  });

  it('Buscando sale pelo Id', async function () {
    sinon.stub(sales, 'findById').resolves(salesId);

    const id = {
      id: 1,
    };

    const response = await salesService.findById(id);
    expect(response).to.be.an('object');
    expect(response.data).to.deep.equal(salesId);
  });

  it('sale nao encontrada', async function () {
    sinon.stub(sales, 'findById').resolves([]);

    const response = await salesService.findById({ id: 45 });
    expect(response).to.be.an('object');
    expect(response.status).to.deep.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Sale not found' });
  });

  it('nova sale', async function () {
    sinon.stub(sales, 'create').resolves(1);
    sinon.stub(sales, 'insertSale').resolves(1);

    const Sale = [
      {
        productId: 1,
        quantity: 2,
      },
    ];

    const response = await salesService.create(Sale);
    expect(response).to.be.an('object');
    expect(response.status).to.deep.equal('CREATED');
    expect(response.data).to.deep.equal({ id: 1, itemsSold: Sale });
  });
  afterEach(function () {
    sinon.restore();
  });
});

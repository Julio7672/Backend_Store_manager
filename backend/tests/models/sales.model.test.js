const { expect } = require('chai');
const sinon = require('sinon');
const conn = require('../../src/models/connection');
const { salesList, salesId } = require('../mocks/sales.mock');
const { sales } = require('../../src/models');

describe('Testando camada Model', function () { 
  it('buscando sales', async function () {
    sinon.stub(conn, 'execute').resolves([salesList]);

    const sale = await sales.findAll();
    expect(sale).to.be.an('array');
  });

  it('buscando sale pelo Id', async function () {
    sinon.stub(conn, 'execute').resolves([salesId]);

    const id = {
      id: 1,
    };
    const response = await sales.findById(id);
    expect(response).to.be.an('array');
    expect(response).to.have.length(2);
  });

  it('nova sale Id', async function () {
    sinon.stub(conn, 'execute').resolves([{ insertId: 1 }]);

    const response = await sales.create();
    expect(response).to.be.an('number');
    expect(response).to.be.equal(1);
  });
  it('Criando nova sale', async function () {
    const newSale = { productId: 1, quantity: 10 };
    sinon.stub(conn, 'execute').resolves([{ insertId: 1 }]);

    const response = await sales.insertSale(1, newSale);
    expect(response).to.be.equal('CREATED');
  });
  afterEach(function () {
    sinon.restore();
  });
});

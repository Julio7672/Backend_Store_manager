const { expect } = require('chai');
const sinon = require('sinon');
const { describe } = require('mocha');
const conn = require('../../src/models/connection');
const { products } = require('../../src/models');
const { productsList } = require('../mocks/products.mock');

describe('Testando camada Model', function () {
  it('Testando função findAll', async function () {
    sinon.stub(conn, 'execute').resolves([productsList]);
    const result = await products.findAll();
    expect(result).to.deep.equal(productsList); 
    expect(result).to.be.an('array');
  });

  it('Testando função findById', async function () {
    sinon.stub(conn, 'execute').resolves([[productsList[0]]]);
    const result = await products.findById(1);
    expect(result).to.equal(productsList[0]);
    expect(result).to.be.an('object'); 
  });
  it('Testando função create', async function () {
    const newProduct = { name: 'Product', quantity: 1 };
    sinon.stub(conn, 'execute').resolves([{ insertId: 1 }]);
    const result = await products.create(newProduct);
    expect(result).to.be.an('number');
  });
  afterEach(function () {
    sinon.restore();
  });
});

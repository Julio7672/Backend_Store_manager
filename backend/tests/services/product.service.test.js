const { expect } = require('chai');
const sinon = require('sinon');
const { products } = require('../../src/models');
const { productsList, productId } = require('../mocks/products.mock');
const { productService } = require('../../src/services');

describe('testando camdada service', function () {
  it('Recuperando todos os produtos', async function () {
    sinon.stub(products, 'findAll').resolves(productsList);

    const Products = await productService.findAll();
    expect(Products.status).to.deep.equal('SUCCESSFUL');
    expect(Products.data).to.deep.equal(productsList);
  });

  it('busca produto por Id', async function () {
    sinon.stub(products, 'findById').resolves(productId);

    const id = {
      id: 1,
    };

    const response = await productService.findById(id);
    expect(response).to.be.an('object');
    expect(response.status).to.deep.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal(productId);
  });

  it('produto nao encontrado', async function () {
    sinon.stub(products, 'findById').resolves();

    const response = await productService.findById({ id: 45 });
    expect(response).to.be.an('object');
    expect(response.status).to.deep.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Product not found' });
  });

  it('novo produto', async function () {
    sinon.stub(products, 'create').resolves(1);

    const Product = { name: 'Product' };

    const response = await productService.create(Product);
    expect(response).to.be.an('object');
    expect(response.status).to.deep.equal('CREATED');
    expect(response.data).to.deep.equal({ id: 1, ...Product });
  });

  it('Atualiza produto', async function () {
    sinon.stub(products, 'update').resolves(1);

    const product = { name: 'Product' };

    const response = await productService.update(1, product);
    expect(response).to.be.an('object');
    expect(response.data).to.deep.equal({ id: 1, ...product });
  });

  afterEach(function () {
    sinon.restore();
  });
});

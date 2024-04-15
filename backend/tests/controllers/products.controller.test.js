const chai = require('chai');
const sinon = require('sinon');
const chaiSinon = require('sinon-chai');
const { productsList } = require('../mocks/products.mock');
const { productService } = require('../../src/services');
const { productsController } = require('../../src/controllers');

const { expect } = chai;

chai.use(chaiSinon);

describe('Testando camada Controller', function () {
  it('Testando função findAll', async function () {
    sinon.stub(productService, 'findAll').resolves({ status: 'SUCCESSFUL', data: productsList });
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await productsController.findAll(null, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsList);
  });
  it('Testando função findById', async function () {
    const product = productsList[0];
    sinon.stub(productService, 'findById').resolves({ status: 'SUCCESSFUL', data: product });
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const req = { params: { id: 1 } };

    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product);
  });
  it('Testando função create', async function () {
    const Product = { name: 'Product', quantity: 1 };
    sinon.stub(productService, 'create').resolves({ status: 'CREATED', data: { id: 1, ...Product } });
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const req = { body: Product };

    await productsController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 1, ...Product });
  });
  it('Testando função update', async function () {
    const updatedProduct = { name: 'Produto Teste' };
    sinon.stub(productService, 'update').resolves({ status: 'SUCCESSFUL', data: { id: 1, ...updatedProduct } });
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const req = { params: { id: 1 }, body: updatedProduct };

    await productsController.update(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, ...updatedProduct });
  });
  it('Testando função remove', async function () {
    sinon.stub(productService, 'remove').resolves({ status: 'SUCCESSFUL' });
    const res = { status: sinon.stub().returnsThis(), end: sinon.stub() };
    const req = { params: { id: 1 } };

    await productsController.remove(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });
});

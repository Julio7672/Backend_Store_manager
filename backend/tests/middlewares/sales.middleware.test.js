const { expect } = require('chai');
const sinon = require('sinon');
const salesMiddleware = require('../../src/middlewares/sales.middleware');
const { products } = require('../../src/models');

describe('testeando no Middlewares', function () {
  it('produto existe', async function () {
    const req = {
      body: [
        {
          productId: 1,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 3,
        },
      ],
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    sinon.stub(products, 'findById').resolves([1, 2]);

    const next = sinon.spy();
    await salesMiddleware.productExist(req, res, next);
    expect(next.called).to.be.equal(true);
  });

  it('produto não existe', async function () {
    const req = {
      body: [
        {
          productId: 1,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 3,
        },
      ],
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    sinon.stub(products, 'findById').resolves(undefined);

    const next = sinon.spy();
    await salesMiddleware.productExist(req, res, next);
    expect(next.called).to.be.equal(false);
  });

  it('Validando corpo da requisição está vazio', async function () {
    const req = {
      body: [{
        productId: 3,
      }],
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    const next = sinon.spy();
    await salesMiddleware.emptyField(req, res, next);
    expect(next.called).to.be.equal(false);
  });

  it('requisição not null', async function () {
    const req = {
      body: [
        {
          productId: 3,
          quantity: 3,
        },
      ],
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    const next = sinon.spy();
    await salesMiddleware.emptyField(req, res, next);
    expect(next.called).to.be.equal(true);
  });

  it('Validando entrada', async function () {
    const req = {
      body: [
        {
          productId: 3,
          quantity: 3,
        },
      ],
    };

    const next = sinon.spy();
    await salesMiddleware.inputValidate(req, {}, next);
    expect(next.called).to.be.equal(true);
  });
  afterEach(function () {
    sinon.restore();
  });
});

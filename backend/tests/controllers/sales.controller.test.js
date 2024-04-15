const chai = require('chai');
const sinon = require('sinon');
const chaiSinon = require('sinon-chai');
const { salesList, salesId } = require('../mocks/sales.mock');
const { salesService } = require('../../src/services');
const { salesController } = require('../../src/controllers');

const { expect } = chai;

chai.use(chaiSinon);

describe('Testando camada Controller', function () {
  it('Testando função findAll', async function () {
    sinon.stub(salesService, 'findAll').resolves({ status: 'SUCCESSFUL', data: salesList });
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.findAll(null, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesList);
  });
  it('Testando função findById', async function () {
    const Sale = salesId[0];
    sinon.stub(salesService, 'findById').resolves({ status: 'SUCCESSFUL', data: Sale });
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const req = { params: { id: 1 } };

    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(Sale);
  });
  it('Testando função create', async function () {
    const Sale = { productId: 1, quantity: 10 };
    sinon.stub(salesService, 'create').resolves({ status: 'CREATED', data: { id: 1, ...Sale } });
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const req = { body: Sale };

    await salesController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 1, ...Sale });
  });
  afterEach(function () {
    sinon.restore();
  });
});

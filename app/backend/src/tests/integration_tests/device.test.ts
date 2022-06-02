import * as chai from 'chai';
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../../app';
import DeviceModel from '../../database/models/device';
import {
  mockedAllDevices,
  mockedCreatedDevice,
  mockedNewDeviceControllerResponse,
  error_missing_field,
  error_typeof_field,
  mockedAllTagsExist,
} from '../_mocks_/integration_mocks/devicesMocks';
import TagModel from '../../database/models/tags';

chai.use(chaiHttp);

const { expect } = chai;

const errorObj = { error: 'Internal server error' };

describe('I&T Device Tests', () => {
  let chaiHttpResponse: Response;

  describe('Testing Route "/devices" to GET ALL DEVICES', () => {
    afterEach(() => {
      (DeviceModel.findAll as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 200 and all devices', async () => {
      sinon.stub(DeviceModel, 'findAll').resolves(mockedAllDevices as unknown as DeviceModel[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/devices');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedAllDevices);
    });

    it('Unexpected Error Case - Returns status 500 and an error message', async () => {
      sinon.stub(DeviceModel, 'findAll').throws(errorObj);

      chaiHttpResponse = await chai
        .request(app)
        .get('/devices');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.error).to.be.equal('Internal server error');
    });
  });

  describe('Testing Route "/devices/:id" to GET DEVICE BY ID', () => {
    afterEach(() => {
      (DeviceModel.findByPk as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 200 and founded device', async () => {
      sinon.stub(DeviceModel, 'findByPk').resolves(mockedAllDevices[0] as unknown as DeviceModel);

      chaiHttpResponse = await chai
        .request(app)
        .get('/devices/:id');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedAllDevices[0]);
    });

    it('Unexpected Error Case - Returns status 500 and an error message', async () => {
      sinon.stub(DeviceModel, 'findByPk').throws(errorObj);

      chaiHttpResponse = await chai
        .request(app)
        .get('/devices/:id');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.error).to.be.equal('Internal server error');
    });
  });

  describe('Testing Route POST "/devices/:id" to CREATE NEW DEVICE', () => {
    before(() => {
      sinon.stub(Promise, 'all').resolves(mockedAllTagsExist);
    });

    after(() => {
      (Promise.all as sinon.SinonStub).restore();
    });

    afterEach(() => {
      (DeviceModel.create as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 201 and created device Id', async () => {
      sinon.stub(DeviceModel, 'create').resolves(mockedCreatedDevice as unknown as DeviceModel);

      chaiHttpResponse = await chai
        .request(app)
        .post('/devices')
        .send({ version: "35001", tags: "1;2;3" });

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedNewDeviceControllerResponse);
    });

    it('Expected Error Case - Returns 422 if body missing "version" field', async () => {
      sinon.stub(DeviceModel, 'create').resolves(mockedCreatedDevice as unknown as DeviceModel);

      chaiHttpResponse = await chai
        .request(app)
        .post('/devices')
        .send({ tags: "1;2;3" });

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_missing_field);
    });

    it('Expected Error Case - Returns 422 if body missing "tags" field', async () => {
      sinon.stub(DeviceModel, 'create').resolves(mockedCreatedDevice as unknown as DeviceModel);

      chaiHttpResponse = await chai
        .request(app)
        .post('/devices')
        .send({ version: "35001" });

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_missing_field);
    });

    it('Expected Error Case - Returns 422 if value of field "vresion" is not a string', async () => {
      sinon.stub(DeviceModel, 'create').resolves(mockedCreatedDevice as unknown as DeviceModel);

      chaiHttpResponse = await chai
        .request(app)
        .post('/devices')
        .send({ version: 35001, tags: "1;2;3" });

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_typeof_field);
    });

    it('Expected Error Case - Returns 422 if value of field "tags" is not a string', async () => {
      sinon.stub(DeviceModel, 'create').resolves(mockedCreatedDevice as unknown as DeviceModel);

      chaiHttpResponse = await chai
        .request(app)
        .post('/devices')
        .send({ version: "35001", tags: 1 });

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_typeof_field);
    });

    it('Unexpected Error Case - Returns status 500 and an error message', async () => {
      sinon.stub(DeviceModel, 'create').throws(errorObj);

      chaiHttpResponse = await chai
        .request(app)
        .post('/devices')
        .send({ version: "35001", tags: "1;2" });

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.error).to.be.equal('Internal server error');
    });
  });
})
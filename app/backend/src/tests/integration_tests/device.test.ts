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
  error_some_tag_not_found,
  error_on_field_new_data,
  error_tags_malformed,
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

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_missing_field);
    });

    it('Expected Error Case - Returns 422 if body missing "tags" field', async () => {
      sinon.stub(DeviceModel, 'create').resolves(mockedCreatedDevice as unknown as DeviceModel);

      chaiHttpResponse = await chai
        .request(app)
        .post('/devices')
        .send({ version: "35001" });

      expect(chaiHttpResponse.status).to.be.equal(400);
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

  describe('Testing Route PATCH "/devices/:id" to EDIT DEVICE', () => {
    after(() => {
      (DeviceModel.update as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 204 and no content', async () => {
      sinon.stub(Promise, 'all').resolves(mockedAllTagsExist);
      sinon.stub(DeviceModel, 'update').resolves();

      chaiHttpResponse = await chai
        .request(app)
        .patch('/devices/:id')
        .send({ version: "35001" });

      expect(chaiHttpResponse.status).to.be.equal(204);
      expect(chaiHttpResponse.body).to.be.empty;

      (Promise.all as sinon.SinonStub).restore();
    });

    it('Expected Error Case - Returns status 400 if field "tags" is empty', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/devices/:id')
        .send({ tags: "" });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_on_field_new_data);
    });

    it('Expected Error Case - Returns status 400 if field "version" is empty', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/devices/:id')
        .send({ version: "" });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_on_field_new_data);
    });

    it('Expected Error Case - Returns status 400 if field is not called "tags"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/devices/:id')
        .send({ tag: "1;2" });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_on_field_new_data);
    });

    it('Expected Error Case - Returns status 400 if field is not called "version"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/devices/:id')
        .send({ versi: "35001" });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_on_field_new_data);
    });

    it('Expected Error Case - Returns status 400 if "tags" value is not a string', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/devices/:id')
        .send({ tags: 1 });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_on_field_new_data);
    });

    it('Expected Error Case - Returns status 400 if "version" value is not a string', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/devices/:id')
        .send({ version: 1 });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_on_field_new_data);
    });

    it('Expected Error Case - Returns status 422 if "tags" value is malformed', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/devices/:id')
        .send({ tags: "1,2,3" });

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_tags_malformed);
    });

    it('Expected Error Case - Returns status 404 if some tag not exist', async () => {
      sinon.stub(Promise, 'all').resolves([null]);

      chaiHttpResponse = await chai
        .request(app)
        .patch('/devices/:id')
        .send({ tags: "1;2" });

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_some_tag_not_found);

      (Promise.all as sinon.SinonStub).restore();
    });

    it('Unexpected Error Case - Returns status 500 and an error message', async () => {
      (DeviceModel.update as sinon.SinonStub).restore();
      sinon.stub(Promise, 'all').resolves(mockedAllTagsExist);
      sinon.stub(DeviceModel, 'update').throws(errorObj);

      chaiHttpResponse = await chai
        .request(app)
        .patch('/devices/:id')
        .send({ version: "35001", tags: "1;2" });

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.error).to.be.equal('Internal server error');
    });
  });
})
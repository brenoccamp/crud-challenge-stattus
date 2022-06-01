import * as chai from 'chai';
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../../app';
import DeviceModel from '../../database/models/device';
import { mockedAllDevices } from '../_mocks_/integration_mocks/devicesMocks';

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
})
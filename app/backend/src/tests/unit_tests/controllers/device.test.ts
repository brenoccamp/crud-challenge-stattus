import * as sinon from 'sinon';
import * as chai from 'chai';
import DeviceController from '../../../api/controllers/DeviceController';
import DeviceService from '../../../api/services/DeviceService';
import {
  mockedAllDevices,
  mockedCreatedNewDeviceID,
  mockedNewDeviceData,
} from '../../_mocks_/unit_mocks/devicesMocks';

const deviceService = new DeviceService();
const deviceController = new DeviceController(deviceService);

const errorObj = { error: 'Internal server error' };
const notFoundError = { error: 'Device not found.' };
const errorCreatingNewDevice = { error: 'Sorry. Any given tag does not exist. Check it and try again.' };

describe('Device Controller Unit Tests', () => {
  let req = { body: {}, params: {} } as any;
  const res = { json: sinon.spy(), status: sinon.stub().returns({ json: sinon.spy() })} as any;
  const next = sinon.spy();

  describe('Testing handler getAllDevices', () => {
    afterEach(() => {
      (deviceService.getAllDevices as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 200 and all devices', async () => {
      sinon
        .stub(deviceService, 'getAllDevices')
        .resolves(mockedAllDevices);

      await deviceController.getAllDevices(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.status().json, mockedAllDevices);
    });

    it('Unexpected Error Case - Next function is called', async () => {
      sinon
        .stub(deviceService, 'getAllDevices')
        .throws(errorObj);
      
      await deviceController.getAllDevices(req, res, next);

      sinon.assert.calledWith(next);
    });
  });

  describe('Testing handler getDeviceById', () => {
    afterEach(() => {
      (deviceService.getDeviceById as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 200 and founded device', async () => {
      sinon
        .stub(deviceService, 'getDeviceById')
        .resolves(mockedAllDevices[0]);

      await deviceController.getDeviceById(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.status(200).json, mockedAllDevices[0]);
    });

    it('Expected Error Case - Return status 404 and not found message', async () => {
      sinon
        .stub(deviceService, 'getDeviceById')
        .resolves(null);

      await deviceController.getDeviceById(req, res, next);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.status().json, notFoundError);
    })

    it('Unexpected Error Case - Next function is called', async () => {
      sinon
        .stub(deviceService, 'getDeviceById')
        .throws(errorObj);
      
      await deviceController.getDeviceById(req, res, next);

      sinon.assert.calledWith(next);
    });
  });

  describe('Testing handler createNewDevice', () => {
    afterEach(() => {
      (deviceService.createNewDevice as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 201 and created device id', async () => {
      sinon
      .stub(deviceService, 'createNewDevice')
      .resolves(mockedCreatedNewDeviceID);

      await deviceController.createNewDevice(req, res, next);

      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.status().json, mockedCreatedNewDeviceID);
    });

    it('Expected Error Case - Returns status 404 and not found message', async () => {
      sinon
      .stub(deviceService, 'createNewDevice')
      .resolves(false);

      await deviceController.createNewDevice(req, res, next);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.status().json, errorCreatingNewDevice);
    });

    it('Unexpected Error Case - Next function is called', async () => {
      sinon
        .stub(deviceService, 'createNewDevice')
        .throws(errorObj);
      
      await deviceController.createNewDevice(req, res, next);

      sinon.assert.calledWith(next);
    });
  });
});
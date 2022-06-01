import * as sinon from 'sinon';
import * as chai from 'chai';
import DeviceModel from '../../../database/models/device';
import DeviceService from '../../../api/services/DeviceService';
import { mockedAllDevices } from '../../_mocks_/devicesMocks';

const { expect } = chai;

const deviceService = new DeviceService();

const deviceId = 1;

describe('Services Unit Tests', () => {
  describe('Testing service getAllDevices', () => {
    afterEach(() => {
      (DeviceModel.findAll as sinon.SinonStub).restore();
    });

    it('Returns an empty or filled devices array', async () => {
      sinon.stub(DeviceModel, 'findAll').resolves(mockedAllDevices as any);

      const devices = await deviceService.getAllDevices();

      expect(devices).to.be.equal(mockedAllDevices);
    });
  });

  describe('Testing service getDeviceById', () => {
    afterEach(() => {
      (DeviceModel.findByPk as sinon.SinonStub).restore();
    });

    it('Returns founded device', async () => {
      sinon.stub(DeviceModel, 'findByPk').resolves(mockedAllDevices[0] as any);

      const device = await deviceService.getDeviceById(deviceId);

      expect(device).to.be.equal(mockedAllDevices[0]);
    });
  });
});

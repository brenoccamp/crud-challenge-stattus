import * as sinon from 'sinon';
import * as chai from 'chai';
import DeviceModel from '../../../database/models/device';
import DeviceService from '../../../api/services/DeviceService';
import {
  mockedAllDevices,
  mockedCreatedNewDeviceID,
  mockedNewDeviceData,
  mockedCreatedNewDevice,
} from '../../_mocks_/unit_mocks/devicesMocks';
import { mockedAllTags } from '../../_mocks_/unit_mocks/tagsMocks';

const { expect } = chai;

const deviceService = new DeviceService();

const deviceId = 1;

describe('Device Service Unit Tests', () => {
  describe('Testing service getAllDevices', () => {
    afterEach(() => {
      (DeviceModel.findAll as sinon.SinonStub).restore();
    });

    it('Returns an empty or filled devices array', async () => {
      sinon.stub(DeviceModel, 'findAll').resolves(mockedAllDevices as any);

      const allDevices = await deviceService.getAllDevices();

      expect(allDevices).to.be.deep.equal(mockedAllDevices);
    });
  });

  describe('Testing service getDeviceById', () => {
    afterEach(() => {
      (DeviceModel.findByPk as sinon.SinonStub).restore();
    });

    it('Returns founded device', async () => {
      sinon.stub(DeviceModel, 'findByPk').resolves(mockedAllDevices[0] as unknown as DeviceModel);

      const device = await deviceService.getDeviceById(deviceId);

      expect(device).to.be.deep.equal(mockedAllDevices[0]);
    });
  });

  describe('Testing service createNewDevice', () => {
    afterEach(() => {
      (DeviceModel.create as sinon.SinonStub).restore();
    });

    it('Success Case - Returns created device ID', async () => {
      sinon
        .stub(Promise, 'all')
        .resolves([mockedAllTags[0]]);

      sinon
        .stub(DeviceModel, 'create')
        .resolves(mockedCreatedNewDevice as unknown as DeviceModel);

      const createdDevice = await deviceService.createNewDevice(mockedNewDeviceData);

      expect(createdDevice).to.be.deep.equal(mockedCreatedNewDeviceID);
    });
  });
});

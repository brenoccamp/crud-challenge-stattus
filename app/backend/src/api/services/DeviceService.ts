import { IDevice, IDeviceService } from '../../interfaces/deviceInterfaces';
import DeviceModel from '../../database/models/device';

export default class DeviceService implements IDeviceService {
  private _deviceModel;

  constructor() {
    this._deviceModel = DeviceModel;
  }

  public getAllDevices = async (): Promise<IDevice[]> => {
    const allDevices = await this._deviceModel.findAll();
    return allDevices;
  };

  public getDeviceById = async (id: number): Promise<IDevice | null> => {
    const device = await this._deviceModel.findByPk(id);
    return device;
  };
}

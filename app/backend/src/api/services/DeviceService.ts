import { IDevice, IDeviceService } from '../../interfaces/deviceInterfaces';
import DeviceModel from '../../database/models/device';
import TagModel from '../../database/models/tags';

export default class DeviceService implements IDeviceService {
  private _deviceModel;

  private _tagModel;

  constructor() {
    this._deviceModel = DeviceModel;
    this._tagModel = TagModel;
  }

  public getAllDevices = async (): Promise<IDevice[]> => {
    const allDevices = await this._deviceModel.findAll();
    return allDevices;
  };

  public getDeviceById = async (id: number): Promise<IDevice | null> => {
    const foundedDevice = await this._deviceModel.findByPk(id);
    return foundedDevice;
  };

  public createNewDevice = async (newDevice: IDevice):Promise<{ createdId: number; } | boolean> => {
    const { tags } = newDevice;

    const allTagsExists = await Promise.all(tags.split(';')
      .map((tagId) => this._tagModel.findByPk(tagId)))
      .then((resolvedPromises) => resolvedPromises
        .every((value) => value !== null));

    if (!allTagsExists) return allTagsExists;

    const createdDevice = await this._deviceModel.create({ ...newDevice });
    return { createdId: createdDevice.id };
  };
}

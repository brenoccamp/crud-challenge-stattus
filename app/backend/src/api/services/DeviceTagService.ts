import DeviceModel from '../../database/models/device';
import { IDeviceTag } from '../../interfaces/deviceTagInterfaces';
import TagModel from '../../database/models/tags';

export default class DeviceTagService {
  private _deviceModel;

  private _tagModel;

  constructor() {
    this._deviceModel = DeviceModel;
    this._tagModel = TagModel;
  }

  public getAllDevicesAndTags = async (): Promise<IDeviceTag[] | []> => {
    const allDevices = await this._deviceModel.findAll();
    const allTags = await this._tagModel.findAll();

    const allDevicesAndTags = allDevices.map((deviceObj) => {
      const deviceTags = allTags
        .filter((tagObj) => deviceObj.tags.includes(String(tagObj.id)))
        .map(({ id, name, color }) => ({ id, name, color }));

      const { id, version, createdAt, updatedAt } = deviceObj;

      const newDeviceObj = { id, version, tags: deviceTags, createdAt, updatedAt };

      return newDeviceObj;
    });

    return allDevicesAndTags;
  };
}

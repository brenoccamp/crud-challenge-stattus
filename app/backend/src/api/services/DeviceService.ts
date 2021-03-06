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

  private checkIfAllTagsExist = async (tagsString: string): Promise<boolean> => {
    const allTagsExists = await Promise.all(tagsString.split(';')
      .map((tagId) => this._tagModel.findByPk(tagId)))
      .then((resolvedPromises) => resolvedPromises
        .every((value) => value !== null));

    return allTagsExists;
  };

  public createNewDevice = async (newDevice: IDevice):Promise<{ createdId: number; } | boolean> => {
    const { tags } = newDevice;

    const allTagsExists = await this.checkIfAllTagsExist(tags);

    if (!allTagsExists) return allTagsExists;

    const createdDevice = await this._deviceModel.create({ ...newDevice });

    return { createdId: createdDevice.id };
  };

  public editDevice = async (id:number, newData:string, fieldToEdit:string):Promise<boolean> => {
    if (fieldToEdit === 'tags') {
      const allTagsExists = await this.checkIfAllTagsExist(newData);
      if (!allTagsExists) return false;
    }

    await this._deviceModel.update({ [fieldToEdit]: newData }, { where: { id } });
    return true;
  };

  public updateDevice = async (id: number, newData: IDevice): Promise<boolean | null> => {
    const foundedDevice = await this.getDeviceById(id);
    if (!foundedDevice) return null;

    const { version, tags } = newData;

    const allTagsExists = await this.checkIfAllTagsExist(tags);
    if (!allTagsExists) return false;

    await this._deviceModel.update({ version, tags }, { where: { id } });
    return true;
  };

  public deleteDevice = async (id: number): Promise<boolean> => {
    const foundedDevice = await this.getDeviceById(id);
    if (!foundedDevice) return false;

    await this._deviceModel.destroy({ where: { id } });

    return true;
  };
}

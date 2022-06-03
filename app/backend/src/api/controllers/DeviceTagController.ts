import { Request, Response, NextFunction } from 'express';
import { IDeviceTagController, IDeviceTagService } from '../../interfaces/deviceTagInterfaces';

export default class DeviceTagController implements IDeviceTagController {
  private _deviceTagService;

  constructor(deviceTagService: IDeviceTagService) {
    this._deviceTagService = deviceTagService;
  }

  public getAllDevicesAndTags = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const allDevicesAndTags = await this._deviceTagService.getAllDevicesAndTags();

      return res.status(200).json(allDevicesAndTags);
    } catch (error) {
      next(error);
    }
  };
}

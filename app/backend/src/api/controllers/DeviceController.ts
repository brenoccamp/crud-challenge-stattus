import { NextFunction, Request, Response } from 'express';
import {
  IDeviceController,
  IDeviceService,
} from '../../interfaces/deviceInterfaces';

export default class DeviceController implements IDeviceController {
  private _deviceService;

  constructor(deviceService: IDeviceService) {
    this._deviceService = deviceService;
  }

  public getAllDevices = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const devices = await this._deviceService.getAllDevices();

      return res.status(200).json(devices);
    } catch (error) {
      next(error);
    }
  };

  public getDeviceById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);

      const device = await this._deviceService.getDeviceById(id);

      if (!device) return res.status(404).json({ message: 'Device not found' });

      return res.status(200).json(device);
    } catch (error) {
      next(error);
    }
  };
}

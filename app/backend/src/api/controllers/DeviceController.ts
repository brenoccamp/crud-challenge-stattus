import { NextFunction, Request, Response } from 'express';
import {
  IDevice,
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

  public createNewDevice = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const newDeviceData: IDevice = req.body;

      const createdDevice = await this._deviceService.createNewDevice(newDeviceData);

      return res.status(201).json(createdDevice);
    } catch (error) {
      next(error);
    }
  };
}

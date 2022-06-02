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
      const allDevices = await this._deviceService.getAllDevices();

      return res.status(200).json(allDevices);
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
      const foundedDevice = await this._deviceService.getDeviceById(id);

      if (!foundedDevice) return res.status(404).json({ error: 'Device not found' });

      return res.status(200).json(foundedDevice);
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

      if (!createdDevice) {
        return res.status(404)
          .json({ error: 'Sorry. Any given tag does not exist. Check it and try again.' });
      }

      return res.status(201).json(createdDevice);
    } catch (error) {
      next(error);
    }
  };

  public editDevice = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);
      const [fieldToEdit, newData] = Object.entries(req.body)[0];

      const editedDevice = await this._deviceService
        .editDevice(id, newData as string, fieldToEdit);

      if (!editedDevice) {
        return res.status(404)
          .json({ error: 'Sorry. Any given tag does not exist. Check it and try again.' });
      }

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}

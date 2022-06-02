import { NextFunction, Request, Response } from 'express';
import {
  IDevice,
  IDeviceController,
  IDeviceService,
} from '../../interfaces/deviceInterfaces';

const ERROR_SOME_TAG_NOT_FOUND = {
  error: 'Sorry. Any given tag does not exist. Check it and try again.',
};
const ERROR_DEVICE_NOT_FOUND = { error: 'Device not found.' };
const NOT_FOUND_STATUS_CODE = 404;
const SUCCESS_STATUS_CODE = 200;
const NO_CONTENT_STATUS_CODE = 204;
const CREATED_STATUS_CODE = 201;

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

      return res.status(SUCCESS_STATUS_CODE).json(allDevices);
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

      if (!foundedDevice) return res.status(NOT_FOUND_STATUS_CODE).json(ERROR_DEVICE_NOT_FOUND);

      return res.status(SUCCESS_STATUS_CODE).json(foundedDevice);
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

      if (!createdDevice) return res.status(NOT_FOUND_STATUS_CODE).json(ERROR_SOME_TAG_NOT_FOUND);

      return res.status(CREATED_STATUS_CODE).json(createdDevice);
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

      if (!editedDevice) return res.status(NOT_FOUND_STATUS_CODE).json(ERROR_SOME_TAG_NOT_FOUND);

      return res.status(NO_CONTENT_STATUS_CODE).end();
    } catch (error) {
      next(error);
    }
  };

  public updateDevice = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);
      const newData: IDevice = req.body;

      const updatedDevice = await this._deviceService.updateDevice(id, newData);

      if (updatedDevice === null) return res.status(404).json(ERROR_DEVICE_NOT_FOUND);
      if (updatedDevice === false) return res.status(404).json(ERROR_SOME_TAG_NOT_FOUND);

      return res.status(NO_CONTENT_STATUS_CODE).end();
    } catch (error) {
      next(error);
    }
  };

  deleteDevice = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);

      const deletedDevice = await this._deviceService.deleteDevice(id);

      if (!deletedDevice) return res.status(NOT_FOUND_STATUS_CODE).json(ERROR_DEVICE_NOT_FOUND);

      return res.status(NO_CONTENT_STATUS_CODE).end();
    } catch (error) {
      next(error);
    }
  };
}

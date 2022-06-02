import { Request, Response, NextFunction } from 'express';

export interface IDevice {
  id?: number;
  version: string;
  tags: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDeviceController {
  getAllDevices(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getDeviceById(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  createNewDevice(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  editDevice(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  updateDevice(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  deleteDevice(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export interface IDeviceService {
  getAllDevices(): Promise<IDevice[]>;
  getDeviceById(id: number): Promise<IDevice | null>;
  createNewDevice(newDevice: IDevice): Promise<{ createdId: number } | boolean>;
  editDevice(id: number, newData: string, fieldToEdit: string): Promise<boolean>;
  updateDevice(id: number, newData: IDevice): Promise<boolean | null>;
  deleteDevice(id: number): Promise<boolean>;
}

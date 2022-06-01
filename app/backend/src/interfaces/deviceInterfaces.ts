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
}

export interface IDeviceService {
  getAllDevices(): Promise<IDevice[]>;
  getDeviceById(id: number): Promise<IDevice | null>;
}

import { Request, Response, NextFunction } from 'express';
import { ITag } from './tagInterfaces';

export interface IDeviceTag {
  id: number;
  version: string;
  tags: ITag[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IDeviceTagController {
  getAllDevicesAndTags(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export interface IDeviceTagService {
  getAllDevicesAndTags(): Promise<IDeviceTag[] | []>;
}

import { Request, Response, NextFunction } from 'express';
import { IDevice } from '../../interfaces/deviceInterfaces';

const ERROR_MISSING_FIELD = { error: 'New device must have filled keys: "version" and "tags"' };
const ERROR_TYPEOF_FIELD = { error: 'Fields "version" and "tags" must be a string' };
const UNPROCESSABLE_ENTITY_STATUS_HTTP = 422;

const deviceDataValidate = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const newDevice: IDevice = req.body;

    if (!newDevice.tags || !newDevice.version) {
      return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_MISSING_FIELD);
    }

    const { version, tags } = newDevice;

    if (typeof version !== 'string' || typeof tags !== 'string') {
      return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_TYPEOF_FIELD);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default deviceDataValidate;

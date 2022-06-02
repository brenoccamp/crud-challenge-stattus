import { Request, Response, NextFunction } from 'express';
import { IDevice } from '../../interfaces/deviceInterfaces';

const ERROR_MISSING_FIELD = { error: 'New device must have filled keys: "version" and "tags"' };
const ERROR_TYPEOF_FIELD = { error: 'Fields "version" and "tags" must be a string' };
const ERROR_TAGS_MALFORMED = {
  error: 'Field "tags" value must have followed format: "1;2;3". Number followed by a semicolon.',
};
const UNPROCESSABLE_ENTITY_STATUS_HTTP = 422;

const deviceDataValidate = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const newDevice: IDevice = req.body;

    if (!newDevice.tags || !newDevice.version) {
      return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_MISSING_FIELD);
    }

    const { version, tags } = newDevice;

    if (typeof version !== 'string' || typeof tags !== 'string') {
      return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_TYPEOF_FIELD);
    }

    const wrongTags = tags.split(';').some((tag) => tag.length !== 1);

    if (wrongTags) return res.status(422).json(ERROR_TAGS_MALFORMED);

    next();
  } catch (error) {
    next(error);
  }
};

export default deviceDataValidate;

import { Request, Response, NextFunction } from 'express';

const UNPROCESSABLE_ENTITY_STATUS_HTTP = 422;
const BAD_REQUEST_STATUS_HTTP = 400;
const ERROR_TAGS_MALFORMED = {
  error: 'Field "tags" value must have followed format: "1;2;3". Number followed by a semicolon.',
};
const ERROR_ON_FIELD_NEW_DATA = {
  error: 'Please inform ONE field to edit: "version" or "tags".And the value must be a string.',
};

const patchDeviceValidate = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const bodyDataArray = Object.entries(req.body)[0];

    if (!bodyDataArray || typeof bodyDataArray[1] !== 'string' || bodyDataArray[1].length === 0) {
      return res.status(BAD_REQUEST_STATUS_HTTP).json(ERROR_ON_FIELD_NEW_DATA);
    }

    if (bodyDataArray[0] === 'tags') {
      const wrongTags = bodyDataArray[1].split(';').some((tag: string) => tag.length !== 1);

      if (wrongTags) return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_TAGS_MALFORMED);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default patchDeviceValidate;

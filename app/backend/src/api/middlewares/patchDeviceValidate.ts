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
    const [fieldToEdit, newData] = Object.entries(req.body)[0] as string[];

    if ((fieldToEdit !== 'tags' && fieldToEdit !== 'version')
      || newData.length === 0
      || typeof newData !== 'string'
    ) {
      return res.status(BAD_REQUEST_STATUS_HTTP).json(ERROR_ON_FIELD_NEW_DATA);
    }

    if (fieldToEdit === 'tags') {
      const wrongTags = newData.split(';').some((tag: string) => tag.length !== 1);

      if (wrongTags) return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_TAGS_MALFORMED);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default patchDeviceValidate;

import { Request, Response, NextFunction } from 'express';

const UNPROCESSABLE_ENTITY_STATUS_HTTP = 422;
const BAD_REQUEST_STATUS_HTTP = 400;
const ERROR_ON_FIELD_NEW_DATA = {
  error: 'Please inform ONE field to edit: "name" or "color".And the value must be a string.',
};
const ERROR_MALFORMED_DATA = {
  error: 'Field "name" or "color" must be filled. The value must be a string.',
};

const patchTagValidate = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const [fieldToEdit, newData] = Object.entries(req.body)[0];

    if (!fieldToEdit || (fieldToEdit !== 'name' && fieldToEdit !== 'color')) {
      return res.status(BAD_REQUEST_STATUS_HTTP).json(ERROR_ON_FIELD_NEW_DATA);
    }

    if (!newData || typeof newData !== 'string') {
      return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_MALFORMED_DATA);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default patchTagValidate;

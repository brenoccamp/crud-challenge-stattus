import { Request, Response, NextFunction } from 'express';

const UNPROCESSABLE_ENTITY_STATUS_HTTP = 422;
const ERROR_MISSING_FIELD = { error: 'New tag must have filled keys: "name" and "color"' };
const ERROR_TYPEOF_FIELD = { error: 'Fields "name" and "color" must be a string' };

export const nameFieldValidate = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const { name } = req.body;

    if (!name) return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_MISSING_FIELD);

    if (typeof name !== 'string') {
      return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_TYPEOF_FIELD);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const colorFieldValidate = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const { color } = req.body;

    if (!color) return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_MISSING_FIELD);

    if (typeof color !== 'string') {
      return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_TYPEOF_FIELD);
    }

    next();
  } catch (error) {
    next(error);
  }
};

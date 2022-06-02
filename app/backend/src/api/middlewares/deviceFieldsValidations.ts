import { Request, Response, NextFunction } from 'express';

const UNPROCESSABLE_ENTITY_STATUS_HTTP = 422;
const ERROR_MISSING_FIELD = { error: 'New device must have filled keys: "version" and "tags"' };
const ERROR_TYPEOF_FIELD = { error: 'Fields "version" and "tags" must be a string' };
const ERROR_TAGS_MALFORMED = {
  error: 'Field "tags" value must have followed format: "1;2;3". Number followed by a semicolon.',
};

export const versionFieldValidate = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const { version } = req.body;

    if (!version) return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_MISSING_FIELD);

    if (typeof version !== 'string') {
      return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_TYPEOF_FIELD);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const tagsFieldValidate = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const { tags } = req.body;

    if (!tags) return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_MISSING_FIELD);
    if (typeof tags !== 'string') {
      return res.status(UNPROCESSABLE_ENTITY_STATUS_HTTP).json(ERROR_TYPEOF_FIELD);
    }

    const wrongTags = tags.split(';').some((tag) => tag.length !== 1);

    if (wrongTags) return res.status(422).json(ERROR_TAGS_MALFORMED);

    next();
  } catch (error) {
    next(error);
  }
};

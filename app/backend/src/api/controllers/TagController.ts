import { Request, Response, NextFunction } from 'express';
import { ITag, ITagController, ITagService } from '../../interfaces/tagInterfaces';

const ERROR_TAG_NOT_FOUND = { error: 'Tag not found' };

const NOT_FOUND_STATUS_CODE = 404;
const SUCCESS_STATUS_CODE = 200;
const NO_CONTENT_STATUS_CODE = 204;
const CREATED_STATUS_CODE = 201;

export default class TagController implements ITagController {
  private _tagService;

  constructor(tagService: ITagService) {
    this._tagService = tagService;
  }

  public getAllTags = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const allTags = await this._tagService.getAllTags();

      return res.status(SUCCESS_STATUS_CODE).json(allTags);
    } catch (error) {
      next(error);
    }
  };

  public getTagById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);
      const foundedTag = await this._tagService.getTagById(id);

      if (!foundedTag) return res.status(NOT_FOUND_STATUS_CODE).json(ERROR_TAG_NOT_FOUND);

      return res.status(SUCCESS_STATUS_CODE).json(foundedTag);
    } catch (error) {
      next(error);
    }
  };

  public createNewTag = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const newTagData: ITag = req.body;

      const createdTag = await this._tagService.createNewTag(newTagData);

      return res.status(CREATED_STATUS_CODE).json(createdTag);
    } catch (error) {
      next(error);
    }
  };

  public editTag = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);
      const [fieldToEdit, newData] = Object.entries(req.body)[0];

      const editedTag = await this._tagService.editTag(id, newData as string, fieldToEdit);
      if (!editedTag) return res.status(NOT_FOUND_STATUS_CODE).json(ERROR_TAG_NOT_FOUND);

      return res.status(NO_CONTENT_STATUS_CODE).end();
    } catch (error) {
      next(error);
    }
  };

  public updateTag = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);
      const newData: ITag = req.body;

      const updatedTag = await this._tagService.updateTag(id, newData);

      if (!updatedTag) return res.status(NOT_FOUND_STATUS_CODE).json(ERROR_TAG_NOT_FOUND);

      return res.status(NO_CONTENT_STATUS_CODE).end();
    } catch (error) {
      next(error);
    }
  };

  public deleteTag = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);

      const deletedTag = await this._tagService.deleteTag(id);

      if (!deletedTag) return res.status(NO_CONTENT_STATUS_CODE).json(ERROR_TAG_NOT_FOUND);

      return res.status(NO_CONTENT_STATUS_CODE).end();
    } catch (error) {
      next(error);
    }
  };
}

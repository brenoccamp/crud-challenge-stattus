import { Request, Response, NextFunction } from 'express';
import { ITag, ITagController, ITagService } from '../../interfaces/tagInterfaces';

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

      return res.status(200).json(allTags);
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

      if (!foundedTag) return res.status(404).json({ error: 'Tag not found' });

      return res.status(200).json(foundedTag);
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

      return res.status(201).json(createdTag);
    } catch (error) {
      next(error);
    }
  };
}

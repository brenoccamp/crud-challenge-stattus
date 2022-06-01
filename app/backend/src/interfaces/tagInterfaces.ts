import { Request, Response, NextFunction } from 'express';

export interface ITag {
  id?: number;
  name: string;
  color: string;
}

export interface ITagController {
  getAllTags(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getTagById(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  createNewTag(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export interface ITagService {
  getAllTags(): Promise<ITag[]>;
  getTagById(id: number): Promise<ITag | null>;
  createNewTag(newTag: ITag): Promise<{ createdId: number }>;
}

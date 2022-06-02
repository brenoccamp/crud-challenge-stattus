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
  editTag(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  updateTag(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  deleteTag(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export interface ITagService {
  getAllTags(): Promise<ITag[]>;
  getTagById(id: number): Promise<ITag | null>;
  createNewTag(newTag: ITag): Promise<{ createdId: number }>;
  editTag(id: number, newData: string, fieldToEdit: string): Promise<boolean>;
  updateTag(id: number, newData: ITag): Promise<boolean>;
  deleteTag(id: number): Promise<boolean>;
}

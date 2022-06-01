import { ITag, ITagService } from '../../interfaces/tagInterfaces';
import TagModel from '../../database/models/tags';

export default class TagService implements ITagService {
  private _tagModel;

  constructor() {
    this._tagModel = TagModel;
  }

  public getAllTags = async (): Promise<ITag[]> => {
    const allTags = await this._tagModel.findAll();
    return allTags;
  };

  public getTagById = async (id: number): Promise<ITag | null> => {
    const foundedTag = await this._tagModel.findByPk(id);
    return foundedTag;
  };

  public createNewTag = async (newTag: ITag): Promise<{ createdId: number; }> => {
    const createdTag = await this._tagModel.create({ ...newTag });

    return { createdId: createdTag.id };
  };
}

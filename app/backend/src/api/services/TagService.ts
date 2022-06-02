import { ITag, ITagService } from '../../interfaces/tagInterfaces';
import TagModel from '../../database/models/tags';

export default class TagService implements ITagService {
  private _tagModel;

  constructor() {
    this._tagModel = TagModel;
  }

  public getAllTags = async (): Promise<ITag[]> => {
    const allTags = await this._tagModel
      .findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
    return allTags;
  };

  public getTagById = async (id: number): Promise<ITag | null> => {
    const foundedTag = await this._tagModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return foundedTag;
  };

  public createNewTag = async (newTag: ITag): Promise<{ createdId: number; }> => {
    const createdTag = await this._tagModel.create({ ...newTag });

    return { createdId: createdTag.id };
  };

  public editTag = async (id: number, newData: string, fieldToEdit: string): Promise<boolean> => {
    const foundedTag = await this.getTagById(id);
    if (!foundedTag) return false;

    await this._tagModel.update({ [fieldToEdit]: newData }, { where: { id } });
    return true;
  };

  public updateTag = async (id: number, newData: ITag): Promise<boolean> => {
    const foundedTag = await this.getTagById(id);

    if (!foundedTag) return false;

    const { name, color } = newData;
    await this._tagModel.update({ name, color }, { where: { id } });

    return true;
  };

  public deleteTag = async (id: number): Promise<boolean> => {
    const foundedTag = await this.getTagById(id);

    if (!foundedTag) return false;

    await this._tagModel.destroy({ where: { id } });

    return true;
  };
}

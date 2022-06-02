import * as sinon from 'sinon';
import * as chai from 'chai';
import TagModel from '../../../database/models/tags';
import TagService from '../../../api/services/TagService';
import {
  mockedAllTags,
  mockedCreatedTag,
  mockedNewTagData,
  mockedCreatedNewTagID,
} from '../../_mocks_/unit_mocks/tagsMocks';

const { expect } = chai;

const tagService = new TagService();

const tagId = 1;

describe('Tag Service Unit Tests', () => {
  describe('Testing service getAllTags', () => {
    afterEach(() => {
      (TagModel.findAll as sinon.SinonStub).restore();
    });

    it('Returns an empty or filled tags array', async () => {
      sinon
        .stub(TagModel, 'findAll')
        .resolves(mockedAllTags as unknown as TagModel[]);

      const allTags = await tagService.getAllTags();

      expect(allTags).to.be.deep.equal(mockedAllTags);
    });
  });

  describe('Testing service getTagById', () => {
    afterEach(() => {
      (TagModel.findByPk as sinon.SinonStub).restore();
    });

    it('Returns founded tag', async () => {
      sinon
        .stub(TagModel, 'findByPk')
        .resolves(mockedAllTags[0] as unknown as TagModel);
      
      const foundedTag = await tagService.getTagById(tagId);

      expect(foundedTag).to.be.deep.equal(mockedAllTags[0])
    });
  });

  describe('Testing service createNewTag', () => {
    afterEach(() => {
      (TagModel.create as sinon.SinonStub).restore();
    });

    it('Returns created tag ID', async () => {
      sinon
        .stub(TagModel, 'create')
        .resolves(mockedCreatedTag as unknown as TagModel);

      const createdTag = await tagService.createNewTag(mockedNewTagData);

      expect(createdTag).to.be.deep.equal(mockedCreatedNewTagID);
    });
  });
});
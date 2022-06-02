import * as sinon from 'sinon';
import * as chai from 'chai';
import TagController from '../../../api/controllers/TagController';
import TagService from '../../../api/services/TagService';
import {
  mockedAllTags,
  mockedCreatedNewTagID,
} from '../../_mocks_/unit_mocks/tagsMocks';

const tagService = new TagService();
const tagController = new TagController(tagService);

const errorObj = { error: 'Internal server error' };
const notFoundError = { error: 'Tag not found' };

describe('Tag Controller Unit Tests', () => {
  const req = { body: {}, params: {} } as any;
  const res = { json: sinon.spy(), status: sinon.stub().returns({ json: sinon.spy() })} as any;
  const next = sinon.spy();

  describe('Testing handler getAllTags', () => {
    afterEach(() => {
      (tagService.getAllTags as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 200 and all tags', async () => {
      sinon.stub(tagService, 'getAllTags').resolves(mockedAllTags);

      await tagController.getAllTags(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.status(200).json, mockedAllTags);
    });

    it('Unexpected Error Case - Next function is called', async () => {
      sinon
        .stub(tagService, 'getAllTags')
        .throws(errorObj);
      
      await tagController.getAllTags(req, res, next);

      sinon.assert.calledWith(next);
    });
  });

  describe('Testing handler getTagById', () => {
    afterEach(() => {
      (tagService.getTagById as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 200 and founded tag', async () => {
      sinon.stub(tagService, 'getTagById').resolves(mockedAllTags[0]);

      await tagController.getTagById(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.status().json, mockedAllTags[0]);
    });

    it('Expected Error Case - Return status 404 and not found message', async () => {
      sinon
        .stub(tagService, 'getTagById')
        .resolves(null);

      await tagController.getTagById(req, res, next);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.status().json, notFoundError);
    });

    it('Unexpected Error Case - Next function is called', async () => {
      sinon
        .stub(tagService, 'getTagById')
        .throws(errorObj);
      
      await tagController.getTagById(req, res, next);

      sinon.assert.calledWith(next);
    });
  });

  describe('Testing handler createNewTag', () => {
    afterEach(() => {
      (tagService.createNewTag as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 201 and created tag id', async () => {
      sinon
      .stub(tagService, 'createNewTag')
      .resolves(mockedCreatedNewTagID);

      await tagController.createNewTag(req, res, next);

      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.status().json, mockedCreatedNewTagID);
    });

    it('Unexpected Error Case - Next function is called', async () => {
      sinon
        .stub(tagService, 'createNewTag')
        .throws(errorObj);
      
      await tagController.createNewTag(req, res, next);

      sinon.assert.calledWith(next);
    });
  });
});
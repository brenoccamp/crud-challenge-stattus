import * as chai from 'chai';
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../../app';
import TagModel from '../../database/models/tags';
import {
  mockedAllTags,
  mockedCreatedTag,
  mockedNewTagControllerResponse,
  error_missing_field,
  error_typeof_field,
} from '../_mocks_/integration_mocks/tagsMocks';

chai.use(chaiHttp);

const { expect } = chai;

const errorObj = { error: 'Internal server error'};

describe('I&T Tag Tests', () => {
  let chaiHttpResponse: Response;

  describe('Testing Route "/tags" to GET ALL TAGS', () => {
    afterEach(() => {
      (TagModel.findAll as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 200 and all tags', async () => {
      sinon.stub(TagModel, 'findAll').resolves(mockedAllTags as unknown as TagModel[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/tags');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(mockedAllTags);
    });

    it('Unexpected Error Case - Returns status 500 and an error message', async () => {
      sinon.stub(TagModel, 'findAll').throws(errorObj);

      chaiHttpResponse = await chai
        .request(app)
        .get('/tags');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.error).to.be.equal('Internal server error');
    });
  });

  describe('Testing Route "/tags/:id" to GET TAG BY ID', () => {
    afterEach(() => {
      (TagModel.findByPk as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 200 and founded tag', async () => {
      sinon.stub(TagModel, 'findByPk').resolves(mockedAllTags[0] as unknown as TagModel);

      chaiHttpResponse = await chai
        .request(app)
        .get('/tags/:id');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedAllTags[0]);
    });

    it('Unexpected Error Case - Returns status 500 and an error message', async () => {
      sinon.stub(TagModel, 'findByPk').throws(errorObj);

      chaiHttpResponse = await chai
        .request(app)
        .get('/tags/:id');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.error).to.be.equal('Internal server error');
    });
  });

  describe('Testing Route POST "/tags" to CREATE NEW TAG', () => {
    afterEach(() => {
      (TagModel.create as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 201 and created tag Id', async () => {
      sinon.stub(TagModel, 'create').resolves(mockedCreatedTag as unknown as TagModel);

      chaiHttpResponse = await chai
        .request(app)
        .post('/tags')
        .send({ name: "São Paulo", color: "#000" });

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedNewTagControllerResponse);
    });

    it('Expected Error Case - Returns 422 if body missing "name" field', async () => {
      sinon.stub(TagModel, 'create').resolves(mockedCreatedTag as unknown as TagModel);

      chaiHttpResponse = await chai
        .request(app)
        .post('/tags')
        .send({ color: '#000' });

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_missing_field);
    });

    it('Expected Error Case - Returns 422 if body missing "color" field', async () => {
      sinon.stub(TagModel, 'create').resolves(mockedCreatedTag as unknown as TagModel);

      chaiHttpResponse = await chai
      .request(app)
      .post('/tags')
      .send({ name: 'São Paulo' });

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_missing_field);
    });

    it('Expected Error Case - Returns 422 if value of field "name" is not a string', async () => {
      sinon.stub(TagModel, 'create').resolves(mockedCreatedTag as unknown as TagModel);

      chaiHttpResponse = await chai
      .request(app)
      .post('/tags')
      .send({ name: 1, color: "#000" });

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_typeof_field);
    });

    it('Expected Error Case - Returns 422 if value of field "color" is not a string', async () => {
      sinon.stub(TagModel, 'create').resolves(mockedCreatedTag as unknown as TagModel);

      chaiHttpResponse = await chai
      .request(app)
      .post('/tags')
      .send({ name: "São Paulo", color: 1 });

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal(error_typeof_field);
    });

    it('Unexpected Error Case - Returns status 500 and an error message', async () => {
      sinon.stub(TagModel, 'create').throws(errorObj);

      chaiHttpResponse = await chai
        .request(app)
        .post('/tags')
        .send({ name: 'São Paulo', color: '#000' });

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.error).to.be.equal('Internal server error');
    });
  });
});
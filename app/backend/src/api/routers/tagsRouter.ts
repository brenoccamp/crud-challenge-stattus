import { Router } from 'express';
import TagController from '../controllers/TagController';
import TagService from '../services/TagService';
import { nameFieldValidate, colorFieldValidate } from '../middlewares/tagFieldsValidations';
import patchTagValidate from '../middlewares/patchTagValidate';

const tagsRouter = Router();

const tagService = new TagService();
const tagController = new TagController(tagService);

const ROUTE_WITH_ID = '/:id';

tagsRouter.get(
  '/',
  tagController.getAllTags,
);

tagsRouter.get(
  ROUTE_WITH_ID,
  tagController.getTagById,
);

tagsRouter.post(
  '/',
  nameFieldValidate,
  colorFieldValidate,
  tagController.createNewTag,
);

tagsRouter.patch(
  ROUTE_WITH_ID,
  patchTagValidate,
  tagController.editTag,
);

tagsRouter.put(
  ROUTE_WITH_ID,
  nameFieldValidate,
  colorFieldValidate,
  tagController.updateTag,
);

tagsRouter.delete(
  ROUTE_WITH_ID,
  tagController.updateTag,
);

export default tagsRouter;

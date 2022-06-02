import { Router } from 'express';
import TagController from '../controllers/TagController';
import TagService from '../services/TagService';

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
  tagController.createNewTag,
);

tagsRouter.patch(
  ROUTE_WITH_ID,
  /* tagsController */
);

tagsRouter.put(
  ROUTE_WITH_ID,
  /* tagsController */
);

tagsRouter.delete(
  ROUTE_WITH_ID,
  /* tagsController */
);

export default tagsRouter;

import { Router } from 'express';
import DeviceTagController from '../controllers/DeviceTagController';
import DeviceTagService from '../services/DeviceTagService';

const deviceTagsRouter = Router();

const deviceTagService = new DeviceTagService();
const deviceTagController = new DeviceTagController(deviceTagService);

deviceTagsRouter.get(
  '/',
  deviceTagController.getAllDevicesAndTags,
);

export default deviceTagsRouter;

import { Router } from 'express';
import DeviceController from '../controllers/DeviceController';
import DeviceService from '../services/DeviceService';
import deviceDataValidate from '../middlewares/deviceDataValidate';

const devicesRouter = Router();

const deviceService = new DeviceService();
const deviceController = new DeviceController(deviceService);

const ROUTE_WITH_ID = '/:id';

devicesRouter.get(
  '/',
  deviceController.getAllDevices,
);

devicesRouter.get(
  ROUTE_WITH_ID,
  deviceController.getDeviceById,
);

devicesRouter.post(
  '/',
  deviceDataValidate,
  deviceController.createNewDevice,
);

devicesRouter.patch(
  ROUTE_WITH_ID,
  /* devicesController */
);

devicesRouter.put(
  ROUTE_WITH_ID,
  /* devicesController */
);

devicesRouter.delete(
  ROUTE_WITH_ID,
  /* devicesController */
);

export default devicesRouter;

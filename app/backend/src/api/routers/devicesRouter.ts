import { Router } from 'express';

const devicesRouter = Router();

const ROUTE_WITH_ID = '/devices/:id';

devicesRouter.get(
  '/devices',
  /* devicesController */
);

devicesRouter.get(
  ROUTE_WITH_ID,
  /* devicesController */
);

devicesRouter.post(
  '/devices',
  /* devicesController */
);

devicesRouter.patch(
  ROUTE_WITH_ID,
  /* devicesController */
);

devicesRouter.delete(
  ROUTE_WITH_ID,
  /* devicesController */
);

export default devicesRouter;

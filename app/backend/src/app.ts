import * as express from 'express';
import devicesRouter from './api/routers/devicesRouter';
import tagsRouter from './api/routers/tagsRouter';
import ErrorMiddleware from './api/middlewares/error';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());

    this.startConfigs();
  }

  private startConfigs(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);

    this.app.get('/', (_req, res) => res.status(200).json({ message: 'API is working!' }));

    this.app.use('/devices', devicesRouter);
    this.app.use('/tags', tagsRouter);
    this.app.use(ErrorMiddleware);
  }

  public start(PORT: number): void {
    this.app.listen(PORT, () => console.log(`App Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();

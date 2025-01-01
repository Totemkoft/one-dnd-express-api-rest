import express, { Application } from 'express';
import cors from 'cors';
import DatabaseConnection from './database-config';
import { RouteInitializer } from './route-initializer';
import { errorHandlerMiddleware } from '../middleware/error-handler.middleware';

class ServerConfiguration {
  private app: Application;
  private port: string | number;
  private databaseConnection: DatabaseConnection;
  private routerInitializer: RouteInitializer;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.databaseConnection = new DatabaseConnection();
    this.routerInitializer = new RouteInitializer(this.app);
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  public async start(): Promise<void> {
    try {
      await this.databaseConnection.connect();
      this.initializeMiddlewares();
      this.routerInitializer.initializeRoutes();

      this.app.use(errorHandlerMiddleware);

      this.app.listen(this.port, () => {
        console.log(`The server is running on port: ${this.port}`);
      });

      this.app.all("*", (req, res) => {
        res.status(404).json({
          status: 404,
          message: "Route not found",
        });
      });
    } catch (error) {
      console.error('Failed to start the server:', error);
      process.exit(1);
    }
  }
}

export default ServerConfiguration;

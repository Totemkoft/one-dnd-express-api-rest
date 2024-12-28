import express, { Application } from 'express';
import cors from 'cors';
import DatabaseConnection from './database-config';
import { RouteInitializer } from './route-initializer';

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

  public async start(): Promise<void>{
    try {
      this.initializeMiddlewares();
      await this.databaseConnection.connect();
      this.routerInitializer.initializeRoutes();

      this.app.listen(this.port, () => {
        console.log(`The server is running on port: ${this.port}`);
      });
    } catch (error) {
      console.error('Failed to start the server:', error);
      process.exit(1);
    }
  }
}

export default ServerConfiguration;

import { Application } from 'express';
import { BaseRouter } from '../common/interfaces/base-router.interface';
import { UserCharacterRouter } from '../modules/user-character/router/user-character.router';

export class RouteInitializer {
  readonly path: string;
  private readonly app: Application;
  private readonly routers: BaseRouter[];

  constructor(app: Application) {
    this.app = app;
    this.path = '/api';
    this.routers = [
      new UserCharacterRouter(),
    ];
  }

  public initializeRoutes(): void {
    this.routers.forEach((router) => {
      this.app.use(this.path, router.router);
    });
  }
}

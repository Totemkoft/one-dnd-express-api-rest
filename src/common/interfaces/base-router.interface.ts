import { Router } from 'express';

export interface BaseRouter {
  readonly path: string;
  readonly router: Router;
}

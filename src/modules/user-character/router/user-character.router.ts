import { Router } from 'express';
import { BaseRouter } from '../../../common/interfaces/base-router.interface';
import { UserCharacterController } from '../user-character.controller';

export class UserCharacterRouter implements BaseRouter {
  readonly path: string = '/user-character';
  readonly router: Router = Router();
  private readonly userCharacterController: UserCharacterController = new UserCharacterController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.userCharacterController.getCharacters.bind(this.userCharacterController));
    this.router.post(`${this.path}/create-character`, this.userCharacterController.createCharacter.bind(this.userCharacterController));
  }
}

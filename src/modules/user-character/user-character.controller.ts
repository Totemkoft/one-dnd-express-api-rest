import { IUserCharacter, IUserCharacterModel } from "./model/user-character";
import { NextFunction, Request, Response } from "express";
import { UserCharacterService } from "./user-character.service";
import { validateCreate } from "./validators/user-character-validations"

export class UserCharacterController {

    public service: UserCharacterService = new UserCharacterService();

    /**
     * Obtain all the registered characters 
     * @param res {IUserCharacterModel[]}
     */
    public async getCharacters(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const characters: IUserCharacterModel[] = await this.service.getCharacters();
            res.status(200).json(characters);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Create a character
     * @param req {IUserCharacter} 
     * @param res {IUserCharacterModel} the created character
     */
    public async createCharacter(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            validateCreate(req.body);
            
            const character: IUserCharacter = req.body;
            const createdCharacter: IUserCharacterModel = await this.service.createCharacter(character);
            res.status(201).json(createdCharacter);
        } catch (error: any) {
            next(error);
        };
    }
}

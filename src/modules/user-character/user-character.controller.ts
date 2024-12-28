import { IUserCharacter, IUserCharacterModel } from "./model/user-character";
import { Request, Response } from "express";
import { UserCharacterService } from "./user-character.service";

export class UserCharacterController {

    public service: UserCharacterService = new UserCharacterService();

    /**
     * Obtain all the registered characters 
     * @param res {IUserCharacterModel[]}
     */
    public async getCharacters(req: Request, res: Response): Promise<void> {
        try {
            const characters: IUserCharacterModel[] = await this.service.getCharacters();
            res.status(200).json(characters);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * Create a character
     * @param req {IUserCharacter} 
     * @param res {IUserCharacterModel} the created character
     */
    public async createCharacter(req: Request, res: Response): Promise<void> {
        const character: IUserCharacter = req.body;
        try {
            const createdCharacter: IUserCharacterModel = await this.service.createCharacter(character);
            res.status(201).send(createdCharacter);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

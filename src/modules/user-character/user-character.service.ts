import Logger from "../../config/logger";
import { IUserCharacter, IUserCharacterModel } from "./model/user-character";
import userCharacterRepository from "./user-character.repository";

export class UserCharacterService {

    /**
     * Create a character
     * @param character {IUserCharacter} character data
     * @returns {IUserCharacterModel} The created character
     */
    public async createCharacter(character: IUserCharacter): Promise<IUserCharacterModel> {
        try {
            return await userCharacterRepository.createOne(character);
        } catch (error) {
            Logger.error("Error in createCharacter", error);
            throw error;
        }
    };

    /**
     * Obtain all the registered characters 
     * @returns {IUserCharacterModel[]}
     */
    public async getCharacters(): Promise<IUserCharacterModel[]> {
        try {
            return await userCharacterRepository.findAll();
        } catch (error) {
            Logger.error("Error in getCharacters", error);
            throw error; 
        }
    };

}
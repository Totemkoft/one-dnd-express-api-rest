import { IUserCharacter, IUserCharacterModel } from "./model/user-character";
import userCharacterRepository from "./user-character.repository";

export class UserCharacterService {

    /**
     * Create a character
     * @param character {IUserCharacter} character data
     * @returns {IUserCharacterModel} The created character
     */
    public async createCharacter(character: IUserCharacter): Promise<IUserCharacterModel> {
        return await userCharacterRepository.createOne(character);
    };

    /**
     * Obtain all the registered characters 
     * @returns {IUserCharacterModel[]}
     */
    public async getCharacters(): Promise<IUserCharacterModel[]> {
        return await userCharacterRepository.findAll();
    };
}
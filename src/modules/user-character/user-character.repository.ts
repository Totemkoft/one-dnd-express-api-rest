import { BaseRepository } from "../../common/base/base-repository";
import { IUserCharacter, IUserCharacterModel, UserCharacter } from "./model/user-character";

class UserCharacterRepository extends BaseRepository<IUserCharacterModel> {
    constructor(model: typeof UserCharacter) {
        super(model);
    }
}

export default new UserCharacterRepository(UserCharacter);
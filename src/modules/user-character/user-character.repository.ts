import { BaseRepository } from "../../common/base/base-repository";
import { IUserCharacterModel, UserCharacter } from "./model/user-character";

class UserCharacterRepository extends BaseRepository<IUserCharacterModel> {
    constructor(model: typeof UserCharacter) {
        super(model);
    }
}

export default new UserCharacterRepository(UserCharacter);
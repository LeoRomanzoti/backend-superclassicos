import User from "../domain/entity/User";
import UserDTO from "../dto/in/UserDTO";

export default class UserAdapter {
    parse(userDTO: UserDTO): User {
        return new User(
            userDTO.id,
            userDTO.phone,
            this.parseScopes(userDTO.scopes),
            userDTO.name
        );
    }

    private parseScopes(scopes: string): string[] {
        return scopes.split(";").filter(Boolean);
    }
}

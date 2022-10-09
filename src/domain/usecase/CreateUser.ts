import User from "../entity/User";
import UserRepository from "../repository/UserRepository";

export default class CreateUser {
    constructor(readonly userRepository: UserRepository) {}

    async execute(name: string, phone: string): Promise<User | undefined> {
        const newUser = await this.userRepository.save(name, phone);
        return newUser;
    }
}

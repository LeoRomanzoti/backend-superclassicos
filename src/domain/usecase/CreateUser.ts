import User from "../entity/User";
import UserRepository from "../repository/UserRepository";

export default class CreateUser {
    constructor(readonly userRepository: UserRepository) { }

    async execute(phone: string): Promise<User> {
        const newUser = await this.userRepository.save(phone)
        return newUser
    }
}
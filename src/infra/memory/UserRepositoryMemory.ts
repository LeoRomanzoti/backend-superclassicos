import User from "../../domain/entity/User";
import UserRepository from "../../domain/repository/UserRepository";

export default class UserRepositoryMemory implements UserRepository {
    users: Array<User>

    constructor() {
        this.users = []
    }
    getUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    getById(userId: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async save(phone: string): Promise<User> {
        const user = new User(Math.floor(Math.random() * 999999).toString(), phone, "")
        this.users.push(user)
        return user
    }

}
import { PrismaClient } from "@prisma/client"
import User from "../domain/entity/User"
import CreateUser from "../domain/usecase/CreateUser"
import UserRepositoryDatabase from "../infra/database/UserRepositoryDatabase"

export default class UserController {
    constructor(readonly databaseConnection: PrismaClient) {
    }

    async createUser(phone: string): Promise<User> {
        const userRepositoryDatabase = new UserRepositoryDatabase(this.databaseConnection)
        const createUserUseCase = new CreateUser(userRepositoryDatabase)
        const newUser = await createUserUseCase.execute(phone)
        return newUser;
    }

    async getUsers(): Promise<Array<User>> {
        const userRepositoryDatabase = new UserRepositoryDatabase(this.databaseConnection)
        const users = await userRepositoryDatabase.getUsers()
        return users;
    }

    async getUserById(userId: string): Promise<User | null> {
        const userRepositoryDatabase = new UserRepositoryDatabase(this.databaseConnection)
        const user = await userRepositoryDatabase.getById(userId)
        return user;
    }
}
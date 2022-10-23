import { PrismaClient } from "@prisma/client";

import UserAdapter from "../adapter/UserAdapter";
import User from "../domain/entity/User";
import CreateUser from "../domain/usecase/CreateUser";
import UserRepositoryDatabase from "../infra/database/UserRepositoryDatabase";

export default class UserController {
    constructor(readonly databaseConnection: PrismaClient) {}

    async createUser(name: string, phone: string): Promise<User | undefined> {
        const adapter = new UserAdapter();
        const userRepositoryDatabase = new UserRepositoryDatabase(
            this.databaseConnection,
            adapter
        );
        const createUserUseCase = new CreateUser(userRepositoryDatabase);
        const newUser = await createUserUseCase.execute(name, phone);
        return newUser;
    }

    async getUsers(): Promise<Array<User>> {
        const adapter = new UserAdapter();
        const userRepositoryDatabase = new UserRepositoryDatabase(
            this.databaseConnection,
            adapter
        );
        const users = await userRepositoryDatabase.getUsers();
        return users;
    }

    async getUserById(userId: string): Promise<User | null> {
        const adapter = new UserAdapter();
        const userRepositoryDatabase = new UserRepositoryDatabase(
            this.databaseConnection,
            adapter
        );
        const user = await userRepositoryDatabase.getById(userId);
        return user;
    }
}

import { PrismaClient } from "@prisma/client";

import UserAdapter from "../../adapter/UserAdapter";
import User from "../../domain/entity/User";
import UserRepository from "../../domain/repository/UserRepository";

export default class UserRepositoryDatabase implements UserRepository {
    constructor(
        readonly databaseConnection: PrismaClient,
        readonly userAdapter: UserAdapter
    ) {}

    async getUsers(): Promise<User[]> {
        const users = await this.databaseConnection.user.findMany();
        const userList = [];
        for (const user of users) {
            const userParsed = this.userAdapter.parse(user);
            userList.push(userParsed);
        }
        return userList;
    }

    async getById(userId: string): Promise<User | null> {
        const user = await this.databaseConnection.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) return null;
        return this.userAdapter.parse(user);
    }

    async getByPhone(phone: string): Promise<User | null> {
        const user = await this.databaseConnection.user.findUnique({
            where: {
                phone,
            },
        });
        console.log({ user });
        if (!user) return null;
        return this.userAdapter.parse(user);
    }

    async save(name: string, phone: string): Promise<User> {
        const newUser = await this.databaseConnection.user.create({
            data: {
                name,
                phone,
            },
        });
        return this.userAdapter.parse(newUser);
    }
}

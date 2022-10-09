import { PrismaClient } from "@prisma/client";

import User from "../../domain/entity/User";
import UserRepository from "../../domain/repository/UserRepository";

export default class UserRepositoryDatabase implements UserRepository {
    constructor(readonly databaseConnection: PrismaClient) {}
    async getUsers(): Promise<User[]> {
        const users = await this.databaseConnection.user.findMany();
        return users;
    }

    async getById(userId: string): Promise<User | null> {
        const user = await this.databaseConnection.user.findUnique({
            where: {
                id: userId,
            },
        });
        return user;
    }

    async save(name: string, phone: string): Promise<User | undefined> {
        try {
            const newUser = await this.databaseConnection.user.create({
                data: {
                    name,
                    phone,
                },
            });
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }
}

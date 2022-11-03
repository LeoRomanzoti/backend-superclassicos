import { PrismaClient } from "@prisma/client";
import axios from "axios";

import UserAdapter from "../adapter/UserAdapter";
import Result from "../common/Result";
import User from "../domain/entity/User";
import CreateUser from "../domain/usecase/CreateUser";
import SendSMS from "../domain/usecase/SendSMS";
import ValidateCode from "../domain/usecase/ValidateCode";
import UserRepositoryDatabase from "../infra/database/UserRepositoryDatabase";
import OTP from "../infra/http/OTP";

export default class AuthController {
    constructor(readonly databaseConnection: PrismaClient) {}

    async login(userPhone: string, userName: string): Promise<User> {
        const userAdapter = new UserAdapter();
        const userRepository = new UserRepositoryDatabase(
            this.databaseConnection,
            userAdapter
        );
        let user = await userRepository.getByPhone(userPhone);
        if (!user) {
            const userCaseUser = new CreateUser(userRepository);
            user = await userCaseUser.execute(userName, userPhone);
        }
        const smsClient = new OTP(axios);
        const useCase = new SendSMS(smsClient);
        await useCase.execute(user?.id, userPhone);
        return user;
    }

    async validate(userId: string, code: string): Promise<Result<User | null>> {
        const smsClient = new OTP(axios);
        const useCase = new ValidateCode(smsClient);
        const isValid = await useCase.execute(userId, code);
        if (isValid.isFailure) return Result.fail("Erro ao validar o código.");
        const userAdapter = new UserAdapter();
        const userRepository = new UserRepositoryDatabase(
            this.databaseConnection,
            userAdapter
        );
        const user = await userRepository.getById(userId);
        if (!user) return Result.fail("Erro ao encontrar o usuário.");
        return Result.ok(user);
    }
}

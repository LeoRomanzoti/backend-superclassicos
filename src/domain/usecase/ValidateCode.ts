import Result from "../../common/Result";
import SMS from "../http/SMS";

export default class ValidateCode {
    constructor(readonly serviceClient: SMS) {}

    async execute(userId: string, code: string): Promise<Result<boolean>> {
        const response = await this.serviceClient.validate(userId, code);
        if (response.status !== 200)
            return Result.fail("Erro ao validar o código.");
        return Result.ok(true);
    }
}

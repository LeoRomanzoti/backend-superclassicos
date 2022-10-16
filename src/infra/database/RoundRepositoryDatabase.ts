import { PrismaClient } from "@prisma/client";

import RoundAdapter from "../../adapter/RoundAdapter";
import Round from "../../domain/entity/Round";
import RoundRepository from "../../domain/repository/RoundRepository";

export default class RoundRepositoryDatabase implements RoundRepository {
    constructor(
        readonly databaseConnection: PrismaClient,
        readonly roundAdapter: RoundAdapter
    ) {}

    save(startDate: string, endData: string, number: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    getById(roundId: string): Promise<Round | undefined> {
        throw new Error("Method not implemented.");
    }

    async getOpen(): Promise<Round | undefined> {
        const roundData = await this.databaseConnection.round.findFirst({
            where: {
                open: true,
            },
        });
        if (!roundData) return;
        const round = this.roundAdapter.parse(roundData);
        return round;
    }
}

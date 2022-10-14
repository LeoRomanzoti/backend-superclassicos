import Round from "../../domain/entity/Round";
import RoundRepository from "../../domain/repository/RoundRepository";

export default class RoundRepositoryMemory implements RoundRepository {
    rounds: Array<Round>;
    constructor() {
        this.rounds = [
            new Round(
                "1",
                new Date("2022-10-22"),
                new Date("2022-10-29"),
                1,
                false
            ),
        ];
    }

    async getOpen(): Promise<Round | undefined> {
        throw new Error("Method not implemented.");
    }

    async save(
        startDate: string,
        endData: string,
        number: number
    ): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async getById(roundId: string): Promise<Round | undefined> {
        const round = this.rounds.find((r) => r.roundId === roundId);
        return round;
    }
}

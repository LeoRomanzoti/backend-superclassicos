import Round from "../../domain/entity/Round";
import RoundRepository from "../../domain/repository/RoundRepository";

export default class RoundRepositoryMemory implements RoundRepository {
    rounds: Array<Round>;
    constructor() {
        this.rounds = [new Round("1", "2022-10-22", "2022-10-29", 1)];
    }

    save(startDate: string, endData: string, number: number): boolean {
        throw new Error("Method not implemented.");
    }

    getById(roundId: string): Round | undefined {
        const round = this.rounds.find((r) => r.roundId === roundId);
        return round;
    }
}

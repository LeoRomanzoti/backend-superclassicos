import Round from "../entity/Round";

export default interface RoundRepository {
    save(startDate: string, endData: string, number: number): boolean;
    getById(roundId: string): Round | undefined;
}

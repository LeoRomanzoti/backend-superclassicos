import Round from "../entity/Round";

export default interface RoundRepository {
    save(startDate: string, endData: string, number: number): Promise<boolean>;
    getById(roundId: string): Promise<Round | undefined>;
    getOpen(): Promise<Round | undefined>;
}

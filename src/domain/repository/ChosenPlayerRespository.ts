import ChosenPlayer from "../entity/ChosenPlayer";

export default interface ChosenPlayerRepository {
    getById(chosenPlayerId: string): Promise<ChosenPlayer | undefined>;
    getAll(): Promise<ChosenPlayer[] | undefined>;
    updateWithPoint(
        chosenPlayerId: string,
        pointValue: number
    ): Promise<ChosenPlayer | undefined>;
}

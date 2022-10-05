import ChosenPlayer from "../entity/ChosenPlayer";

export default interface ChosenPlayerRepository {
    getById(chosenPlayerId: string): Promise<ChosenPlayer | undefined>;
    getAll(): Array<ChosenPlayer>;
}

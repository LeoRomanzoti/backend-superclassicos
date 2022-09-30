import ChosenPlayer from "../entity/ChosenPlayer";

export default interface ChosenPlayerRepository {
    getById(chosenPlayerId: string): ChosenPlayer | undefined;
    getAll(): Array<ChosenPlayer>;
}

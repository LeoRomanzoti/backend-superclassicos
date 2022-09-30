import ChosenPlayer from "../../domain/entity/ChosenPlayer";
import Player from "../../domain/entity/Player";
import Round from "../../domain/entity/Round";
import ChosenPlayerRepository from "../../domain/repository/ChosenPlayerRespository";

export default class ChosenPlayerRepositoryMemory
    implements ChosenPlayerRepository
{
    chosenPlayers: Array<ChosenPlayer>;

    constructor() {
        this.chosenPlayers = [
            new ChosenPlayer(
                "1",
                new Player("1", "Pedro", "Lateral"),
                new Round("1", "2022-10-22", "2022-10-29", 1),
                0
            ),
        ];
    }

    getById(chosenPlayerId: string): ChosenPlayer | undefined {
        const chosenPlayers = this.chosenPlayers.find(
            (cp) => cp.chosenPlayerId === chosenPlayerId
        );
        return chosenPlayers;
    }

    getAll(): ChosenPlayer[] {
        return this.chosenPlayers;
    }
}

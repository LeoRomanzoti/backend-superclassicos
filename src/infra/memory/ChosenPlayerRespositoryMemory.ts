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
                new Round(
                    "1",
                    new Date("2022-10-22"),
                    new Date("2022-10-29"),
                    1,
                    true
                ),
                0
            ),
        ];
    }

    async updateWithPoint(
        chosenPlayerId: string,
        pointValue: number
    ): Promise<ChosenPlayer | undefined> {
        const chosenPlayer = this.chosenPlayers.find(
            (c) => c.chosenPlayerId === chosenPlayerId
        );
        if (!chosenPlayer) return;
        chosenPlayer.score += pointValue;
        return chosenPlayer;
    }

    async getById(chosenPlayerId: string): Promise<ChosenPlayer | undefined> {
        const chosenPlayer = this.chosenPlayers.find(
            (cp) => cp.chosenPlayerId === chosenPlayerId
        );
        return chosenPlayer;
    }

    async getAll(): Promise<ChosenPlayer[] | undefined> {
        return this.chosenPlayers;
    }
}

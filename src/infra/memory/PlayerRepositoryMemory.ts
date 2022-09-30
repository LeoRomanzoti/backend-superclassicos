import Player from "../../domain/entity/Player";
import PlayerRepository from "../../domain/repository/PlayerRepository";

export default class PlayerRepositoryMemory implements PlayerRepository {
    players: Array<Player>;

    constructor() {
        this.players = [
            new Player("1", "Pedro", "Lateral"),
            new Player("2", "Leo", "Atacante"),
        ];
    }

    getById(playerId: string): Player | undefined {
        const player = this.players.find((p) => p.playerId === playerId);
        return player;
    }
}

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
        const player = this.players.filter((p) => p.playerId === playerId);
        if (player.length === 0) return;
        return player[0];
    }
}

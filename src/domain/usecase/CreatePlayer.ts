import Player from "../entity/Player";
import PlayerRepository from "../repository/PlayerRepository";

export default class CreatePlayer {
    constructor(readonly playerRepository: PlayerRepository) {}

    execute(name: string, position: string): Player {
        // implements database
        return new Player("1", name, position);
    }
}

import Player from "../entity/Player";

export default interface PlayerRepository {
    getById(playerId: string): Player | undefined;
}

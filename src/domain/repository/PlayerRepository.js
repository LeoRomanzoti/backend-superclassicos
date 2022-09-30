import Player from "../entity/Player";

export default class PlayerRepository {
    getById(playerId) {
        return new Player("123", "Pedro", "Lateral");
    }
}

import ChosenPlayer from "../entity/ChosenPlayer";
import PlayerRepository from "../repository/PlayerRepository";
import RoundRepository from "../repository/RoundRepository";

export default class CreateChosenPlayer {
    constructor(
        readonly playerRepository: PlayerRepository,
        readonly roundRepository: RoundRepository
    ) {}

    execute(playerId: string, roundId: string): ChosenPlayer | undefined {
        const player = this.playerRepository.getById(playerId);
        if (!player) return;
        const round = this.roundRepository.getById(roundId);
        if (!round) return;
        return new ChosenPlayer("1", player, round, 0);
    }
}

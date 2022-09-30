import CorneteiroTeam from "../entity/CorneteiroTeam";
import CorneteiroTeamRepository from "../repository/CorneteiroTeamRepository";
import PlayerRepository from "../repository/PlayerRepository";

export default class AddPlayer {
    constructor(
        readonly corneteiroTeamRepository: CorneteiroTeamRepository,
        readonly playerRepository: PlayerRepository
    ) {}

    execute(
        playerId: string,
        corneteiroTeamId: string
    ): CorneteiroTeam | undefined {
        const team = this.corneteiroTeamRepository.getById(corneteiroTeamId);
        if (!team) return;
        const player = this.playerRepository.getById(playerId);
        if (!player) return;
        team.addPlayer(player);
        return team;
    }
}

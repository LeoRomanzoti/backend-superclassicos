import CorneteiroTeam from "../entity/CorneteiroTeam";
import CorneteiroTeamRepository from "../repository/CorneteiroTeamRepository";

export default class RemovePlayer {
    constructor(readonly corneteiroTeamRepository: CorneteiroTeamRepository) {}

    execute(
        corneteiroTeamId: string,
        chosenPlayerId: string
    ): CorneteiroTeam | undefined {
        const team = this.corneteiroTeamRepository.getById(corneteiroTeamId);
        if (!team) return;
        team.removePlayer(chosenPlayerId);
        return team;
    }
}

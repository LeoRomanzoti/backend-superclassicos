import CorneteiroTeam from "../entity/CorneteiroTeam";
import CorneteiroTeamRepository from "../repository/CorneteiroTeamRepository";

export default class RemoveChosenPlayer {
    constructor(readonly corneteiroTeamRepository: CorneteiroTeamRepository) {}

    async execute(
        corneteiroTeamId: string,
        chosenPlayerId: string
    ): Promise<CorneteiroTeam | undefined> {
        const team = await this.corneteiroTeamRepository.getById(
            corneteiroTeamId
        );
        if (!team) return;
        team.removePlayer(chosenPlayerId);
        return team;
    }
}

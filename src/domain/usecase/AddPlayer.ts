import ChosenPlayer from "../entity/ChosenPlayer";
import CorneteiroTeam from "../entity/CorneteiroTeam";
import ChosenPlayerRepository from "../repository/ChosenPlayerRespository";
import CorneteiroTeamRepository from "../repository/CorneteiroTeamRepository";

export default class AddPlayer {
    constructor(
        readonly corneteiroTeamRepository: CorneteiroTeamRepository,
        readonly chosenPlayerRepository: ChosenPlayerRepository
    ) {}

    execute(chosenPlayerId: string, corneteiroTeamId: string): void {
        const team = this.corneteiroTeamRepository.getById(corneteiroTeamId);
        if (!team) return;
        const chosenPlayer =
            this.chosenPlayerRepository.getById(chosenPlayerId);
        if (!chosenPlayer) return;
        team.addPlayer(chosenPlayer);
    }
}

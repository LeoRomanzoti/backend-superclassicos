import ChosenPlayer from "../entity/ChosenPlayer";
import CorneteiroTeam from "../entity/CorneteiroTeam";
import ChosenPlayerRepository from "../repository/ChosenPlayerRespository";
import CorneteiroTeamRepository from "../repository/CorneteiroTeamRepository";

export default class AddChosenPlayer {
    constructor(
        readonly corneteiroTeamRepository: CorneteiroTeamRepository,
        readonly chosenPlayerRepository: ChosenPlayerRepository
    ) {}

    async execute(
        chosenPlayerId: string,
        corneteiroTeamId: string
    ): Promise<void> {
        const team = await this.corneteiroTeamRepository.getById(
            corneteiroTeamId
        );
        console.log(team);
        if (!team) return;
        const chosenPlayer = await this.chosenPlayerRepository.getById(
            chosenPlayerId
        );
        if (!chosenPlayer) return;
        team.addPlayer(chosenPlayer);
    }
}

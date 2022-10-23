import CorneteiroTeamShort from "../../dto/out/CorneteiroTeamShort";
import CorneteiroTeamRepository from "../repository/CorneteiroTeamRepository";

export default class CorneteiroTeamRanking {
    constructor(readonly corneteiroTeamRepository: CorneteiroTeamRepository) {}

    async execute(): Promise<CorneteiroTeamShort[]> {
        let corneteiroTeams = await this.corneteiroTeamRepository.getAllShort();
        corneteiroTeams = corneteiroTeams?.sort(function (team) {
            return team.score;
        });
        return corneteiroTeams;
    }
}

import CorneteiroTeam from "../entity/CorneteiroTeam";
import CorneteiroTeamRepository from "../repository/CorneteiroTeamRepository";

export default class CorneteiroTeamDetail {
    constructor(readonly corneteiroTeamRepository: CorneteiroTeamRepository) {}

    async execute(
        corneteiroTeamId: string
    ): Promise<CorneteiroTeam | undefined> {
        const corneteiroTeam =
            this.corneteiroTeamRepository.getById(corneteiroTeamId);
        return corneteiroTeam;
    }
}

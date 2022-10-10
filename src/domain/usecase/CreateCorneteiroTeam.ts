import CorneteiroTeam from "../entity/CorneteiroTeam";
import CorneteiroTeamRepository from "../repository/CorneteiroTeamRepository";

export default class CreateCorneteiroTeam {
    constructor(readonly corneteiroTeamRepository: CorneteiroTeamRepository) {}

    async execute(
        teamName: string,
        userId: string
    ): Promise<CorneteiroTeam | undefined> {
        const newCorneteiroTeam = await this.corneteiroTeamRepository.save(
            teamName,
            userId
        );
        return newCorneteiroTeam;
    }
}

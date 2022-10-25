import Result from "../../common/Result";
import CorneteiroTeam from "../entity/CorneteiroTeam";
import CorneteiroTeamRepository from "../repository/CorneteiroTeamRepository";

export default class CreateCorneteiroTeam {
    constructor(readonly corneteiroTeamRepository: CorneteiroTeamRepository) {}

    async execute(
        teamName: string,
        userId: string
    ): Promise<Result<CorneteiroTeam>> {
        const team = await this.corneteiroTeamRepository.getById(userId);
        if (team) return Result.fail("Você já tem um time..");
        const newCorneteiroTeam = await this.corneteiroTeamRepository.save(
            teamName,
            userId
        );
        return Result.ok(newCorneteiroTeam);
    }
}

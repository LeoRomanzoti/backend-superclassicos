import CorneteiroTeam from "../entity/CorneteiroTeam";

export default interface CorneteiroTeamRepository {
    getById(corneteiroTeamId: string): CorneteiroTeam | undefined;
}

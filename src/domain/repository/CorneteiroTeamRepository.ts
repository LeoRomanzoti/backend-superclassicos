import CorneteiroTeam from "../entity/CorneteiroTeam";

export default interface CorneteiroTeamRepository {
    getById(corneteiroTeamId: string): Promise<CorneteiroTeam | undefined>;
    getAll(): Promise<CorneteiroTeam[] | undefined>
}

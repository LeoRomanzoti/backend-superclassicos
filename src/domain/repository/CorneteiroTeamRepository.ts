import CorneteiroTeam from "../entity/CorneteiroTeam";

export default interface CorneteiroTeamRepository {
    getById(userId: string): Promise<CorneteiroTeam | undefined>;
    getAll(): Promise<CorneteiroTeam[] | undefined>;
    save(teamName: string, userId: string): Promise<CorneteiroTeam | undefined>;
    removePlayer(teamsOnPlayersId: string): Promise<boolean>;
}

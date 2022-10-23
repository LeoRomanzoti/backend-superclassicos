import CorneteiroTeamShort from "../../dto/out/CorneteiroTeamShort";
import CorneteiroTeam from "../entity/CorneteiroTeam";

export default interface CorneteiroTeamRepository {
    getById(userId: string): Promise<CorneteiroTeam | undefined>;
    getAll(): Promise<CorneteiroTeam[]>;
    getAllShort(): Promise<CorneteiroTeamShort[]>;
    save(teamName: string, userId: string): Promise<CorneteiroTeam>;
    removePlayer(teamsOnPlayersId: string): Promise<boolean>;
}

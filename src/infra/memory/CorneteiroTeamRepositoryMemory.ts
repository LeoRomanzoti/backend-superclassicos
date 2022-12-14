import CorneteiroTeam from "../../domain/entity/CorneteiroTeam";
import CorneteiroTeamRepository from "../../domain/repository/CorneteiroTeamRepository";
import CorneteiroTeamChosenPlayerDTO, {
    CorneteiroTeamChosenPlayerData,
} from "../../dto/in/CorneteiroTeamChosenPlayerDTO";
import PlayerDTO from "../../dto/in/PlayerDTO";
import CorneteiroTeamShort from "../../dto/out/CorneteiroTeamShort";

export default class CorneteiroTeamRepositoryMemory
    implements CorneteiroTeamRepository
{
    corneteirosTeam: Array<CorneteiroTeam>;

    constructor() {
        this.corneteirosTeam = [
            new CorneteiroTeam("Tabajara", "1", []),
            new CorneteiroTeam("L7O", "2", [
                new CorneteiroTeamChosenPlayerDTO(
                    "1",
                    new CorneteiroTeamChosenPlayerData(
                        "1",
                        0,
                        new PlayerDTO("1", "Pedro", "Lateral")
                    )
                ),
                new CorneteiroTeamChosenPlayerDTO(
                    "2",
                    new CorneteiroTeamChosenPlayerData(
                        "2",
                        0,
                        new PlayerDTO("1", "Leo", "Atacante")
                    )
                ),
            ]),
            new CorneteiroTeam("Leme FC", "3", [
                new CorneteiroTeamChosenPlayerDTO(
                    "3",
                    new CorneteiroTeamChosenPlayerData(
                        "3",
                        0,
                        new PlayerDTO("1", "Pedro", "Lateral")
                    )
                ),
            ]),
        ];
    }

    getAllShort(): Promise<CorneteiroTeamShort[]> {
        throw new Error("Method not implemented.");
    }

    async removePlayer(teamsOnPlayersId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async save(teamName: string, userId: string): Promise<CorneteiroTeam> {
        const newCorneteiroTeam = new CorneteiroTeam(teamName, "06", []);
        this.corneteirosTeam.push(newCorneteiroTeam);
        return newCorneteiroTeam;
    }

    getAll(): Promise<CorneteiroTeam[]> {
        throw new Error("Method not implemented.");
    }

    async getById(
        corneteiroTeamId: string
    ): Promise<CorneteiroTeam | undefined> {
        const corneteiroTeam = this.corneteirosTeam.find(
            (ct) => ct.corneteiroTeamId === corneteiroTeamId
        );
        return corneteiroTeam;
    }
}

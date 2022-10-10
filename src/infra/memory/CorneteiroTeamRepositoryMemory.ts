import ChosenPlayer from "../../domain/entity/ChosenPlayer";
import CorneteiroTeam from "../../domain/entity/CorneteiroTeam";
import Player from "../../domain/entity/Player";
import Round from "../../domain/entity/Round";
import CorneteiroTeamRepository from "../../domain/repository/CorneteiroTeamRepository";

export default class CorneteiroTeamRepositoryMemory
    implements CorneteiroTeamRepository
{
    corneteirosTeam: Array<CorneteiroTeam>;

    constructor() {
        const round = new Round(
            "1",
            new Date("2022-10-22"),
            new Date("2022-10-29"),
            1
        );

        this.corneteirosTeam = [
            new CorneteiroTeam("Tabajara", "1", []),
            new CorneteiroTeam("L7O", "2", [
                new ChosenPlayer(
                    "1",
                    new Player("1", "Pedro", "Lateral"),
                    round,
                    0
                ),
                new ChosenPlayer(
                    "2",
                    new Player("1", "Leo", "Atacante"),
                    round,
                    4
                ),
            ]),
            new CorneteiroTeam("Leme FC", "3", [
                new ChosenPlayer(
                    "3",
                    new Player("1", "Pedro", "Lateral"),
                    round,
                    3
                ),
            ]),
        ];
    }

    async removePlayer(teamsOnPlayersId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async save(
        teamName: string,
        userId: string
    ): Promise<CorneteiroTeam | undefined> {
        const newCorneteiroTeam = new CorneteiroTeam(teamName, "06", []);
        this.corneteirosTeam.push(newCorneteiroTeam);
        return newCorneteiroTeam;
    }

    getAll(): Promise<CorneteiroTeam[] | undefined> {
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

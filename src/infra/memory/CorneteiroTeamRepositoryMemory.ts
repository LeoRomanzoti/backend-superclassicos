import CorneteiroTeam from "../../domain/entity/CorneteiroTeam";
import Player from "../../domain/entity/Player";
import CorneteiroTeamRepository from "../../domain/repository/CorneteiroTeamRepository";

export default class CorneteiroTeamRepositoryMemory
    implements CorneteiroTeamRepository
{
    corneteirosTeam: Array<CorneteiroTeam>;

    constructor() {
        this.corneteirosTeam = [
            new CorneteiroTeam("1", []),
            new CorneteiroTeam("2", [
                new Player("1", "Pedro", "Lateral"),
                new Player("1", "Leo", "Atacante"),
            ]),
            new CorneteiroTeam("3", [new Player("1", "Jose", "Lateral")]),
        ];
    }

    getById(corneteiroTeamId: string): CorneteiroTeam | undefined {
        const corneteiroTeam = this.corneteirosTeam.filter(
            (ct) => ct.corneteiroTeamId === corneteiroTeamId
        );
        if (corneteiroTeam.length === 0) return;
        return corneteiroTeam[0];
    }
}

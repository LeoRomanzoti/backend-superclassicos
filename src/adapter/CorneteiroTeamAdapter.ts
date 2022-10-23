import CorneteiroTeam from "../domain/entity/CorneteiroTeam";
import CorneteiroTeamChosenPlayerDTO from "../dto/in/CorneteiroTeamChosenPlayerDTO";
import CorneteiroTeamShort from "../dto/out/CorneteiroTeamShort";

export default class CorneteiroTeamAdapter {
    constructor() {}

    parse(
        name: string,
        corneteiroTeamId: string,
        players: CorneteiroTeamChosenPlayerDTO[]
    ): CorneteiroTeam {
        const corneteiroTeam = new CorneteiroTeam(
            name,
            corneteiroTeamId,
            players
        );
        return corneteiroTeam;
    }

    parseShort(corneteiroTeamComplete: CorneteiroTeam): CorneteiroTeamShort {
        return new CorneteiroTeamShort(
            corneteiroTeamComplete.corneteiroTeamId,
            corneteiroTeamComplete.name,
            corneteiroTeamComplete.score
        );
    }
}

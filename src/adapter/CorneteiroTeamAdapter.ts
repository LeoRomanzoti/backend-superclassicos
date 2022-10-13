import CorneteiroTeam from "../domain/entity/CorneteiroTeam";
import CorneteiroTeamChosenPlayerDTO from "../dto/in/CorneteiroTeamChosenPlayerDTO";

export default class CorneteiroTeamAdapter {
    constructor() {}

    parse(
        name: string,
        corneteiroTeamId: string,
        players: CorneteiroTeamChosenPlayerDTO[]
    ) {
        const corneteiroTeam = new CorneteiroTeam(
            name,
            corneteiroTeamId,
            players
        );
        return corneteiroTeam;
    }
}

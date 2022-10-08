import CorneteiroTeam from "../domain/entity/CorneteiroTeam";

export default class CorneteiroTeamAdapter {
    constructor() { }

    parse(name: string, corneteiroTeamId: string, players: any) {
        const corneteiroTeam = new CorneteiroTeam(
            name,
            corneteiroTeamId,
            players
        )
        return corneteiroTeam
    }
}
export default class CorneteiroTeam {
    constructor(corneteiroTeamId, players) {
        this.corneteiroTeamId = corneteiroTeamId;
        this.players = players;
    }

    addPlayer(player) {
        // should create rule to validate if a player can be add
        this.players.push(player);
    }
}

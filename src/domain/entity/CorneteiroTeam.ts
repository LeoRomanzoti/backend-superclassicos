import Player from "./Player";

export default class CorneteiroTeam {
    constructor(
        readonly corneteiroTeamId: string,
        readonly players: Array<Player>
    ) {}

    addPlayer(player: Player) {
        // should create rule to validate if a player can be add
        this.players.push(player);
    }
}

import ChosenPlayer from "./ChosenPlayer";

export default class CorneteiroTeam {
    score: number;
    players: ChosenPlayer[];

    private TOTAL_PLAYER = 11;
    private MAX_PLAYER_PER_POSITION = 2;

    constructor(
        readonly name: string,
        readonly corneteiroTeamId: string,
        players: ChosenPlayer[]
    ) {
        this.score = this.countScore(players);
        this.players = players;
    }

    addPlayer(chosenPlayer: ChosenPlayer) {
        if (this.canAddPlayer(chosenPlayer.player.position)) {
            this.players.push(chosenPlayer);
        }
    }

    canAddPlayer(position: string) {
        if (this.players.length >= this.TOTAL_PLAYER) return false;
        const quantityPlayersFromPositiion = this.players.filter(
            (player) => player.player.position === position
        );
        if (quantityPlayersFromPositiion.length >= this.MAX_PLAYER_PER_POSITION)
            return false;
        return true;
    }

    countScore(players: any): number {
        let score = 0;
        for (const player of players) {
            score += player?.chosenPlayer?.score;
        }
        return score;
    }
}

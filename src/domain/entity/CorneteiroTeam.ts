import ChosenPlayer from "./ChosenPlayer";

export default class CorneteiroTeam {
    players: Array<ChosenPlayer>;
    score: number;

    TOTAL_PLAYER = 11;
    MAX_PLAYER_PER_POSITION = 2;

    constructor(
        readonly corneteiroTeamId: string,
        players: Array<ChosenPlayer>
    ) {
        this.players = players;
        this.score = 0;
    }

    addPlayer(chosenPlayer: ChosenPlayer) {
        if (this.canAddPlayer(chosenPlayer.player.position)) {
            this.players.push(chosenPlayer);
        }
    }

    removePlayer(chosenPlayerId: string) {
        this.players = this.players.filter(
            (p) => p.chosenPlayerId !== chosenPlayerId
        );
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
}

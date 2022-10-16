import CorneteiroTeamChosenPlayerDTO from "../../dto/in/CorneteiroTeamChosenPlayerDTO";

export default class CorneteiroTeam {
    score: number;
    players: CorneteiroTeamChosenPlayerDTO[];

    private TOTAL_PLAYER = 11;
    private MAX_PLAYER_PER_POSITION = 2;

    constructor(
        readonly name: string,
        readonly corneteiroTeamId: string,
        players: CorneteiroTeamChosenPlayerDTO[]
    ) {
        this.score = this.countScore(players);
        this.players = players;
    }

    addPlayer(chosenPlayer: CorneteiroTeamChosenPlayerDTO): void {
        this.players.push(chosenPlayer);
    }

    isFull(): boolean {
        if (this.players.length >= this.TOTAL_PLAYER) return true;
        return false;
    }

    positionIsFull(position: string): boolean {
        const quantityPlayersFromPositiion = this.players.filter(
            (player) => player?.chosenPlayer?.player?.position === position
        );
        if (quantityPlayersFromPositiion.length >= this.MAX_PLAYER_PER_POSITION)
            return true;
        return false;
    }

    countScore(players: any): number {
        let score = 0;
        for (const player of players) {
            score += player?.chosenPlayer?.score;
        }
        return score;
    }

    playerAlreadyExist(chosenPlayerId: string): boolean {
        const hasPlayer = this.players.find(
            (player) => player?.chosenPlayer?.id === chosenPlayerId
        );
        if (hasPlayer) return true;
        return false;
    }
}

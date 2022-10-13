import Player from "./Player";
import Round from "./Round";

export default class ChosenPlayer {
    score: number;
    player: Player;
    round: Round;

    constructor(
        readonly chosenPlayerId: string,
        player: Player,
        round: Round,
        score: number
    ) {
        this.score = score;
        this.player = player;
        this.round = round;
    }

    sumPoint(pointValue: number): number {
        return this.score += pointValue
    }
}

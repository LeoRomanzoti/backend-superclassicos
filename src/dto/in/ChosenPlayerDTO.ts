import PlayerDTO from "./PlayerDTO";
import RoundDTO from "./RoundDTO";

export default class ChosenPlayerDTO {
    constructor(
        readonly id: string,
        readonly playerId: string,
        readonly roundId: string,
        readonly score: number,
        readonly player: PlayerDTO,
        readonly round: RoundDTO
    ) { }
}
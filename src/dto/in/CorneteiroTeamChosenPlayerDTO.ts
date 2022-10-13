import PlayerDTO from "./PlayerDTO";

export default class CorneteiroTeamChosenPlayerDTO {
    constructor(
        readonly id: string,
        readonly chosenPlayer: CorneteiroTeamChosenPlayerData
    ) {}
}

export class CorneteiroTeamChosenPlayerData {
    constructor(
        readonly id: string,
        readonly score: number,
        readonly player: PlayerDTO
    ) {}
}

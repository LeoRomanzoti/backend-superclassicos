import ChosenPlayer from "./ChosenPlayer";

export default class TeamsOnPlayers {
    constructor(
        readonly teamsOnPlayersId: string,
        readonly chosenPlayerId: string,
        readonly teamId: string,
        readonly chosenPlayer: ChosenPlayer
    ) {}

    canRemove(dateNow: Date): boolean {
        if (this.chosenPlayer.round.endDate >= dateNow) return true;
        return false;
    }
}

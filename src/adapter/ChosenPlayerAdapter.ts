import ChosenPlayer from "../domain/entity/ChosenPlayer";
import Player from "../domain/entity/Player";
import Round from "../domain/entity/Round";

export default class CorneteiroTeamAdapter {
    constructor() { }

    parse(chosenPlayerData: any) {
        const player = new Player(
            chosenPlayerData?.player?.id,
            chosenPlayerData?.player?.name,
            chosenPlayerData?.player?.position
        );
        const round = new Round(
            chosenPlayerData?.round?.id,
            chosenPlayerData?.round?.start_date,
            chosenPlayerData?.round?.end_data,
            chosenPlayerData?.round?.number
        );
        const chosenPlayer = new ChosenPlayer(
            chosenPlayerData?.id,
            player,
            round,
            chosenPlayerData?.score
        );
        return chosenPlayer
    }
}
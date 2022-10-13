import ChosenPlayer from "../domain/entity/ChosenPlayer";
import Player from "../domain/entity/Player";
import Round from "../domain/entity/Round";
import ChosenPlayerDTO from "../dto/in/ChosenPlayerDTO";

export default class ChosenPlayerAdapter {
    constructor() {}

    parse(chosenPlayerData: ChosenPlayerDTO) {
        const player = new Player(
            chosenPlayerData?.player?.id,
            chosenPlayerData?.player?.name,
            chosenPlayerData?.player?.position
        );
        const round = new Round(
            chosenPlayerData?.round?.id,
            new Date(chosenPlayerData?.round?.start_date),
            new Date(chosenPlayerData?.round?.end_date),
            chosenPlayerData?.round?.number
        );
        const chosenPlayer = new ChosenPlayer(
            chosenPlayerData?.id,
            player,
            round,
            chosenPlayerData?.score
        );
        return chosenPlayer;
    }
}

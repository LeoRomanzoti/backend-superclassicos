import ChosenPlayer from "../domain/entity/ChosenPlayer";
import Player from "../domain/entity/Player";
import Round from "../domain/entity/Round";
import TeamsOnPlayers from "../domain/entity/TeamsOnPlayers";

export default class TeamsOnPlayersAdapter {
    parse(
        teamsOnPlayersId: string,
        chosenPlayerId: string,
        teamId: string,
        playerId: string,
        playerName: string,
        playerPposition: string,
        roundId: string,
        roundStartDate: string,
        roundEndDate: string,
        roundNumber: number,
        roundOpen: boolean,
        score: number
    ) {
        const playerData = new Player(playerId, playerName, playerPposition);
        const roundData = new Round(
            roundId,
            new Date(roundStartDate),
            new Date(roundEndDate),
            roundNumber,
            roundOpen
        );
        const chosenPlayer = new ChosenPlayer(
            chosenPlayerId,
            playerData,
            roundData,
            score
        );
        return new TeamsOnPlayers(
            teamsOnPlayersId,
            chosenPlayerId,
            teamId,
            chosenPlayer
        );
    }
}

import TeamsOnPlayersAdapter from "../../adapter/TeamsOnPlayersAdapter";
import ChosenPlayer from "../../domain/entity/ChosenPlayer";
import Player from "../../domain/entity/Player";
import Round from "../../domain/entity/Round";
import TeamsOnPlayers from "../../domain/entity/TeamsOnPlayers";
import TeamsOnPlayersRepository from "../../domain/repository/TeamsOnPlayersRepository";

export default class TeamsOnPlayersRepositoryMemory
    implements TeamsOnPlayersRepository
{
    teamsOnPlayersMemory: TeamsOnPlayers[];

    constructor(readonly teamsOnPlayersAdapter: TeamsOnPlayersAdapter) {
        const player = new Player("1", "Pedro", "Lateral");
        const round = new Round(
            "1",
            new Date("2022-10-22"),
            new Date("2022-10-29"),
            1
        );
        const chosenPlayer = new ChosenPlayer("01", player, round, 0);

        this.teamsOnPlayersMemory = [
            new TeamsOnPlayers("01", "01", "01", chosenPlayer),
            new TeamsOnPlayers("011", "01", "02", chosenPlayer),
            new TeamsOnPlayers("0111", "01", "02", chosenPlayer),
            new TeamsOnPlayers("01111", "01", "02", chosenPlayer),
            new TeamsOnPlayers("02", "02", "02", chosenPlayer),
            new TeamsOnPlayers("03", "03", "03", chosenPlayer),
            new TeamsOnPlayers("04", "04", "04", chosenPlayer),
            new TeamsOnPlayers("05", "05", "05", chosenPlayer),
        ];
    }

    async getBydId(
        teamsOnPlayersId: string
    ): Promise<TeamsOnPlayers | undefined> {
        const playerData = this.teamsOnPlayersMemory.find(
            (t) => t.teamsOnPlayersId === teamsOnPlayersId
        );
        if (!playerData) return;
        const teamsOnPlayers = this.teamsOnPlayersAdapter.parse(
            teamsOnPlayersId,
            playerData.chosenPlayer.chosenPlayerId,
            playerData.teamId,
            playerData.chosenPlayer.player.playerId,
            playerData.chosenPlayer.player.name,
            playerData.chosenPlayer.player.position,
            playerData.chosenPlayer.round.roundId,
            playerData.chosenPlayer.round.startDate.toString(),
            playerData.chosenPlayer.round.endDate.toString(),
            playerData.chosenPlayer.round.number,
            playerData?.chosenPlayer.score
        );
        return teamsOnPlayers;
    }

    async save(chosenPlayerId: string, teamId: string): Promise<boolean> {
        const player = new Player("1", "Pedro", "Lateral");
        const round = new Round(
            "1",
            new Date("2022-10-22"),
            new Date("2022-10-29"),
            1
        );
        const chosenPlayer = new ChosenPlayer("01", player, round, 0);
        const newTeamsOnPlayers = new TeamsOnPlayers(
            Math.floor(Math.random() * 999999).toString(),
            chosenPlayerId,
            teamId,
            chosenPlayer
        );
        this.teamsOnPlayersMemory.push(newTeamsOnPlayers);
        return true;
    }

    async remove(teamsOnPlayersId: string): Promise<boolean> {
        this.teamsOnPlayersMemory = this.teamsOnPlayersMemory.filter(
            (t) => t.teamsOnPlayersId !== teamsOnPlayersId
        );
        return true;
    }
}

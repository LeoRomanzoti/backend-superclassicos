import Result from "../../common/Result";
import CorneteiroTeamChosenPlayerDTO, {
    CorneteiroTeamChosenPlayerData,
} from "../../dto/in/CorneteiroTeamChosenPlayerDTO";
import PlayerDTO from "../../dto/in/PlayerDTO";
import ChosenPlayerRepository from "../repository/ChosenPlayerRespository";
import RoundRepository from "../repository/RoundRepository";
import TeamsOnPlayersRepository from "../repository/TeamsOnPlayersRepository";
import CorneteiroTeamDetail from "./CorneteiroTeamDetail";

export default class AddChosenPlayer {
    constructor(
        readonly corneteiroTeamDetailUseCase: CorneteiroTeamDetail,
        readonly chosenPlayerRepository: ChosenPlayerRepository,
        readonly teamsOnPlayersRepository: TeamsOnPlayersRepository,
        readonly roundRepository: RoundRepository
    ) {}

    async execute(
        chosenPlayerId: string,
        corneteiroTeamId: string,
        userId: string,
        dateNow: Date
    ): Promise<Result<boolean>> {
        try {
            const round = await this.roundRepository.getOpen();
            if (!round)
                return Result.fail("Ocorreu um erro inesperado com a rodada.");
            if (round.isClose(dateNow))
                return Result.fail("Rodada já está fechada.");

            const team = await this.corneteiroTeamDetailUseCase.execute(userId);
            if (!team) return Result.fail("Time não existe.");
            if (team.isFull()) return Result.fail("Seu time já está completo.");

            const chosenPlayer = await this.chosenPlayerRepository.getById(
                chosenPlayerId
            );
            if (!chosenPlayer)
                return Result.fail("Jogador escolhido não exite.");

            const playerDTO = new PlayerDTO(
                chosenPlayer.player.playerId,
                chosenPlayer.player.name,
                chosenPlayer.player.position
            );

            if (team.positionIsFull(playerDTO?.position))
                return Result.fail(
                    "Você já tem o máximo de jogadores para essa posição."
                );

            const chosenPlayerDataDTO = new CorneteiroTeamChosenPlayerData(
                chosenPlayer.chosenPlayerId,
                chosenPlayer.score,
                playerDTO
            );
            const chosenPlayerDTO = new CorneteiroTeamChosenPlayerDTO(
                chosenPlayer.chosenPlayerId,
                chosenPlayerDataDTO
            );
            if (team.playerAlreadyExist(chosenPlayerDTO?.chosenPlayer?.id))
                return Result.fail("Esse jogador já existe no seu time.");

            team.addPlayer(chosenPlayerDTO);
            await this.teamsOnPlayersRepository.save(
                chosenPlayerId,
                corneteiroTeamId
            );
            return Result.ok(true);
        } catch (error) {
            console.log(error);
            return Result.fail("Ocorreu um erro inesperado.");
        }
    }
}
